import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Header = React.lazy(() => import("./Header"));
const BottomTab = React.lazy(() => import("./TabNavigator"));
const UserFormScreen = React.lazy(() => import("../screens/UserForm"));
const TransactionScreen = React.lazy(() => import("../screens/Transaction"));
const TransactionFormScreen = React.lazy(() =>
  import("../screens/TransactionForm")
);

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="UserForm" component={UserFormScreen} />
      <Stack.Screen name="Transactions" component={TransactionScreen} />
      <Stack.Screen name="TransactionForm" component={TransactionFormScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
