const mysql = require("mysql");
const util = require("util");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, JWT_SECRET } = process.env;
const dbConfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
};

const connection = mysql.createConnection(dbConfig);
const query = util.promisify(connection.query).bind(connection);

// function to health-check database
const requestHealthCheck = (queryString) => async (req, res) => {
  try {
    await query(queryString);
    return res.status(200).send("DB OK");
  } catch (error) {
    error.message = "DB error";
    error.status = 500;
    throw error;
  }
};

const verifyToken = (req) => {
  // remove 'Bearer ' prefix (7 chars) from the header
  const token = req.header("authorization")?.slice(7);
  if (!token) {
    throw new Error("A token is required for authentication");
  } else {
    return jwt.verify(token, JWT_SECRET);
  }
};

const connectionQuery = async (queryString, queryParams, req) => {
  console.log("QS", queryString);
  console.log("QP", queryParams);
  try {
    const verifiedToken = verifyToken(req);
    const result = verifiedToken && (await query(queryString, queryParams));
    return result;
  } catch (error) {
    switch (error.code) {
      case "ETIMEDOUT":
        error.message = "MySQL server is down";
        error.status = 503;
        break;
      case "ER_ACCESS_DENIED_ERROR":
        error.message = "Unauthorized access to server";
        error.status = 401;
        break;
      case "EHOSTUNREACH":
        error.message = "Incorrect database address or hostname";
        error.status = 503;
        break;
      default:
        error.message = error.sqlMessage || "Invalid request";
        error.status = 400;
        break;
    }
    throw error;
  }
};

const executeSQL = (queryString, queryParams) => async (req, res) => {
  try {
    const result = await connectionQuery(queryString, queryParams, req);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  requestHealthCheck,
  connectionQuery,
  executeSQL,
};
