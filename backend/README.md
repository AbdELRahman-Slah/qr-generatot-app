# OrderKing Backend

This is the backend service for the OrderKing application, built with Node.js, Express, and MongoDB.

## Features

- RESTful API endpoints
- JWT Authentication
- Rate limiting and security middleware
- Real-time updates with Socket.IO
- MongoDB database integration
- Input validation and sanitization
- Error handling

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user profile (protected)
- `POST /auth/forgot-password` - Forgot password
- `POST /auth/reset-password` - Reset password

### Current QR Code

- `GET /qr/current` - Get current QR code

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_specific_password
MAIL_FROM=OrderKing <noreply@orderking.com>
FRONTEND_URL=http://localhost:8081
```

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables (see above)

3. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- The server will reload automatically with `nodemon`
- Implements rate limiting with `express-rate-limit`
- Uses `helmet` for security headers
- Implements request sanitization with `express-mongo-sanitize`

## Production

For production deployment:

1. Set `NODE_ENV=production`
2. Ensure all environment variables are properly set
3. Consider using PM2 or similar process manager
4. Set up proper logging and monitoring

## Dependencies

- express: ^5.1.0
- mongoose: ^8.18.3
- jsonwebtoken: ^9.0.2
- bcrypt: ^6.0.0
- socket.io: ^4.8.1
- dotenv: ^17.2.3
- cors: ^2.8.5
- helmet: ^8.1.0
- express-rate-limit: ^8.1.0
- express-mongo-sanitize: ^2.2.0
- nodemailer: ^7.0.6
- uuid: ^13.0.0
