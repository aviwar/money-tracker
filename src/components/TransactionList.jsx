import React, { useCallback } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";

import FabComponent from "../components/common/FabComponent";
import UserItem from "../components/UserItem";

const TransactionList = ({
  transactions,
  goToAddTransaction,
  goToTransactionDetail,
}) => {
  const renderItem = useCallback(
    ({ item }) => (
      <UserItem
        user={item}
        handleOnPress={() => goToTransactionDetail(item.id)}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const listEmptyComponent = useCallback(
    () => <Text>No transactions found!</Text>,
    []
  );

  return (
    <Surface style={styles.containerStyle}>
      <SafeAreaView style={styles.safeContainerStyle}>
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={listEmptyComponent}
        />

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
