import React from "react";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";

const DialogComponent = (props) => {
  const {
    visible,
    dialogContent,
    handleDialogCancelPress,
    handleDialogConfirmPress,
  } = props;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={handleDialogCancelPress}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{dialogContent}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDialogCancelPress}>Cancel</Button>
          <Button onPress={handleDialogConfirmPress}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogComponent;
