import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ContactList from "../components/ContactList";
import { LoadContacts } from "../utils";

import { addContact } from "../store/transactionSlice";

// const initialContacts = [
//   {
//     id: 1,
//     name: "A 1",
//   },
//   {
//     id: 2,
//     name: "B 1",
//   },
//   {
//     id: 3,
//     name: "C 1",
//   },
// ];

const initialContacts = [];

const AddTransaction = ({ navigation }) => {
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [contacts, setcontacts] = useState(initialContacts);
  const [tempContacts, setTempContacts] = useState(initialContacts);

  const loadContacts = async () => {
    const loadedContacts = await LoadContacts();
    setcontacts(loadedContacts);
    setTempContacts(loadedContacts);
    setIsLoading(false);
  };

  const searchContacts = (value) => {
    setSearchKey(value);

    const filteredContacts = tempContacts.filter((contact) => {
      let contactLowercase = contact.name.toLowerCase();
      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });

    setcontacts(filteredContacts);
  };

  useEffect(() => {
    setIsLoading(true);
    loadContacts();
  }, []);

  const goToTransactionForm = (id) => {
    navigation.replace("TransactionForm", {
      id: id,
    });
  };

  const handleContactOnPress = (contact) => {
    const isContactExist = checkContactExist(contact);

    if (!isContactExist) {
      const contactData = {
        id: contact.id,
        name: contact.name,
        balance: 0,
        data: [],
      };

      dispatch(addContact(contactData));
      // dispatch(deleteContact(contact.id));
    }

    goToTransactionForm(contact.id);
  };

  const checkContactExist = (obj) => {
    return transactions.some((transaction) => transaction.id === obj.id);
  };

  return (
    <ContactList
      isLoading={isLoading}
      searchKey={searchKey}
      contacts={contacts}
      searchContacts={searchContacts}
      handleContactOnPress={handleContactOnPress}
    />
  );
};

export default AddTransaction;
