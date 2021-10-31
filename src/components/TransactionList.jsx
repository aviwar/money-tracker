import React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Surface, Text } from "react-native-paper";

import FabComponent from "../components/common/FabComponent";
import UserItem from "../components/UserItem";

const TransactionList = ({
  transactions,
  goToAddTransaction,
  goToTransactionDetail,
}) => {
  return (
    <Surface style={styles.containerStyle}>
      <SafeAreaView style={styles.safeContainerStyle}>
        <ScrollView>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <UserItem
                key={transaction.id}
                user={transaction}
                handleOnPress={() => goToTransactionDetail(transaction.id)}
              />
            ))
          ) : (
            <Text>No transactions found!</Text>
          )}
        </ScrollView>
        <FabComponent icon="plus" onPress={goToAddTransaction} />
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

export default TransactionList;
