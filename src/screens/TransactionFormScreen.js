import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, StyleSheet } from "react-native";
import { Surface, Title } from "react-native-paper";

import FormInput from "../components/common/FormInput";
import FormButton from "../components/common/FormButton";
import FormDropDown from "../components/common/FormDropDown";
import { Uuid } from "../components/common/Utils";
import {
  addTransaction,
  updateTransaction,
  updateUserBalance,
} from "../store/actions";

const typeList = [
  {
    label: "Gave",
    value: "gave",
  },
  {
    label: "Got",
    value: "got",
  },
];

const TransactionFormScreen = ({ route, navigation }) => {
  const { id, userId } = route.params;

  const transactions = useSelector((state) => state.transactions);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("gave");
  const [transaction, setTransaction] = useState({});

  const formTitle = id !== "" ? "Update" : "Add";

  const dispatch = useDispatch();
  const addToTransactionList = (transaction) =>
    dispatch(addTransaction(transaction));
  const updateTransactionList = (id, transaction) =>
    dispatch(updateTransaction(id, transaction));
  const updateUserBalanceList = (userId) => dispatch(updateUserBalance(userId));

  const handleFormSubmit = () => {
    if (amount == "") {
      alert("name is required");
      return;
    }

    let signAmount = type === "gave" ? -1 * amount : amount;

    if (id) {
      let updatedTransaction = { ...transaction, amount: signAmount, type };
      updateTransactionList(id, updatedTransaction);

      alert("Transaction Updated!");
    } else {
      let transaction = {
        id: Uuid(),
        userId: userId,
        amount: signAmount,
        type: type,
        createdAt: Date.now(),
      };

      addToTransactionList(transaction);
      resetForm();

      alert("Transaction Added!");
    }

    updateUserBalanceList(userId);
  };

  const resetForm = () => {
    setAmount("");
    setType("");
  };

  const filterTransaction = (id) => {
    let filteredTransaction = transactions.find(
      (transaction) => transaction.id === id
    );
    let amount = filteredTransaction?.amount || 0;
    let type = filteredTransaction?.type || "";

    setTransaction(filteredTransaction);
    setAmount(Math.abs(amount).toString());
    setType(type);
  };

  useEffect(() => {
    if (id) {
      filterTransaction(id);
    }
  }, []);

  return (
    <Surface style={styles.containerStyle}>
      <SafeAreaView style={styles.safeContainerStyle}>
        <Title style={styles.titleText}>{formTitle} Transaction</Title>
        <FormInput
          labelName="Amount"
          value={amount}
          autoCapitalize="none"
          onChangeText={(userAmount) => setAmount(userAmount)}
        />

        <FormDropDown
          labelName="Type"
          value={type}
          setValue={setType}
          dropdownList={typeList}
        />

        <FormButton
          title="Submit"
          modeValue="contained"
          labelStyle={styles.formButtonLabel}
          onPress={handleFormSubmit}
        />
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
  },
  titleText: {
    fontSize: 22,
    marginBottom: 10,
  },
  formButtonLabel: {
    fontSize: 20,
  },
});

export default TransactionFormScreen;
