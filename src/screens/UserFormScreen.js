import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, StyleSheet } from "react-native";
import { Surface, Text, Title } from "react-native-paper";

import FormInput from "../components/common/FormInput";
import FormButton from "../components/common/FormButton";
import { Uuid } from "../components/common/Utils";
import { addUser, updateUser } from "../store/actions";

const UserFormScreen = ({ route, navigation }) => {
  const userId = route.params?.id || "";
  const users = useSelector((state) => state.users);

  const [user, setUser] = useState({});

  const formTitle = userId !== "" ? "Update" : "Add";

  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const addToUserList = (user) => dispatch(addUser(user));
  const updateUserList = (user, userId) => dispatch(updateUser(user, userId));

  const getUser = (userId) => {
    const res = users.find(({ id }) => id === userId);

    let userName = res?.name || "";
    setUser(res);
    setName(userName);
  };

  useEffect(() => {
    if (userId !== "") {
      getUser(userId);
    }
  }, []);

  const handleFormSubmit = () => {
    if (name == "") {
      alert("User name is required");
      return;
    }

    if (userId !== "") {
      let updatedUser = { ...user, name };
      updateUserList(updatedUser, userId);

      alert("User Updated!");
    } else {
      let user = {
        id: Uuid(),
        name: name,
        balance: 0,
        createdAt: Date.now(),
      };
      addToUserList(user);
      setName("");

      alert("User Added!");
    }

    navigation.goBack();
  };

  return (
    <Surface style={styles.containerStyle}>
      <SafeAreaView style={styles.safeContainerStyle}>
        <Title style={styles.titleText}>{formTitle} User</Title>
        <FormInput
          labelName="Name"
          value={name}
          autoCapitalize="none"
          onChangeText={(userName) => setName(userName)}
        />

        <FormButton
          title="Submit"
          modeValue="contained"
          labelStyle={styles.formButtonLabel}
          onPress={handleFormSubmit}
        />
      </SafeAreaView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 12,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 10,
  },
  titleText: {
    fontSize: 22,
    marginBottom: 10,
  },
  formButtonLabel: {
    fontSize: 20,
  },
});

export default UserFormScreen;
