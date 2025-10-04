# OrderKing - QR Code Based Ordering System

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

## Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)

## Environment Variables

Both the frontend and backend require environment variables to be set. Please refer to the respective `.env.example` files in each directory.
