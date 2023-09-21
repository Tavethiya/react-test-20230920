import BaseService from "./base-service";

class ContactDataService {
    getAllContacts(pageNumber, query) {
        let noGroupDuplicates = 1;
        if (query) {
            noGroupDuplicates = 0;
        }
        let URL = `/contacts.json?companyId=171&countryId=226&page=${pageNumber}&noGroupDuplicates=${noGroupDuplicates}`;
        if (query && query.trim()) {
            URL = `${URL}&query=${query}`;
        }
        return BaseService.get(URL);
    }
}

export default new ContactDataService();