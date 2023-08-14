import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectError,
  selectFilterContacts,
  selectIsLoading,
} from 'redux/contacts/contactsSelectors';

import { fetchContactsAsync } from '../../../redux/contacts/contactsOperation';
import ContactListItem from '../ContactListItem/ContactListItem';

export const ContactList = () => {
  const error = useSelector(selectError);
  const filterContacts = useSelector(selectFilterContacts);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (error !== null) {
      console.error(`Sorry, but ${error}`);
    }
  }, [error]);

  return (
    <ul>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        filterContacts.map(contact => (
          <ContactListItem key={contact.id} {...contact} />
        ))
      )}
    </ul>
  );
};

export default ContactList;
