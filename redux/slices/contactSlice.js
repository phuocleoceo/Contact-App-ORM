import { createSlice } from '@reduxjs/toolkit';

const init = {
    listContact: [],
    currentContact: { id: 0, name: "", phone: "", email: "", img: "" }
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState: init,
    reducers: {
        SET_LIST_CONTACT: (state, action) =>
        {
            state.listContact = action.payload;
            return state;
        },
        SET_CURRENT_CONTACT: (state, action) =>
        {
            state.currentContact = action.payload;
            return state;
        }
    },
    extraReducers: {}
});

export const { SET_LIST_CONTACT, SET_CURRENT_CONTACT } = contactSlice.actions;

export default contactSlice.reducer;