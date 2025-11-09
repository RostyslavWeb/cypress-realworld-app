# 🟩 Cypress Automation - Real World App

This repository contains my automated tests using the [Cypress Real-World App].

## ⚙️ Requirements

To run this project correctly, you need to have the following installed:

###
- [Node.js](https://nodejs.org/) (recommended version in the `.node-version` file)
- [Yarn Classic](https://classic.yarnpkg.com/lang/en/docs/install/) (version 1.x)

## Install node.js

```bash
npm install
```

Verify the installation
```bash
node -v
```

After installing Node.js, install Yarn Classic globally:
```bash
npm install yarn@latest -g
```

Check the installed version:
```bash
yarn -v
```

## 📦 Project Installation
1. Clone the original Real-World App repository:

```bash
git clone https://github.com/cypress-io/cypress-realworld-app
cd cypress-realworld-app
```

## ▶️ How to run the project

1. Install the dependencies:
```bash
yarn install
```
2. Start the app (frontend + backend):
```bash
yarn dev
```
The app will open at:

Frontend: http://localhost:3000

Backend: http://localhost:3001

3. In new terminal window, open the Cypress interface:
```bash
yarn cypress:open
```

---

## 📂 Test Structure

The tests are organized in the `app/cypress/e2e` folder:

app/cypress/e2e/

<pre> ```bash ├── api_tests.cy.js ├── auth_validation.cy.js ├── bank_accounts.cy.js ├── notifications_validation.cy.js ├── profile_validation.cy.js └── transactions_validation.cy.js ``` </pre>

#### Mac users with M-series chips will need to prepend `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true`.

```shell
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn install
```

## License

[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/cypress-io/cypress/blob/master/LICENSE)

This project is licensed under the terms of the [MIT license](/LICENSE).