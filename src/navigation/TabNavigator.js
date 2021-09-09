import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const HomeScreen = React.lazy(() => import("../screens/Home"));
const UsersScreen = React.lazy(() => import("../screens/Users"));

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = (props) => {
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

export default TabNavigator;
