import { AuthProvider } from "./contexts/auth.context";
import Navigation from "./navigations";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
