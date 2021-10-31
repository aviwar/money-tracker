import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Surface, Title } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

import FormInput from "../components/common/FormInput";
import FormButton from "../components/common/FormButton";
import FormSelect from "../components/common/FormSelect";
import FormDatePicker from "../components/common/FormDatePicker";

const formOptions = [
  {
    value: "gave",
    label: "Gave",
  },
  {
    value: "got",
    label: "Got",
  },
];

const TransactionForm = ({
  transactionId,
  transactionDataId,
  transactionData,
  handleFormSubmit,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      amount: "",
      type: "",
      date: new Date(),
    },
    mode: "onBlur",
  });

  const resetDefaultFormValues = (data) => {
    const updatedValues = {
      amount: Math.abs(data.amount).toString(),
      type: data.type,
      date: new Date(data.date),
    };

    reset(updatedValues);
  };

  useEffect(() => {
    if (transactionDataId && Object.keys(transactionData).length > 0) {
      resetDefaultFormValues(transactionData);
    }
  }, [transactionDataId, transactionData]);

  const formTitle = transactionDataId ? "Update" : "Add";

  return (
    <Surface style={styles.containerStyle}>
      <SafeAreaView style={styles.safeContainerStyle}>
        <Title style={styles.titleText}>{formTitle} Transaction</Title>

        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value, onBlur } }) => (
            <FormInput
              keyboardType="numeric"
              labelName="Amount"
              value={value}
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.amount}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "Amount is required!",
            },
          }}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value, onBlur } }) => (
            <FormSelect
              label="Transaction Type"
              options={formOptions}
              onChange={onChange}
              value={value}
              error={errors.type}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "Please select Transaction Type!",
            },
          }}
        />

        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <FormDatePicker label="Date" value={value} onChange={onChange} />
          )}
        />

        <FormButton
          title="Submit"
          modeValue="contained"
          labelStyle={styles.formButtonLabel}
          onPress={handleSubmit(handleFormSubmit)}
          error={true}
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

export default TransactionForm;
