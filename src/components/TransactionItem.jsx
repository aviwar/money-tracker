import React from "react";
import { DataTable, IconButton } from "react-native-paper";

import { FormatDate } from "../utils";

const TransactionItem = ({
  transaction,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <DataTable.Row>
      <DataTable.Cell style={{ flex: 1.5 }}>
        {FormatDate(transaction.createdAt)}
      </DataTable.Cell>
      <DataTable.Cell style={{ flex: 1 }}>{transaction.type}</DataTable.Cell>
      <DataTable.Cell style={{ flex: 1 }}>{transaction.amount}</DataTable.Cell>
      <DataTable.Cell style={{ flex: 2 }}>
        <IconButton
          icon="pencil"
          onPress={() => {
            handleEditClick(transaction.id);
          }}
        />
        <IconButton
          icon="delete"
          onPress={() => {
            handleDeleteClick(transaction.id);
          }}
        />
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default TransactionItem;
