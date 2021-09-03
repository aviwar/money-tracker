import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
  ThemeProvider,
} from "react-native-paper";

import Header from "./Header";
import BottomMenu from "./BottomMenu";
import UserFormScreen from "../screens/UserFormScreen";
import TransactionScreen from "../screens/TransactionScreen";
import TransactionFormScreen from "../screens/TransactionFormScreen";

const Stack = createStackNavigator();

const RootNavigator = () => {
  const [nightMode, setNightmode] = useState(false);

  return (
    <PaperProvider theme={nightMode ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={nightMode ? DarkTheme : DefaultTheme}>
        <StatusBar
          backgroundColor={
            nightMode ? DarkTheme.colors.surface : DefaultTheme.colors.primary
          }
          barStyle={"light-content"}
        />

        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              header: ({ navigation }) => (
                <Header
                  navigation={navigation}
                  setNightmode={setNightmode}
                  nightMode={nightMode}
                />
              ),
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
      </ThemeProvider>
    </PaperProvider>
  );
};

export default RootNavigator;
