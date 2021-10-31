import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";

import { ThemeContext } from "./src/theme/ThemeContext";
import Loader from "./src/components/common/Loader";
import { LightTheme, DarkTheme } from "./src/theme/CustomTheme";

import { store, persistor } from "./src/store";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? DarkTheme : LightTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <React.Suspense fallback={<Loader />}>
      <StoreProvider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <ThemeContext.Provider value={preferences}>
            <PaperProvider theme={theme}>
              <NavigationContainer theme={theme}>
                <AppNavigator />
              </NavigationContainer>
            </PaperProvider>
          </ThemeContext.Provider>
        </PersistGate>
      </StoreProvider>
    </React.Suspense>
  );
}
