import React from "react";
import { StyleSheet } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

const FormInput = ({ labelName, ...rest }) => {
  const { error } = rest;
  const errorMessage = error?.message;

  return (
    <>
      <TextInput
        mode={"outlined"}
        label={labelName}
        style={styles.input}
        numberOfLines={1}
        {...rest}
      />
      {errorMessage && <HelperText type={"error"}>{errorMessage}</HelperText>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default FormInput;
