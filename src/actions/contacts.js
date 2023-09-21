import { RETRIEVE_CONTACTS } from './types';
import ContactDataService from '../services/contact.service';

export const retrieveContacts = (pageNumber, query) => async (dispatch) => {
    try {
        const res = await ContactDataService.getAllContacts(pageNumber, query);

        dispatch({
            type: RETRIEVE_CONTACTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
