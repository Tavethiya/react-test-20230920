import { RETRIEVE_CONTACTS } from '../actions/types';

const initialState = [];

function contactReducer(contacts = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_CONTACTS:
            return payload;
        default:
            return contacts;
    }
};

export default contactReducer;