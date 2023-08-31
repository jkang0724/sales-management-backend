CREATE DATABASE sales;
USE sales;
DROP TABLE IF EXISTS company, employee, company_employee, common_code, project, project_employee, invoice, payment, user, project_fulfillment;

CREATE TABLE company (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  company_type CHAR(1) NOT NULL,
  address VARCHAR(255),
  registration_no VARCHAR(20) NOT NULL,
  person_in_charge VARCHAR(20),
  phone_no VARCHAR(20),
  email VARCHAR(40),
  bank VARCHAR(20),
  bank_account VARCHAR(20),
  status CHAR(1) DEFAULT '1',
  register_date TIMESTAMP NOT NULL,
  update_date TIMESTAMP
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_name VARCHAR(255) NOT NULL,
  employee_type CHAR(1) NOT NULL,
  bank VARCHAR(20),
  bank_account VARCHAR(20),
  social_security_no VARCHAR(20),
  phone_no VARCHAR(20),
  email VARCHAR(40),
  status CHAR(1) DEFAULT '1',
  register_date TIMESTAMP NOT NULL,
  update_date TIMESTAMP
);

CREATE TABLE company_employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT NOT NULL,
  employee_id INT NOT NULL,
  FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  employee_type CHAR(1) NOT NULL,
  sales DECIMAL(12, 2),
  sales_tax DECIMAL(10, 2),
  sales_after_tax DECIMAL(10, 2),
  purchase DECIMAL(12, 2),
  purchase_tax DECIMAL(12, 2),
  purchase_after_tax DECIMAL(12,2),
  status CHAR(1) DEFAULT '1',
  register_date TIMESTAMP NOT NULL,
  update_date TIMESTAMP
);

CREATE TABLE common_code (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code_type VARCHAR(20) NOT NULL,
  code CHAR(1) NOT NULL,
  description VARCHAR(255) NOT NULL,
  register_date TIMESTAMP NOT NULL,
  update_date TIMESTAMP
);



INSERT INTO company (company_name, company_type, address, registration_no, person_in_charge, phone_no, email, bank, bank_account, status, register_date) VALUES
('Google', '1', '1234 NW Bobcat Lane, St. Robert, MO 65584-5678', '214-87-02608', 'Robert John','010-8256-9236','hshwang.capion@gmail.com', 'Royal bank', '782-01-0026-121', '1', UTC_TIMESTAMP()),
('Test company', '3', '1234 NW Bobcat Lane, St. Robert, MO 65584-5678', '120-86-35490', 'John Doe', '070-4617-0050', 'tkdrud@m2mglobal', '', '', '1', UTC_TIMESTAMP());
