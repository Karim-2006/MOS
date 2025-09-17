# UPI QR CCAvenue Integration

This project demonstrates a full-stack application for generating UPI QR codes, handling payment webhooks, and tracking transaction history using Node.js (Express), MongoDB, and a basic frontend.

## Features

- Generate UPI QR codes for payments.
- Handle CCAvenue payment webhooks for status updates.
- Track and display transaction history.
- Responsive frontend design.

## Project Structure

```
upi-qr-ccavenue/
├── .env
├── backend/
│   ├── config/             # MongoDB connection
│   ├── controllers/        # Business logic for QR and webhooks
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions (QR generator, webhook verification)
│   ├── server.js           # Main backend application file
│   ├── package.json
│   └── package-lock.json
└── frontend/
    ├── css/                # Stylesheets
    ├── js/                 # Frontend JavaScript
    ├── index.html          # QR generation page
    ├── payment-status.html # Payment status page
    └── history.html        # Transaction history page
```

## Local Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file in the root of the `upi-qr-ccavenue` directory** (not inside `backend`):
    ```
    MONGO_URI=mongodb://localhost:27017/upi_ccavenue
    PORT=5000
    CCA_MERCHANT_ID=yourMerchantId
    CCA_ACCESS_CODE=yourAccessCode
    CCA_WORKING_KEY=yourWorkingKey
    CCA_BASE_URL=https://apitest.ccavenue.com/apis/upi
    PAYMENT_EXPIRY_MINUTES=15
    ```
    *Replace `yourMerchantId`, `yourAccessCode`, and `yourWorkingKey` with your actual CCAvenue credentials. The `CCA_BASE_URL` is for the CCAvenue testing environment.*

4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The backend server will run on `http://localhost:5000` (or the PORT specified in your `.env` file).

### Frontend Setup

1.  **Open the frontend HTML files:**
    Simply open `frontend/index.html` in your web browser. You can also use a live server extension in your IDE for easier development.

## Sandbox Testing Details

To test the CCAvenue integration, you will need valid sandbox credentials from CCAvenue. The current implementation uses a dummy UPI URL for QR generation and simulates webhook verification. For actual CCAvenue integration, you would replace the dummy logic in `backend/controllers/qrController.js` and `backend/utils/verifyWebhook.js` with actual CCAvenue API calls and decryption/verification logic.

## Deployment Steps (Render)

1.  **Create a new Web Service on Render:**
    - Connect your GitHub repository.
    - Set the `Root Directory` to `backend`.
    - Build Command: `npm install`
    - Start Command: `npm start`
2.  **Environment Variables:**
    - Add the environment variables from your `.env` file to Render's environment settings.
    - Ensure `MONGO_URI` points to your MongoDB Atlas or other cloud MongoDB instance.
3.  **Database Setup:**
    - Create a MongoDB Atlas cluster (or similar cloud MongoDB service).
    - Update the `MONGO_URI` in Render's environment variables with your Atlas connection string.
4.  **Frontend Deployment:**
    - For the frontend, you can deploy it as a Static Site on Render, pointing to the `frontend` directory.
    - Alternatively, configure your Express server (`server.js`) to serve the static frontend files.

## API Endpoints

### Backend

-   `POST /api/generate-qr`
    -   Generates a UPI QR code.
    -   Request Body: `{ "amount": Number, "payerEmail": String }`
    -   Response: `{ "qrCodeUrl": String, "transactionId": String }`
-   `POST /api/webhook/payment-status`
    -   Handles CCAvenue payment status updates.
    -   Request Body: CCAvenue webhook payload (encrypted data).
    -   Response: `200 OK` or `400 Bad Request`.
-   `GET /api/transaction/:id`
    -   Retrieves the status of a specific transaction.
    -   Response: `{ "status": String }`
-   `GET /api/history`
    -   Retrieves all transaction history.
    -   Response: `[ { ...transactionData } ]`

### Frontend

-   `/` (index.html): Payment form and QR display.
-   `/payment-status.html`: Displays payment status (requires `transactionId` query parameter).
-   `/history.html`: Displays transaction history.