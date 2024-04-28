import { Reducer } from 'redux';
import { ContactDetails } from '../components/CreateContact';

export const ADD_CONTACT = 'ADD_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';

const initialState: ContactDetails[] = [];

const contactReducer: Reducer<ContactDetails[], ContactAction> = (state = initialState, action) => {
  switch (action.type) {
      case ADD_CONTACT:
          const newStateAfterAdd = [...state, action.payload];
          localStorage.setItem('contacts', JSON.stringify(newStateAfterAdd));
          return newStateAfterAdd;
      case UPDATE_CONTACT:
          const updatedContactIndex = state.findIndex(contact => contact.id === action.payload.id);
          if (updatedContactIndex !== -1) {
              const newStateAfterUpdate = [...state];
              newStateAfterUpdate[updatedContactIndex] = action.payload;
              localStorage.setItem('contacts', JSON.stringify(newStateAfterUpdate));
              return newStateAfterUpdate;
          } else {
              return state;
          }
      case DELETE_CONTACT:
          const newStateAfterDelete = state.filter(contact => contact.id !== action.payload.id);
          localStorage.setItem('contacts', JSON.stringify(newStateAfterDelete));
          return newStateAfterDelete;
      default:
          return state;
  }
};

export const addContact = (contact: ContactDetails) => ({
  type: ADD_CONTACT,
  payload: contact,
});

export const updateContact = (contact: ContactDetails) => ({
  type: UPDATE_CONTACT,
  payload: contact,
});

export const deleteContact = (contact: ContactDetails) => ({
  type: DELETE_CONTACT,
  payload: contact,
});

interface AddContactAction {
  type: typeof ADD_CONTACT;
  payload: ContactDetails;
}

interface UpdateContactAction {
  type: typeof UPDATE_CONTACT;
  payload: ContactDetails;
}

interface DeleteContactAction {
  type: typeof DELETE_CONTACT;
  payload: ContactDetails;
}

type ContactAction = AddContactAction | UpdateContactAction | DeleteContactAction;

export default contactReducer;