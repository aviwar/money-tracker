import React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Surface, Text } from "react-native-paper";

import ContactListItem from "./ContactListItem";
import FormInput from "./common/FormInput";
import Loader from "./common/Loader";

const ContactList = ({
  isLoading,
  searchKey,
  contacts,
  searchContacts,
  handleContactOnPress,
}) => {
  return (
    <Surface style={styles.containerStyle}>
      <SafeAreaView style={styles.safeContainerStyle}>
        <ScrollView>
          <FormInput
            labelName="Search Contact"
            value={searchKey}
            autoCapitalize="none"
            onChangeText={(value) => searchContacts(value)}
          />
          {isLoading ? (
            <Loader />
          ) : contacts && contacts.length > 0 ? (
            contacts.map((contact) => (
              <ContactListItem
                key={contact.id}
                contact={contact}
                handleOnPress={() => handleContactOnPress(contact)}
              />
            ))
          ) : (
            <Text>No contacts found!</Text>
          )}
        </ScrollView>
        {/* <FabComponent icon="plus" onPress={goToAddTransaction} /> */}
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
