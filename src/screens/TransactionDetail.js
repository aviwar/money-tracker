import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TransactionDetail from "../components/TransactionDetail";

import {
  deleteTransaction,
  deleteTransactionData,
} from "../store/transactionSlice";

const TransactionDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const transactions = useSelector((state) => state.transactions);

  const [transaction, setTransaction] = useState({});

  const dispatch = useDispatch();

  const goToTransactions = () => {
    navigation.navigate("Transactions");
  };

  const goToTransactionForm = (id, transactionDataId) => {
    navigation.navigate("TransactionForm", {
      id: id,
      transactionDataId: transactionDataId,
    });
  };

  const handleDeleteTransaction = (id) => {
    dispatch(deleteTransaction(id));
    goToTransactions();
  };

  const updateTransactionData = (id, data) => {};

  const handleDeleteTransactionData = (id, transactionDataId) => {
    dispatch(deleteTransactionData({ id, transactionDataId }));
  };

  const filterTransaction = (transactionId) => {
    const res = transactions.find(({ id }) => id === transactionId);

    if (!res) {
      goToTransactions();
    } else {
      setTransaction(res);
    }
  };

  useEffect(() => {
    filterTransaction(id);
  }, [transactions]);

  return (
    <TransactionDetail
      transaction={transaction}
      goToTransactionForm={goToTransactionForm}
      handleDeleteTransaction={handleDeleteTransaction}
      updateTransactionData={updateTransactionData}
      handleDeleteTransactionData={handleDeleteTransactionData}
    />
  );
};

export default TransactionDetailScreen;
