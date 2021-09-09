import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import CardComponent from "./common/CardComponent";

const UserItem = (props) => {
  const { id, name, balance } = props.user;
  const { handleOnPress } = props;

  const userBalance = balance ? Math.abs(balance).toString() : "0";
  const userStatus = balance < 0 ? "You'll get" : "You'll give";

  const RightContent = () => {
    return (
      <View style={styles.rightContent}>
        <Title>Rs.{userBalance}</Title>
        <Caption>{userStatus}</Caption>
      </View>
    );
  };

  return (
    <CardComponent
      onPress={(props) => {
        handleOnPress(id);
      }}
      style={styles.userCard}
      title={name}
      left={(props) => <Avatar.Icon {...props} icon="account-circle" />}
      right={(props) => <RightContent />}
    />
  );
};

const styles = StyleSheet.create({
  userCard: {
    marginTop: 10,
  },
  rightContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
});

export default UserItem;
