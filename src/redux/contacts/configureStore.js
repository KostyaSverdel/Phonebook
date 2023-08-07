import { configureStore } from '@reduxjs/toolkit';
import contactsSlice from './contactsOperation';

export default configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  },
});
