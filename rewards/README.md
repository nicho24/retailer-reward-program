# Rewards Program Application

## Overview
This is a React-based Rewards Program application that calculates reward points for customers based on their transactions. Points are awarded as follows:
- 2 points for every dollar spent over $100 in a transaction.
- 1 point for every dollar spent between $50 and $100 in a transaction.

## Features
- Simulates asynchronous API calls to fetch transactions.
- Calculates reward points for each customer.
- Displays total and monthly points per customer.
- Handles errors in case the API fails.

## Technologies Used
- React
- Sass (SCSS for styling)
- JavaScript (ES6+)

## Installation

### Prerequisites
Ensure you have Node.js and npm installed on your machine.

1. Clone this repository:
    ```bash
    git clone https://github.com/your-repo/rewards-program.git
    ```
2. Navigate into the project directory:
    ```bash
    cd rewards-program
    ```
3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Start the application:
    ```bash
    npm start
    ```

## Usage
The application will open at `http://localhost:3000`. It simulates fetching transactions and displays the reward points for each customer.

### Step 2: **Testing**

Testing is important to ensure the application works as expected. Since `Redux` is not allowed, we’ll focus on testing the core logic and API interaction. We’ll use `Jest` and `React Testing Library` for this purpose.

1. Install `jest` and `react-testing-library`:
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom