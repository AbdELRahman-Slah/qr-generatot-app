import * as SecureStore from "expo-secure-store";

export async function saveToken(token) {
  try {
    await SecureStore.setItemAsync("authToken", token, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK, // iOS specific
    });
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving token:", error);
    throw error;
  }
}

export async function getToken() {
  try {
    const token = await SecureStore.getItemAsync("authToken");
    console.log("Token retrieved:", token ? "Token found" : "No token");
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}

export async function deleteToken() {
  try {
    await SecureStore.deleteItemAsync("authToken");
    console.log("Token deleted successfully");
  } catch (error) {
    console.error("Error deleting token:", error);
    throw error;
  }
}
