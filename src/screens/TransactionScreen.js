import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { FAB, Portal, Surface, Text, Dialog } from "react-native-paper";
import { Avatar, Card, IconButton } from "react-native-paper";
import { DataTable } from "react-native-paper";

import TransactionItem from "../components/TransactionItem";
import DialogComponent from "../components/common/DialogComponent";
import FabComponent from "../components/common/FabComponent";

import {
  deleteTransaction,
  deleteUserTransactions,
  deleteUser,
  updateUserBalance,
} from "../store/actions";

const TransactionScreen = ({ route, navigation }) => {
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
          <Card style={styles.userHeader} mode="outlined">
            <Card.Title
              title={user.name}
              left={(props) => <Avatar.Icon {...props} icon="account-circle" />}
              right={userHeaderRightContent}
            />
          </Card>

          {userBalance > 0 && (
            <Card style={styles.transactionList} mode="outlined">
              <Card.Title
                title={userBalance}
                subtitle={userStatus}
                left={(props) => <Avatar.Icon {...props} icon="currency-inr" />}
              />
            </Card>
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

        <Portal.Host>
          <FabComponent icon="plus" onPress={navigateToTransactionForm} />
        </Portal.Host>
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

export default TransactionScreen;
