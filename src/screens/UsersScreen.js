import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { FAB, Surface, Text } from "react-native-paper";

import UserItem from "../components/UserItem";
import { getUsers } from "../store/actions";

const UsersScreen = ({ navigation }) => {
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const fetchUsers = () => dispatch(getUsers());

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserOnPress = (userId) => {
    navigation.navigate("Transactions", {
      userId: userId,
    });
  };

  return (
    <Surface style={styles.containerStyle}>
      <SafeAreaView style={styles.safeContainerStyle}>
        <ScrollView>
          {users && users.length > 0 ? (
            users.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                handleOnPress={handleUserOnPress}
              />
            ))
          ) : (
            <Text>No users found!</Text>
          )}
        </ScrollView>

        <FAB
          icon="plus"
          style={{
            position: "absolute",
            bottom: 25,
            right: 16,
          }}
          onPress={() => navigation.navigate("UserForm")}
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
    justifyContent: "center",
  },
});

export default UsersScreen;
