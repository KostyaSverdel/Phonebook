import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContactsAsync } from './contactsOperation';

const defaultStatus = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

const operationsArr = [addContact, deleteContact, fetchContactsAsync];
const allOperationStatus = status => operationsArr.map(el => el[status]);

const handlePending = state => {
  state.isLoading = true;
};
const handleError = (state, { payload }) => {
  state.error = payload;
  state.isLoading = false;
};
const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContactsAsync.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(item => item.id !== payload);
      })
      .addMatcher(
        isAnyOf(...allOperationStatus(defaultStatus.pending)),
        handlePending
      )
      .addMatcher(
        isAnyOf(...allOperationStatus(defaultStatus.fulfilled)),
        handleFulfilled
      )
      .addMatcher(
        isAnyOf(...allOperationStatus(defaultStatus.rejected)),
        handleError
      );
  },
});

export const contactsReducer = contactsSlice.reducer;