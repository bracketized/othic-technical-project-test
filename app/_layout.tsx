import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { AuthProvider, useAuth } from "@/context/AuthenticationContext";
import React from "react";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { colorsDark, colorsLight } from "@/constants/Themes";
import { ProductsProvider } from "@/context/ProductContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const RootProvider = () => {
  // Hooks
  const { isAuthenticated } = useAuth();

  const routes = (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="index" options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen
            name="/private/index"
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack>
  );

  // If auth return routes wrapped in app context
  if (isAuthenticated) {
    return <ProductsProvider>{routes}</ProductsProvider>;
  } else {
    // If user is not auth return basic routing
    return routes;
  }
};

function RootLayoutNav() {
  //  hooks
  const colorScheme = useColorScheme();

  // Theme configurations
  const isDarkMode = colorScheme === "dark";
  const activeTheme = isDarkMode ? MD3LightTheme : MD3DarkTheme;
  const colors = isDarkMode ? colorsDark : colorsLight;

  // Theme setup
  const defaultTheme: any = {
    ...activeTheme,
    colors: {
      ...activeTheme.colors,
      ...colors,
    },
  };

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <PaperProvider theme={defaultTheme}>
          <RootProvider />
        </PaperProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
