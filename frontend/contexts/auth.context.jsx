import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { authReducer } from "../reducers/auth.reducer";
import { saveToken, getToken, deleteToken } from "../utils/secureStorage";
import { api } from "../utils/api";

const AuthStateContext = createContext({
  isLoading: false,
  userToken: null,
});

const AuthDispatchContext = createContext(() => {});

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    userToken: null,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userToken = await getToken();

        if (!userToken) {
          dispatch({ type: "SIGN_OUT" });
          return;
        }

        const checkCurrentUserRes = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (checkCurrentUserRes.status !== 200) {
          await deleteToken();
          dispatch({ type: "SIGN_OUT" });
          return;
        }

        dispatch({ type: "RESTORE_TOKEN", token: userToken });
      } catch (error) {
        console.error("Bootstrap failed:", error);

        await deleteToken();
        dispatch({ type: "SIGN_OUT" });
      }
    };

    bootstrapAsync();
  }, []);

  const authDispatch = useMemo(
    () => ({
      signIn: async (data) => {
        try {
          const signInRes = await api.post("/auth/login", data);

          if (signInRes.status === 200) {
            const userToken = signInRes.data.token;

            await saveToken(userToken);

            dispatch({ type: "SIGN_IN", token: userToken });
          }
        } catch (error) {
          console.error("Sign in failed:", error);
          throw error;
        }
      },
      signOut: async () => {
        try {
          await deleteToken();
        } catch (error) {
          console.error("Failed to delete token:", error);
        }
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        try {
          const signUpRes = await api.post("/auth/register", data);

          if (signUpRes.status === 201) {
            const userToken = signUpRes.data.token;

            await saveToken(userToken);

            dispatch({ type: "SIGN_UP", token: userToken });
          }
        } catch (error) {
          console.error("Sign up failed:", error);
          throw error;
        }
      },
    }),
    []
  );

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={authDispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
};

const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthState, useAuthDispatch };
