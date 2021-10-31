import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeScreen from "../screens/Home";
import TransactionsScreen from "../screens/Transactions";

const { Navigator, Screen } = createMaterialBottomTabNavigator();

const BottomTabNavigator = (props) => {
  return (
    <Navigator
      initialRouteName="Home"
      shifting={true}
      sceneAnimationEnabled={false}
    >
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: "home-account",
        }}
      />
      <Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          tabBarIcon: "currency-inr",
        }}
      />
    </Navigator>
  );
};

export default BottomTabNavigator;
