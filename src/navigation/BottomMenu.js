import React, { Suspense } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Loader from "../components/common/Loader";

const HomeScreen = React.lazy(() => import("../screens/HomeScreen"));
const UsersScreen = React.lazy(() => import("../screens/UsersScreen"));

const Tab = createMaterialBottomTabNavigator();

const BottomMenu = (props) => {
  return (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};

export default BottomMenu;
