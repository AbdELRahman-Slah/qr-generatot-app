import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthState } from "../contexts/auth.context";
import ResetPasswordScreen from "../screens/auth/ResetPassword.screen";
import ForgotPasswordScreen from "../screens/auth/ForgotPassword.screen";
import SignInScreen from "../screens/auth/SginIn.screen";
import SignUpScreen from "../screens/auth/SignUp.screen";
import QRScreen from "../screens/main/QR.screen";
import LoadingScreen from "../screens/Loading.screen";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={QRScreen} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const { userToken, isLoading } = useAuthState();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer
      linking={{
        prefixes: [
          "orderking://",
          "http://localhost:8081",
          "https://yourdomain.com",
        ],
        config: {
          screens: {
            ResetPassword: {
              path: "/reset",
              parse: {
                token: (token) => token,
              },
            },
            ForgotPassword: "/forgot-password",
            SignIn: "/signin",
            SignUp: "/sign-up",
            Main: "/main",
          },
        },
      }}
    >
      {userToken ? <MainStack /> : <AuthStack />}
      <Toast />
    </NavigationContainer>
  );
}
