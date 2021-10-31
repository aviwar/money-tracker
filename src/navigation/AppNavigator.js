import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const TopNavigator = React.lazy(() => import("./TopNavigator"));
const BottomTabNavigator = React.lazy(() => import("./BottomTabNavigator"));
const TransactionDetail = React.lazy(() =>
  import("../screens/TransactionDetail")
);
const AddTransaction = React.lazy(() => import("../screens/AddTransaction"));
const TransactionFormScreen = React.lazy(() =>
  import("../screens/TransactionFormScreen")
);

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => (
  <Navigator
    screenOptions={{
      header: (props) => <TopNavigator {...props} />,
    }}
  >
    <Screen name="BottomTab" component={BottomTabNavigator} />
    <Screen name="TransactionDetail" component={TransactionDetail} />
    <Screen name="AddTransaction" component={AddTransaction} />
    <Screen name="TransactionForm" component={TransactionFormScreen} />
  </Navigator>
);

export default AppNavigator;
