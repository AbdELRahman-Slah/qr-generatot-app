# OrderKing - QR Code Based

OrderKing is a modern, full-stack application that enables businesses to manage orders through QR codes. The system consists of a React Native frontend and a Node.js/Express backend with MongoDB as the database.

## Features

- **QR Code Generation**: Generate unique QR codes for tables/orders
- **Real-time Ordering**: Live order updates using Socket.IO
- **User Authentication**: Secure authentication system with JWT
- **Responsive Design**: Works on mobile and web platforms
- **Admin Dashboard**: Manage orders and menu items

## Project Structure

```
orderking-test/
├── backend/          # Node.js/Express server
└── frontend/         # React Native/Expo application
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB (local or cloud instance)
- Expo CLI (for frontend development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd orderking-test
   ```

2. **Set up the backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env  # Update with your configuration
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env  # Update with your configuration
   ```

## Running the Application

### Start the Backend

```bash
cd backend
npm run dev
```

### Start the Frontend

```bash
cd frontend
npm start
```

## API Documentation

### Authentication
All API endpoints except `/api/auth/register` and `/api/auth/login` require authentication. Include the JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

### Endpoints

#### 1. Authentication

##### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "message": "User has registered successfully",
  "data": null,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

##### POST /api/auth/login
Login an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "User has logged in successfully",
  "data": null,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

##### GET /api/auth/me
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "5f8d0a4b7d1c1b2c3d4e5f6a",
      "email": "user@example.com",
      "createdAt": "2023-10-04T08:00:00.000Z",
      "updatedAt": "2023-10-04T08:00:00.000Z"
    }
  }
}
```

##### POST /api/auth/forgot-password
Request password reset email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Reset instructions have been sent to your email",
  "data": null
}
```

##### POST /api/auth/reset-password/:resetToken
Reset password using the token from email.

**URL Parameters:**
- `resetToken`: The reset token received via email

**Request Body:**
```json
{
  "password": "newpassword123"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "User has reset password successfully",
  "data": null,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. QR Codes

##### GET /api/qr/current
Get the current active QR code UUID (requires authentication).

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "uuid": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

#### WebSocket Connection
Real-time QR code updates are available via WebSocket at `ws://<backend-url>`. Connect to receive real-time QR code updates.

## Environment Variables

### Backend (`.env`)
- `PORT`: Port to run the server on (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRES_IN`: JWT token expiration time (e.g., '30d')
- `NODE_ENV`: Application environment (development/production)
- `FRONTEND_URL`: Frontend URL for password reset links
- `SMTP_HOST`: SMTP server host for sending emails
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password
- `EMAIL_FROM`: Sender email address

### Frontend (`.env`)
- `REACT_APP_API_URL`: Base URL for API requests (e.g., 'http://localhost:3000/api')
- `REACT_APP_WS_URL`: WebSocket server URL (e.g., 'ws://localhost:3000')
