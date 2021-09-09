import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Avatar, Surface } from "react-native-paper";

import CardComponent from "../components/common/CardComponent";

const LeftContent = (props) => <Avatar.Icon {...props} icon="currency-inr" />;

const Home = () => {
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
        <CardComponent
          style={styles.card}
          title={giveAmount}
          subtitle="You will give"
          left={LeftContent}
        />
        <CardComponent
          style={styles.card}
          title={getAmount}
          subtitle="You Will get"
          left={LeftContent}
        />
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

export default Home;
