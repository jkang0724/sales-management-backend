const express = require("express");
const { executeSQL } = require("../../data/dbMySql");

const companyRouter = () => {
  const router = express.Router();

  const COMPANY_SELECT_SQL = `
  SELECT c.*, cc.description AS company_type_description,
  sc.description AS status_description
  FROM company c
  LEFT JOIN common_code cc ON c.company_type = cc.code
  AND cc.code_type = 'company'
  LEFT JOIN common_code sc ON c.status = sc.code
  AND sc.code_type = 'status'
  `;
  const COMPANY_ONE_SELECT_SQL = `${COMPANY_SELECT_SQL} WHERE c.id = ?`;
  const COMPANY_EDIT_SQL = `
  UPDATE company
  SET company_name = ?, company_type = ?, address = ?, registration_no = ?,
  person_in_charge = ?, phone_no = ?, email = ?, bank = ?, bank_account =?,
  status = ?, update_date = UTC_TIMESTAMP()
  WHERE id = ?
  `;
  const COMPANY_ADD_SQL = `
  INSERT INTO company (company_name, company_type, address,
    registration_no, person_in_charge, phone_no, email, bank, bank_account, status, register_date)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UTC_TIMESTAMP())
  `;
  const COMPANY_DELETE_SQL = `DELETE FROM company WHERE id = ?`;

  router.get("/company", executeSQL(COMPANY_SELECT_SQL));
  router.get("/company/:id", (req, res) =>
    executeSQL(COMPANY_ONE_SELECT_SQL, [req.params.id])(req, res)
  );
  router.post("/company", (req, res) => {
    const {
      companyName,
      companyType,
      address,
      registrationNo,
      personInCharge,
      phoneNo,
      email,
      bank,
      bankAccount,
      status,
      id,
    } = req.body;
    const queryParams = [
      companyName,
      companyType,
      address,
      registrationNo,
      personInCharge,
      phoneNo,
      email,
      bank,
      bankAccount,
      status,
      id,
    ];

    const sql = id ? COMPANY_EDIT_SQL : COMPANY_ADD_SQL;
    executeSQL(sql, queryParams)(req, res);
  });
  router.delete("/company/:id", (req, res) =>
    executeSQL(COMPANY_DELETE_SQL, [req.params.id])(req, res)
  );

  return router;
};

module.exports = {
  companyRouter,
};
