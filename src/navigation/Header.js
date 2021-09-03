import React from "react";
import { Appbar } from "react-native-paper";

const Header = ({ navigation, nightMode, setNightmode }) => {
  const previous = navigation.canGoBack();

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Money Tracker" />
      <Appbar.Action
        icon={nightMode ? "brightness-7" : "brightness-3"}
        // icon="brightness-3"
        onPress={() => setNightmode(!nightMode)}
      />
    </Appbar.Header>
  );
};

export default Header;
