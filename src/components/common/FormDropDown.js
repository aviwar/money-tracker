import React, { useState } from "react";
import { StyleSheet, Dimensions, Text } from "react-native";
import { Button } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

const { width, height } = Dimensions.get("screen");

const FormDropDown = ({ labelName, dropdownList, ...rest }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <DropDown
      label={"Type"}
      mode={"outlined"}
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      list={dropdownList}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    // width: width / 2,
    height: height / 15,
  },
});

export default FormDropDown;
