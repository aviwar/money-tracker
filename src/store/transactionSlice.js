import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transactions",
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
    },
    addTransaction: (state, action) => {
      const { id, data } = action.payload;

      const transaction = state.find((transaction) => transaction.id === id);
      if (transaction) {
        transaction.balance += data.amount;
        transaction.data.push(data);
      }
    },
    deleteTransaction: (state, action) => {
      return state.filter((transaction) => transaction.id !== action.payload);
    },
    updateTransactionData: (state, action) => {
      const { id: transactionId, data } = action.payload;

      const transactionIndex = state.findIndex(
        ({ id }) => id === transactionId
      );

      if (transactionIndex === -1) {
        return state;
      }

      const transaction = state[transactionIndex];
      const transactionData = transaction.data;
      const updatedTransactionData = transactionData.map((dataItem) =>
        dataItem.id === data.id ? { ...transactionData, ...data } : dataItem
      );

      const updatedBalance = updatedTransactionData.reduce(
        (prev, { amount }) => {
          return prev + amount;
        },
        0
      );

      const updatedTransaction = {
        ...transaction,
        balance: updatedBalance,
        data: updatedTransactionData,
      };

      return [
        ...state.slice(0, transactionIndex),
        updatedTransaction,
        ...state.slice(transactionIndex + 1),
      ];
    },
    deleteTransactionData: (state, action) => {
      const transactionIndex = state.findIndex(
        ({ id }) => id === action.payload.id
      );

      if (transactionIndex === -1) {
        return state;
      }

      const transaction = state[transactionIndex];
      const filteredTransactionData = transaction.data.filter(
        (transactionData) =>
          transactionData.id !== action.payload.transactionDataId
      );

      const updatedBalance = filteredTransactionData.reduce(
        (prev, { amount }) => {
          return prev + amount;
        },
        0
      );

      const updatedTransaction = {
        ...transaction,
        balance: updatedBalance,
        data: transaction.data.filter(
          (transactionData) =>
            transactionData.id !== action.payload.transactionDataId
        ),
      };

      return [
        ...state.slice(0, transactionIndex),
        updatedTransaction,
        ...state.slice(transactionIndex + 1),
      ];
    },
  },
});

export const {
  addContact,
  addTransaction,
  deleteTransaction,
  updateTransactionData,
  deleteTransactionData,
} = transactionSlice.actions;

export default transactionSlice.reducer;
