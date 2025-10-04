import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function LoadingScreen() {
  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
});
