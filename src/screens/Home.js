import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Home from "../components/Home";

const HomeScreen = ({ navigation }) => {
  const transactions = useSelector((state) => state.transactions);

  const [getAmount, setGetAmount] = useState("0");
  const [giveAmount, setGiveAmount] = useState("0");

  useEffect(() => {
    calculateGetAmount();
    calculateGiveAmount();
  }, [transactions]);

  const goToTransactions = () => {
    navigation.navigate("Transactions");
  };

  const calculateBalance = (filteredTransactions) => {
    const balanceAmount = filteredTransactions
      .map((transaction) => transaction.balance)
      .reduce((prev, next) => prev + next, 0);

    return Math.abs(balanceAmount).toString();
  };

  const calculateGetAmount = () => {
    let filteredTransactions = transactions.filter((transaction) => {
      return transaction.balance < 0;
    });
    let balanceAmount = calculateBalance(filteredTransactions);

    setGetAmount(balanceAmount);
  };

  const calculateGiveAmount = () => {
    let filteredTransactions = transactions.filter((transaction) => {
      return transaction.balance > 0;
    });
    let balanceAmount = calculateBalance(filteredTransactions);

    setGiveAmount(balanceAmount);
  };

  return (
    <Home transactionSummary={{ getAmount, giveAmount, goToTransactions }} />
  );
};

export default HomeScreen;
