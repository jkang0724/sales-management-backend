const express = require("express");
const { executeSQL } = require("../../data/dbMySql");

const companyEmployeeRouter = () => {
  const router = express.Router();

  const COMPANY_EMPLOYEE_SELECT_SQL = `
  SELECT ce.*, e.employee_name, e.employee_type, e.status AS status_description,
  ec.description AS employee_type_description, c.id AS company_id, c.company_name,
  sc.description AS status_description,
  CASE
    WHEN ce.start_date <= NOW() AND (ce.end_date >= NOW() OR ce.end_date IS NULL)
      THEN c.company_name
    ELSE NULL
  END AS current_company
  FROM company_employee ce
  LEFT JOIN employee e ON e.id = ce.employee_id
  LEFT JOIN company c ON ce.company_id = c.id
  LEFT JOIN common_code ec ON ec.code_type = 'employee'
  AND ec.code = ce.employee_type
  LEFT JOIN common_code sc ON e.status = sc.code
  AND sc.code_type = 'status'
  `;
  const COMPANY_EMPLOYEE_ONE_SELECT_SQL = `
  ${COMPANY_EMPLOYEE_SELECT_SQL} WHERE c.id = ?
  `;
  const COMPANY_EMPLOYEE_EDIT_SQL = `
  UPDATE company_employee
  SET start_date = ?, end_date = ?, employee_type = ?, sales = ?, sales_tax = ?, sales_after_tax = ?, purchase = ?, purchase_tax = ?,
  purchase_after_tax = ?, status = ?, update_date = UTC_TIMESTAMP()
  WHERE id = ?
  `;
  const COMPANY_EMPLOYEE_ADD_SQL = `
  INSERT INTO company_employee (start_date, end_date, employee_type, sales, sales_tax, sales_after_tax, purchase, purchase_tax,
    purchase_after_tax, status, register_date, company_id, employee_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UTC_TIMESTAMP(), ?, ?)
  `;
  const COMPANY_EMPLOYEE_DELETE_SQL = `
  DELETE FROM company_employee WHERE id = ?
  `;

  router.get("/company_employee", executeSQL(COMPANY_EMPLOYEE_SELECT_SQL));
  router.get("/company_employee/:id", (req, res) =>
    executeSQL(COMPANY_EMPLOYEE_ONE_SELECT_SQL, [req.params.id])(req, res)
  );
  router.post("/company_employee", (req, res) => {
    const {
      startDate,
      endDate,
      employeeType,
      sales,
      salesTax,
      salesAfterTax,
      purchase,
      purchaseTax,
      purchaseAfterTax,
      status,
      companyId,
      employeeId,
      id,
    } = req.body;
    const queryParams = [
      startDate,
      endDate,
      employeeType,
      sales,
      salesTax,
      salesAfterTax,
      purchase,
      purchaseTax,
      purchaseAfterTax,
      status,
    ];

    if (id) {
      queryParams.push(id);
      executeSQL(COMPANY_EMPLOYEE_EDIT_SQL, queryParams)(req, res);
    } else {
      queryParams.push(companyId, employeeId);
      executeSQL(COMPANY_EMPLOYEE_ADD_SQL, queryParams)(req, res);
    }
  });
  router.delete("/company_employee/:id", (req, res) =>
    executeSQL(COMPANY_EMPLOYEE_DELETE_SQL, [req.params.id])(req, res)
  );

  return router;
};

module.exports = {
  companyEmployeeRouter,
};
