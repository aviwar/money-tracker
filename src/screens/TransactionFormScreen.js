import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TransactionForm from "../components/TransactionDataForm";

import { Uuid } from "../utils";
import {
  addTransaction,
  updateTransactionData,
} from "../store/transactionSlice";

const TransactionFormScreen = ({ route, navigation }) => {
  const { id, transactionDataId } = route.params;

  const transactions = useSelector((state) => state.transactions);

  const [transactionData, setTransactionData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (transactionDataId) {
      filterTransactionData(id, transactionDataId);
    }
  }, [id, transactionDataId]);

  const filterTransactionData = (transactionId, transactionDataId) => {
    const transaction = transactions.find(({ id }) => id === transactionId);

    const filteredData = transaction.data.find(
      ({ id }) => id === transactionDataId
    );

    if (filteredData) {
      setTransactionData(filteredData);
    }
  };

  const goToTransactionDetail = (id) => {
    navigation.navigate("TransactionDetail", {
      id: id,
    });
  };

  const handleFormSubmit = (data) => {
    const { amount, date, type } = data;
    let signAmount = parseInt(type === "gave" ? -1 * amount : amount);

    if (transactionDataId) {
      const transactionData = {
        ...data,
        id: transactionDataId,
        amount: signAmount,
        date: Date.parse(date),
      };

      dispatch(updateTransactionData({ id: id, data: transactionData }));
    } else {
      const transactionData = {
        ...data,
        id: Uuid(),
        amount: signAmount,
        date: Date.parse(date),
      };

      dispatch(addTransaction({ id: id, data: transactionData }));
    }

    goToTransactionDetail(id);
  };

  return (
    <TransactionForm
      transactionId={id}
      transactionDataId={transactionDataId}
      transactionData={transactionData}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default TransactionFormScreen;
