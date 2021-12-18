import React from "react";
import { FAB, Portal } from "react-native-paper";

const FabComponent = (props) => {
  const { icon, onPress } = props;

  return (
    <FAB
      icon={icon}
      style={{
        position: "absolute",
        bottom: 25,
        right: 16,
      }}
      onPress={onPress}
    />
  );
};

export default FabComponent;
