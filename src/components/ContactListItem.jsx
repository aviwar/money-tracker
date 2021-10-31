import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Title, Caption, Surface, Text } from "react-native-paper";

import CardComponent from "./common/CardComponent";

const ContactList = ({ contact, handleOnPress }) => {
  const { id, name } = contact;

  return (
    <CardComponent
      onPress={(props) => {
        handleOnPress(id);
      }}
      style={styles.userCard}
      title={name}
      left={(props) => <Avatar.Icon {...props} icon="account-circle" />}
    />
  );
};

const styles = StyleSheet.create({
  userCard: {
    marginTop: 10,
  },
});

export default ContactList;
