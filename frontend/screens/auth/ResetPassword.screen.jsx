import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { api } from "../../utils/api";

function ResetPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get token from URL params
  useEffect(() => {
    if (route.params?.token) {
      setResetToken(route.params.token);
    }
  }, [route.params?.token]);

  const onSubmit = async () => {
    if (!resetToken) {
      setError("Reset token is required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await api.post(`/auth/reset-password/${resetToken}`, {
        password,
      });
      if (res.status === 200) {
        setMessage(
          "Password has been reset successfully! You can sign in now."
        );
      }
    } catch (e) {
      setError("Reset failed. Token may be invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>Enter your new password below</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Reset Token</Text>
                <TextInput
                  style={[styles.input, error && styles.inputError]}
                  placeholder="Enter reset token"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="none"
                  value={resetToken}
                  onChangeText={setResetToken}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>New Password</Text>
                <TextInput
                  style={[styles.input, error && styles.inputError]}
                  placeholder="Enter new password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm New Password</Text>
                <TextInput
                  style={[styles.input, error && styles.inputError]}
                  placeholder="Confirm new password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                {error && <Text style={styles.errorText}>{error}</Text>}
              </View>

              {message && (
                <View style={styles.messageContainer}>
                  <Text style={styles.messageText}>{message}</Text>
                </View>
              )}

              <TouchableOpacity
                style={[styles.resetButton, loading && styles.buttonDisabled]}
                onPress={onSubmit}
                disabled={loading}
              >
                <Text style={styles.resetButtonText}>
                  {loading ? "Resetting..." : "Reset Password"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Remember your password?{" "}
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                  <Text style={styles.linkText}>Sign in</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#E5E7EB",
    textAlign: "center",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
  messageContainer: {
    backgroundColor: "#D1FAE5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  messageText: {
    color: "#065F46",
    fontSize: 14,
    textAlign: "center",
  },
  resetButton: {
    backgroundColor: "#667eea",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#667eea",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#E5E7EB",
    fontSize: 14,
  },
  linkText: {
    color: "#FFFFFF",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

export default ResetPasswordScreen;
