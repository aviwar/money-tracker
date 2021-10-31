import React from "react";
import { useSelector } from "react-redux";

import TransactionList from "../components/TransactionList";

const TransactionsScreen = ({ navigation }) => {
  const transactions = useSelector((state) => state.transactions);

  const goToTransactionDetail = (id) => {
    navigation.navigate("TransactionDetail", {
      id: id,
    });
  };

  const goToAddTransaction = () => {
    navigation.navigate("AddTransaction");
  };

  return (
    <TransactionList
      goToTransactionDetail={goToTransactionDetail}
      goToAddTransaction={goToAddTransaction}
      transactions={transactions}
    />
  );
};

export default TransactionsScreen;
