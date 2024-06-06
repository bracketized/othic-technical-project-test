// app/auth/AuthContext.tsx
import { DRIVE_API_URLS } from "@/constants/Apis";
import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "expo-router";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Snackbar } from "react-native-paper";

/**
 * TS declarations
 */
export interface UserSession {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  gender: string;
  token: string;
  refreshToken: string;
}

export interface AuthContextProps {
  session: UserSession;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  error: { message: string } | undefined;
}

/**
 * Context API declarations
 */
export const AuthenticationContext = createContext<
  AuthContextProps | undefined
>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<UserSession | undefined>(undefined);
  const [error, setError] = useState<{ message: string } | undefined>(
    undefined
  );

  const login = async (username: string, password: string) => {
    setLoading(true);
    const user: { username: string; password: string } = {
      username,
      password,
    };

    try {
      const { data, status }: AxiosResponse<UserSession> = await axios.post(
        DRIVE_API_URLS.login,
        user,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            // Add other custom headers if needed
          },
        }
      );

      // Handle different HTTP status codes
      if (status === 200) {
        setSession(data);
        setLoading(false);
        router.replace("/private/"); // send user to index on private folder (auth)
      } else {
        setError({
          message: "Error al iniciar sessión, intentalo de nuevo más tarde.",
        } as { message: string });
        setLoading(false);
      }
    } catch (error) {
      // Handle Axios errors
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<{ message: string }> = error;
        if (axiosError.response) {
          // Server responded with a non-success status code (e.g., 4xx or 5xx)
          const { status } = axiosError.response;

          // Handle different HTTP status codes
          if (status >= 400) {
            setError({
              message: "Credenciales incorrectas.",
            } as { message: string });
            setLoading(false);
          } else {
            setError({
              message:
                "Error al iniciar sessión, intentalo de nuevo más tarde.",
            } as { message: string });
            setLoading(false);
          }
        }
      } else {
        setError({
          message:
            "Error inesperado al iniciar sessión, intentalo de nuevo más tarde.",
        } as { message: string });
        setLoading(false);
      }
    }
  };

  const logout = () => {
    setSession(undefined);
    router.replace("/");
  };

  const value: any = {
    loading,
    session,
    error,
    login,
    logout,
    // this method must be changed to revalidate session on open app
    isAuthenticated: session?.id ? true : false,
  };

  console.log(session);

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
      <Snackbar
        visible={!!error}
        duration={1500}
        onDismiss={() => setError(undefined)}
      >
        {error?.message}
      </Snackbar>
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
