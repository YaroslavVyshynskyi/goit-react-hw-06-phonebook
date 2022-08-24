import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice } from 'slice/contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  },
});
