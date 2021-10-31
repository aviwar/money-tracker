import React from "react";
import { useTheme, Appbar } from "react-native-paper";

import { ThemeContext } from "../theme/ThemeContext";

const TopNavigator = ({ navigation, back }) => {
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(ThemeContext);

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: theme?.colors.surface,
        },
      }}
    >
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Money Tracker" />
      <Appbar.Action
        icon={isThemeDark ? "brightness-7" : "brightness-3"}
        onPress={() => toggleTheme()}
      />
    </Appbar.Header>
  );
};

export default TopNavigator;
