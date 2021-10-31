import React, { useState } from "react";
import { DataTable, IconButton } from "react-native-paper";

import { FormatDate } from "../utils";

const TransactionDataItem = ({
  transactionId,
  transaction,
  handleEditClick,
  handleDeleteClick,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <DataTable.Row>
      <DataTable.Cell style={{ flex: 1.5 }}>
        {FormatDate(transaction.date)}
      </DataTable.Cell>
      <DataTable.Cell style={{ flex: 1 }}>{transaction.type}</DataTable.Cell>
      <DataTable.Cell style={{ flex: 1 }}>{transaction.amount}</DataTable.Cell>
      <DataTable.Cell style={{ flex: 2 }}>
        <IconButton
          icon="pencil"
          onPress={() => {
            handleEditClick(transactionId, transaction.id);
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

export default TransactionDataItem;
