import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectError,
  selectFilterContacts,
  selectIsLoading,
} from 'redux/contacts/contactsSelectors';
import { fetchContactsAsync } from 'redux/contacts/contactsOperation';

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
    <>
      {filterContacts.length !== 0 ? (
        <div style={{ flexGrow: 1, maxWidth: 752 }}>
          <div>
            <h6 style={{ marginTop: '2rem', marginBottom: '1rem' }}>
              CONTACTS: {filterContacts.length} pcs
            </h6>
            <ul style={{ listStyle: 'none' }}>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                filterContacts.map(contact => (
                  <li key={contact.id}>
                    <div>
                      <div>
                        <span>{contact.name}</span>
                        <span>{contact.number}</span>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : (
        <h4>Please add contact</h4>
      )}
    </>
  );
};
