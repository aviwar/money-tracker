import React, { useCallback } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";

import ContactListItem from "./ContactListItem";
import FormInput from "./common/FormInput";

const ContactList = ({
  isLoading,
  searchKey,
  contacts,
  searchContacts,
  handleContactOnPress,
}) => {
  const renderItem = useCallback(
    ({ item }) => (
      <ContactListItem
        contact={item}
        handleOnPress={() => handleContactOnPress(item)}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const listEmptyComponent = useCallback(
    () => <Text>No contacts found!</Text>,
    []
  );

  return (
    <Surface style={styles.containerStyle}>
      <SafeAreaView style={styles.safeContainerStyle}>
        <FormInput
          labelName="Search Contact"
          value={searchKey}
          autoCapitalize="none"
          onChangeText={(value) => searchContacts(value)}
        />

        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={listEmptyComponent}
          refreshing={isLoading}
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
});

export default ContactList;
