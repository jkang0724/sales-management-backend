<!-- Screenshot of main page -->

This repository is dedicated to the service-side (back-end) application of the React [**sales management system**](https://github.com/jkang0724/sales-management-ui). It can be run standalone with a functional database to assess HTTP requests and endpoints. Please consider integrating it with [Postman](https://www.postman.com/downloads/) for an optimal development experience and more comprehensive testing process.

# Table of Contents

- [Dependencies](#dependencies)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
  - [Base URL](#base-url)
  - [Health Check](#health-check)
  - [User Router](#user-router)
- [Testing](#testing)
- [Screenshots](#screenshots)

## Dependencies

These are the key dependencies that need to be installed for the application to run properly. Refer to 'package.json' for a complete list of dependencies.

- axios
- bcryptjs
- cors: Middleware for enabling Cross-Origin Resource Sharing in Express.
- dotenv
- express
- mysql: Relational database management system for Node.js.
- nodemon: Monitors changes in the Node.js application and automatically restarts the server.

## Getting Started

### Installation

1. Clone this repository.
2. Run `npm install` to install the necessary dependencies.

### Configuration

1. Rename '.env.example' to '.env'.
2. Modify the '.env' file to configure environment variables as needed.

## Usage

Whether debugging or deploying, start the backend service by running `npm run service` in the terminal. This will initiate a connection to the database of your choice (MySQL or AKS) if configured correctly. If there is no error, access _localhost:4000_ to perform endpoint and API request tests.

## API Documentation

### Base URL

The base URL for all endpoints is _localhost:4000_, which must be followed by every endpoint.

### Health Check

#### GET /check/info

Checks and returns the health status of the server.

### User Router

#### GET /user

Returns all registered users.

#### POST /user & /user/update

Adds or updates a user using the request body, which contains a complete user object.

#### POST /user/login

Sends user's ID and password to obtain authentication results.

#### POST /user/auth_token

Verifies client's ID and key to generate an authentication token.

#### POST /userCheck

Checks if a new user's specific field input duplicates that of an existing user.

**And so on...**

## Testing

Download and install [Postman](https://www.postman.com/downloads/) to test the endpoints above. After creating a collection with a proper name, add variables _base_url_ - localhost and _base_port_ - 4000 by accessing the 'Environments' tab. Back in 'Collections' tab, add various API requests with respective endpoints to test the server.

## Screenshots

<!-- Screenshots to be added -->

---

For more detailed information, please refer to the separate README of the front-end [repository](https://github.com/jkang0724/sales-management-ui).
