import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Title, Caption } from "react-native-paper";

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
    <Card
      onPress={(props) => {
        handleOnPress(id);
      }}
      style={styles.userCard}
      mode="outlined"
    >
      <Card.Title
        title={name}
        left={(props) => <Avatar.Icon {...props} icon="account-circle" />}
        right={(props) => <RightContent />}
      />
    </Card>
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
