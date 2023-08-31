const express = require("express");
const {
  healthCheckRouter,
} = require("./src/feature/healthCheck/healthCheckRouter");
const { companyRouter } = require("./src/feature/company/companyRouter");
const { employeeRouter } = require("./src/feature/employee/employeeRouter");
const { codeRouter } = require("./src/feature/common/codeRouter");
const { userRouter } = require("./src/feature/user/userRouter");
const { userCheckRouter } = require("./src/feature/user/userCheckRouter");
const {
  companyEmployeeRouter,
} = require("./src/feature/company/companyEmployeeRouter");
const { projectRouter } = require("./src/feature/project/projectRouter");
const {
  projectEmployeeRouter,
} = require("./src/feature/project/projectEmployeeRouter");
const {
  projectFulfillmentRouter,
} = require("./src/feature/project/projectFulfillmentRouter");
const { invoiceRouter } = require("./src/feature/invoice/invoiceRouter");

const app = express();
require("dotenv").config();

app.use(express.json());

// perform health-check
app.use(healthCheckRouter());
// main routers
app.use(userRouter());
app.use(userCheckRouter());
app.use(codeRouter());
app.use(companyRouter());
app.use(employeeRouter());
app.use(companyEmployeeRouter());
app.use(projectRouter());
app.use(projectEmployeeRouter());
app.use(projectFulfillmentRouter());
app.use(invoiceRouter());

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on ${port}`));
