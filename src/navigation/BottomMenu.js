import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import UsersScreen from "../screens/UsersScreen";
import TransactionScreen from "../screens/TransactionScreen";

const Tab = createMaterialBottomTabNavigator();

const BottomMenu = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: "home-account",
        }}
      />
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{
          tabBarIcon: "account-multiple",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomMenu;
