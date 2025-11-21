# Server README

This document provides instructions for setting up and running the server-side of the Budget-Aware Expense Tracker application.

## Table of Contents

- [Setup](#setup)
- [.env.example](#envexample)
- [Deployment](#deployment)
- [API Examples](#api-examples)

## Setup

To get the server running locally, follow these steps:

1.  **Clone the repository (if you haven't already):**

    ```bash
    git clone https://github.com/sinan-bh/Budget-Aware-Expense-Tracker-Server.git
    cd Budget-Aware-Expense-Tracker-Server
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file:**

    Copy the `.env.example` file to `.env` and fill in your environment variables.

    ```bash
    cp .env.example .env
    ```

4.  **Start the server:**

    ```bash
    npm start
    # or for development with nodemon
    npm run dev
    ```

## .env.example

Create a `.env` file in the `server` directory based on the following example:

```
PORT=4000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/budget-tracker
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
APPLICATION_NAME=budget-tracker-server
```

## Deployment

Describe deployment steps here, e.g., to Heroku, Vercel, or a custom VPS.

- **Heroku:** [Link to Heroku deployment guide or app]
- **Vercel:** [Link to Vercel deployment guide or app]
- **Custom VPS:** Provide instructions for deploying to a custom server.

## API Examples

Here are some examples of API endpoints and how to interact with them:

### Authentication

#### Register a new user

- **URL:** `/api/auth/signup`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

#### Login user

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

### Categories

#### Get all categories

- **URL:** `/api/category`
- **Method:** `GET`

### Budgets

#### Create a new budget

- **URL:** `/api/budget`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "categoryId": "<category-id>",
    "limit": 500,
    "month": "2025-01"
  }
  ```

#### Get budgets for a specific month

- **URL:** `/api/budget?month=2025-01`
- **Method:** `GET`

### Expenses

#### Add a new expense

- **URL:** `/api/expense`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "categoryId": "<category-id>",
    "amount": 50,
    "description": "Groceries",
    "date": "2025-01-15"
  }
  ```

#### Get expenses for a specific month

- **URL:** `/api/expense?month=2025-01`
- **Method:** `GET`

### Reports

#### Get monthly report

- **URL:** `/api/reports/monthly?month=2025-01`
- **Method:** `GET`
