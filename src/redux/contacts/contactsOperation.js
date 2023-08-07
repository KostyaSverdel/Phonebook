import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: '',
};
export const fetchContactsAsync = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('contacts');

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newUser, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('contacts', newUser);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`contacts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const updateContactAsync = createAsyncThunk(
  'contacts/updateContact',
  async ({ contactId, contact }) => {
    const { data } = await axios.patch(`contacts/${contactId}`, contact);
    return data;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchContactsAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (newUser) => newUser.id !== action.payload
        );
      })
      .addCase(updateContactAsync.fulfilled, (state, action) => {
        const { id, ...rest } = action.payload;
        const index = state.items.findIndex((newUser) => newUser.id === id);
        if (index !== -1) {
          state.items[index] = { id, ...rest };
        }
      });
  },
});

export const { setFilter } = contactsSlice.actions;

export default contactsSlice;
