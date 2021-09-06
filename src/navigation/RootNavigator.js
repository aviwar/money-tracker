import React from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

import { PreferencesContext } from "./PreferencesContext";
import Loader from "../components/common/Loader";

const Header = React.lazy(() => import("./Header"));
const BottomMenu = React.lazy(() => import("./BottomMenu"));
const UserFormScreen = React.lazy(() => import("../screens/UserFormScreen"));
const TransactionScreen = React.lazy(() =>
  import("../screens/TransactionScreen")
);
const TransactionFormScreen = React.lazy(() =>
  import("../screens/TransactionFormScreen")
);

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

const Stack = createStackNavigator();

const RootNavigator = () => {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

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
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                header: (props) => <Header {...props} />,
              }}
            >
              <Stack.Screen name="BottomMenu" component={BottomMenu} />
              <Stack.Screen name="UserForm" component={UserFormScreen} />
              <Stack.Screen name="Transactions" component={TransactionScreen} />
              <Stack.Screen
                name="TransactionForm"
                component={TransactionFormScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </React.Suspense>
  );
};

export default RootNavigator;
