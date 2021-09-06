import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Surface, Text, FAB } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="currency-inr" />;

const SummaryCard = (props) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={props.title}
        subtitle={props.subtitle}
        left={LeftContent}
      />
    </Card>
  );
};

const HomeScreen = () => {
  const { users } = useSelector((state) => state);

  const [getAmount, setGetAmount] = useState("0");
  const [giveAmount, setGiveAmount] = useState("0");

  useEffect(() => {
    calculateGetAmount();
    calculateGiveAmount();
  }, [users]);

  const calculateBalanceSum = (filteredUsers) => {
    const balanceSum = filteredUsers
      .map((user) => user.balance)
      .reduce((prev, next) => prev + next, 0);

    return Math.abs(balanceSum).toString();
  };

  const calculateGetAmount = () => {
    let filteredUsers = users.filter((user) => {
      return user.balance < 0;
    });
    let balanceSum = calculateBalanceSum(filteredUsers);

    setGetAmount(balanceSum);
  };

  const calculateGiveAmount = () => {
    let filteredUsers = users.filter((user) => {
      return user.balance > 0;
    });
    let balanceSum = calculateBalanceSum(filteredUsers);

    setGiveAmount(balanceSum);
  };

  return (
    <Surface style={styles.surface}>
      <View style={styles.summary}>
        <SummaryCard title={giveAmount} subtitle="You will give" />
        <SummaryCard title={getAmount} subtitle="You Will get" />
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    height: "100%",
    width: "100%",
    padding: 12,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
  },
});

export default HomeScreen;
