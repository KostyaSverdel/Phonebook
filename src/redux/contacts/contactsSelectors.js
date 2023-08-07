import { createSelector } from '@reduxjs/toolkit';
import { sliceFilter } from 'redux/contacts/sliceFilter';

export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectFilterContacts = createSelector(
  [sliceFilter, selectContacts],
  (filter, contacts) =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
);
