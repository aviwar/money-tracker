import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Surface } from "react-native-paper";

import CardComponent from "../components/common/CardComponent";

const LeftContent = (props) => <Avatar.Icon {...props} icon="currency-inr" />;

const Home = ({ transactionSummary }) => {
  const { giveAmount, getAmount, goToTransactions } = transactionSummary;

  return (
    <Surface style={styles.surface}>
      <View style={styles.summary}>
        <CardComponent
          style={styles.card}
          title={giveAmount}
          subtitle="You will give"
          left={LeftContent}
          onPress={goToTransactions}
        />
        <CardComponent
          style={styles.card}
          title={getAmount}
          subtitle="You Will get"
          left={LeftContent}
          onPress={goToTransactions}
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
