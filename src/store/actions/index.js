import {
  ADD_USER,
  GET_USERS,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  GET_TRANSACTIONS,
  UPDATE_USER,
  DELETE_USER,
  UPDATE_USER_BALANCE,
  DELETE_TRANSACTION,
  DELETE_USER_TRANSACTIONS,
} from "../actionTypes";

export const getUsers = () => {
  return {
    type: GET_USERS,
  };
};

export const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

export const updateUser = (user, userId) => {
  return {
    type: UPDATE_USER,
    payload: { user, userId },
  };
};

export const deleteUser = (userId) => {
  return {
    type: DELETE_USER,
    payload: { userId },
  };
};

export const getTransactions = () => {
  return {
    type: GET_TRANSACTIONS,
  };
};

export const addTransaction = (transaction) => {
  return {
    type: ADD_TRANSACTION,
    payload: transaction,
  };
};

export const updateTransaction = (id, transaction) => {
  return {
    type: UPDATE_TRANSACTION,
    payload: { id, transaction },
  };
};

export const updateUserBalance = (userId) => {
  return {
    type: UPDATE_USER_BALANCE,
    payload: { userId },
  };
};

export const deleteTransaction = (id) => {
  return {
    type: DELETE_TRANSACTION,
    payload: { id },
  };
};

export const deleteUserTransactions = (userId) => {
  return {
    type: DELETE_USER_TRANSACTIONS,
    payload: { userId },
  };
};
