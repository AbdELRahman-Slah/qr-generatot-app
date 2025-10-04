import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useAuthState, useAuthDispatch } from "../../contexts/auth.context";
import { api } from "../../utils/api";
import { socket } from "../../socket";
import QRCode from "react-native-qrcode-svg";

function QRScreen() {
  const { userToken } = useAuthState();
  const { signOut } = useAuthDispatch();
  const [qrData, setQrData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await api.get("/qr/current", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setQrData(response.data.data.uuid);
      } catch (err) {
        console.error("Error fetching QR code:", err);
        setError("Failed to load QR code. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQRCode();
  }, [userToken]);

  useEffect(() => {
    const onConnect = () => {
      console.log("Connected to socket server");
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log("Disconnected from socket server");
      setIsConnected(false);
    };

    const onNewUUID = (uuid) => {
      console.log("Received new UUID:", uuid);
      setQrData(uuid);
    };

    socket.connect();

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("newUUID", onNewUUID);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("newUUID", onNewUUID);
      socket.disconnect();
    };
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/qr/current", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setQrData(response.data.uuid);
    } catch (err) {
      console.error("Error refreshing QR code:", err);
      setError("Failed to refresh QR code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading QR Code...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Text style={styles.refreshButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan this QR Code</Text>
      <View style={styles.qrContainer}>
        {qrData ? (
          <QRCode
            value={qrData}
            size={250}
            color="black"
            backgroundColor="white"
          />
        ) : (
          <Text>No QR code available</Text>
        )}
      </View>
      <Text style={styles.connectionStatus}>
        Status: {isConnected ? "Connected" : "Disconnected"}
      </Text>

      <Text style={styles.uuidText}>{qrData}</Text>

      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  qrContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
  },
  connectionStatus: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: "#667eea",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  signOutButton: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#ef4444",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  signOutButtonText: {
    color: "white",
    fontWeight: "600",
  },
  uuidText: {
    marginBottom: 20,
    color: "#666",
    fontSize: 12,
  },
});

export default QRScreen;
