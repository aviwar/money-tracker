import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  DataTable,
  IconButton,
  Surface,
  Text,
} from "react-native-paper";

import DialogComponent from "../components/common/DialogComponent";
import FabComponent from "../components/common/FabComponent";
import CardComponent from "../components/common/CardComponent";
import TransactionItem from "../components/TransactionItem";
import {
  deleteTransaction,
  deleteUserTransactions,
  deleteUser,
  updateUserBalance,
} from "../store/actions";

const Transaction = ({ route, navigation }) => {
  const { userId } = route.params;
  const { users, transactions } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  const [userTransactions, setUserTransactions] = useState();

  const [transactionId, setTransactionId] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const userBalance = user.balance ? Math.abs(user.balance) : 0;
  const userStatus = user.balance < 0 ? "You'll get" : "You'll give";

  const filterUser = (userId) => {
    const res = users.find(({ id }) => id === userId);

    if (!res) {
      navigation.navigate("Users");
    } else {
      setUser(res);
    }
  };

  const getTransactions = (userId) => {
    const res = transactions.filter(
      (transaction) => transaction.userId === userId
    );
    setUserTransactions(res);
  };

  useEffect(() => {
    filterUser(userId);
    getTransactions(userId);
  }, []);

  useEffect(() => {
    filterUser(userId);
  }, [users]);

  useEffect(() => {
    getTransactions(userId);
  }, [transactions]);

  const navigateToTransactionForm = () => {
    navigation.push("TransactionForm", {
      userId: userId,
    });
  };

  const handleUserEditClick = () => {
    navigation.push("UserForm", {
      id: userId,
    });
  };

  const handleUserDeleteClick = () => {
    setDialogVisible(!dialogVisible);
  };

  const handleTransactionEditClick = (transactionId) => {
    navigation.push("TransactionForm", {
      id: transactionId,
      userId: userId,
    });
  };

  const handleTransactionDeleteClick = (transactionId) => {
    setDialogVisible(!dialogVisible);
    setTransactionId(transactionId);
  };

  const handleDialogCancelPress = () => {
    setDialogVisible(!dialogVisible);
  };

  const handleDialogConfirmPress = () => {
    setDialogVisible(!dialogVisible);

    if (transactionId) {
      dispatch(deleteTransaction(transactionId));
      dispatch(updateUserBalance(userId));
      setTransactionId("");
    } else {
      dispatch(deleteUserTransactions(userId));
      dispatch(deleteUser(userId));
    }
  };

  const userHeaderRightContent = () => {
    return (
      <Text>
        <IconButton icon="account-edit" onPress={handleUserEditClick} />
        <IconButton icon="account-remove" onPress={handleUserDeleteClick} />
      </Text>
    );
  };

  return (
    <Surface style={styles.containerStyle}>
      <SafeAreaView style={styles.safeContainerStyle}>
        <ScrollView>
          <CardComponent
            style={styles.userHeader}
            title={user.name}
            left={(props) => <Avatar.Icon {...props} icon="account-circle" />}
            right={userHeaderRightContent}
          />

          {userBalance > 0 && (
            <CardComponent
              style={styles.transactionList}
              title={userBalance}
              subtitle={userStatus}
              left={(props) => <Avatar.Icon {...props} icon="currency-inr" />}
            />
          )}

          <DialogComponent
            visible={dialogVisible}
            dialogContent="Are u sure?"
            handleDialogCancelPress={handleDialogCancelPress}
            handleDialogConfirmPress={handleDialogConfirmPress}
          />

          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 1.5 }}>Date</DataTable.Title>
              <DataTable.Title style={{ flex: 1 }}>Status</DataTable.Title>
              <DataTable.Title style={{ flex: 1 }}>Amount</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Action</DataTable.Title>
            </DataTable.Header>
            {userTransactions && userTransactions.length > 0 ? (
              userTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  handleEditClick={handleTransactionEditClick}
                  handleDeleteClick={handleTransactionDeleteClick}
                />
              ))
            ) : (
              <DataTable.Row>
                <DataTable.Cell>No Transactions!</DataTable.Cell>
              </DataTable.Row>
            )}
          </DataTable>
        </ScrollView>

        <FabComponent icon="plus" onPress={navigateToTransactionForm} />
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
  userHeader: {
    padding: 10,
  },
  transactionList: {
    marginTop: 20,
    padding: 12,
  },
});

export default Transaction;
