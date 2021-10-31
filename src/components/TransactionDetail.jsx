import React, { useState } from "react";
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
import TransactionDataItem from "./TransactionDataItem";

const TransactionDetail = ({
  transaction,
  goToTransactionForm,
  handleDeleteTransaction,
  updateTransactionData,
  handleDeleteTransactionData,
}) => {
  const { id, balance, data: transactionData } = transaction;

  const [visibleContact, setVisibleContact] = useState(false);
  const [visibleTransaction, setVisibleTransaction] = useState(false);
  const [transactionDataId, setTransactionDataId] = useState("");

  const transactionBalance = balance ? Math.abs(balance) : 0;
  const transactionStatus = balance < 0 ? "You'll get" : "You'll give";

  const handleUserDeleteClick = () => {
    setVisibleContact(!visibleContact);
  };

  const handleContactDialogConfirm = () => {
    setVisibleContact(!visibleContact);

    handleDeleteTransaction(id);
  };

  const handleContactDialogCancel = () => {
    setVisibleContact(!visibleContact);
  };

  const handleTransactionDeleteClick = (transactionDataId) => {
    setVisibleTransaction(!visibleTransaction);

    setTransactionDataId(transactionDataId);
  };

  const handleTransactionDialogConfirm = () => {
    setVisibleTransaction(!visibleTransaction);
    handleDeleteTransactionData(id, transactionDataId);
    setTransactionDataId("");
  };

  const handleTransactionDialogCancel = () => {
    setVisibleTransaction(!visibleTransaction);
    setTransactionDataId("");
  };

  const userHeaderRightContent = () => {
    return (
      <Text>
        <IconButton icon="account-remove" onPress={handleUserDeleteClick} />
      </Text>
    );
  };

  return (
    <Surface style={styles.containerStyle}>
      <SafeAreaView style={styles.safeContainerStyle}>
        <ScrollView>
          <DialogComponent
            visible={visibleContact}
            dialogContent="Are you sure you want to delete the contact's transactions?"
            handleDialogCancelPress={handleContactDialogCancel}
            handleDialogConfirmPress={handleContactDialogConfirm}
          />

          <CardComponent
            style={styles.userHeader}
            title={transaction.name}
            left={(props) => <Avatar.Icon {...props} icon="account-circle" />}
            right={userHeaderRightContent}
          />

          {transactionBalance > 0 && (
            <CardComponent
              style={styles.transactionList}
              title={transactionBalance}
              subtitle={transactionStatus}
              left={(props) => <Avatar.Icon {...props} icon="currency-inr" />}
            />
          )}

          <DialogComponent
            visible={visibleTransaction}
            dialogContent="Are you sure you want to delete?"
            handleDialogCancelPress={handleTransactionDialogCancel}
            handleDialogConfirmPress={handleTransactionDialogConfirm}
          />

          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 1.5 }}>Date</DataTable.Title>
              <DataTable.Title style={{ flex: 1 }}>Status</DataTable.Title>
              <DataTable.Title style={{ flex: 1 }}>Amount</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Action</DataTable.Title>
            </DataTable.Header>
            {transactionData && transactionData.length > 0 ? (
              transactionData.map((transaction, index) => (
                <TransactionDataItem
                  key={index}
                  transactionId={id}
                  transaction={transaction}
                  handleEditClick={goToTransactionForm}
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

        <FabComponent
          icon="plus"
          onPress={() => {
            goToTransactionForm(id);
          }}
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

export default TransactionDetail;
