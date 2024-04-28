// contactActions.ts

import { Reducer } from 'redux';
import { ContactDetails } from '../components/CreateContact';

// Define action types
export const ADD_CONTACT = 'ADD_CONTACT';

// Load initial state from local storage
const storedContacts = localStorage.getItem('contacts');
const initialState: ContactDetails[] = storedContacts ? JSON.parse(storedContacts) : [];

// Define reducer
const contactReducer: Reducer<ContactDetails[], ContactAction> = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            const newState = [...state, action.payload];
            // Save state to local storage whenever it changes
            localStorage.setItem('contacts', JSON.stringify(newState));
            return newState;
        default:
            return state;
    }
};

// Define action creator function
export const addContact = (contact: ContactDetails) => ({
    type: ADD_CONTACT,
    payload: contact,
});

// Define ContactAction type
interface AddContactAction {
    type: typeof ADD_CONTACT;
    payload: ContactDetails;
}

// Define ContactAction union type
type ContactAction = AddContactAction;

export default contactReducer;
