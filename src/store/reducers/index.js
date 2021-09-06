import {
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  GET_TRANSACTIONS,
  ADD_USER,
  GET_USERS,
  UPDATE_USER,
  DELETE_USER,
  UPDATE_USER_BALANCE,
  DELETE_TRANSACTION,
  DELETE_USER_TRANSACTIONS,
} from "../actionTypes";

const INITIAL_STATE = {
  transactions: [],
  users: [],
};

const rootReducer = (state = INITIAL_STATE, action) => {
  let userId, transactionId, filteredUsers, filteredTransactions;

  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case GET_TRANSACTIONS:
      return { ...state };
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case GET_USERS:
      return { ...state };
    case UPDATE_USER:
      userId = action.payload.userId;
      const users = state.users.map((user) => {
        if (user.id === userId) {
          return action.payload.user;
        } else {
          return user;
        }
      });

      return { ...state, users: users };
    case UPDATE_USER_BALANCE:
      filteredTransactions = state.transactions.filter(
        (transaction) => transaction.userId === action.payload.userId
      );

      let balance = filteredTransactions
        .map((transaction) => parseInt(transaction.amount))
        .reduce((prev, next) => prev + next, 0);

      const balanceUpdatedUsers = state.users.map((user) => {
        if (user.id === action.payload.userId) {
          return { ...user, balance: balance };
        } else {
          return user;
        }
      });

      return { ...state, users: balanceUpdatedUsers };
    case DELETE_USER:
      filteredUsers = state.users.filter(
        (user) => user.id !== action.payload.userId
      );

      return { ...state, users: filteredUsers };
    case UPDATE_TRANSACTION:
      transactionId = action.payload.id;
      let transactions = state.transactions.map((transaction) => {
        if (transaction.id === transactionId) {
          return action.payload.transaction;
        } else {
          return transaction;
        }
      });

      return { ...state, transactions: transactions };
    case DELETE_TRANSACTION:
      filteredTransactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload.id
      );

      return { ...state, transactions: filteredTransactions };
    case DELETE_USER_TRANSACTIONS:
      filteredTransactions = state.transactions.filter(
        (transaction) => transaction.userId !== action.payload.userId
      );

      return { ...state, transactions: filteredTransactions };
    default:
      return { ...state };
  }
};

export default rootReducer;
