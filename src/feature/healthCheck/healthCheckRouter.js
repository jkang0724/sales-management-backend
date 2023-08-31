const express = require("express");
const { requestHealthCheck } = require("../../data/dbMySql");

// const processServerInfo = (req, res) => res.status(200).send("OK");

const healthCheckRouter = () => {
  const router = express.Router();

  router.get(
    "/check/info",
    requestHealthCheck("SELECT * FROM company LIMIT 1")
  );

  return router;
};

module.exports = {
  healthCheckRouter,
};
