# OrderKing Frontend

A cross-platform mobile application built with React Native and Expo, designed for the OrderKing system.

## Features

- Cross-platform support (iOS, Android, Web)
- QR Code generation
- Real-time order updates
- User authentication
- Responsive design
- Secure storage for tokens

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the environment variables as needed

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Project Structure

```
frontend/
├── assets/           # Images, fonts, and other static files
├── components/       # Reusable UI components
├── contexts/         # React contexts for state management
├── navigations/      # Navigation configuration
├── reducers/         # Redux reducers (if using Redux)
├── screens/          # Screen components
└── utils/            # Utility functions and helpers
```

## Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
EXPO_PUBLIC_API_URL=http://localhost:3000/
# Add other environment variables as needed
```

## Dependencies

- expo: ~54.0.12
- react: 19.1.0
- react-native: 0.81.4
- @react-navigation/native: ^7.1.17
- @react-navigation/native-stack: ^7.3.26
- axios: ^1.12.2
- socket.io-client: ^4.8.1
- react-hook-form: ^7.63.0
- zod: ^3.25.76
- expo-secure-store: ~15.0.7
- react-native-qrcode-svg: ^6.3.15
- @expo/vector-icons: ^15.0.2

## Development

- Uses React Navigation for routing
- Implements form handling with React Hook Form and Zod
- Uses Axios for API requests
- Implements WebSocket for real-time updates
- Secure storage for authentication tokens

## Building for Production

To create a production build:

1. For Android:
   ```bash
   expo build:android
   ```

2. For iOS:
   ```bash
   expo build:ios
   ```
