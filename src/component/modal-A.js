import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import FormCheck from 'react-bootstrap/FormCheck';
import CommonFilter from './common-filter';
import ContactDataTable from './contact-data-table';
import { retrieveContacts } from "../actions/contacts";
import { connect } from "react-redux";

//const pageSize = 20;

function ModalA(props) {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const [value, setValue] = useState("");
    const [totalRecord, setTotalRecord] = useState(1);
    const [page, setPage] = useState(1);
    const [onlyEven, setOnlyEven] = useState(false);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        props.retrieveContacts(page, value).then((res) => {
            const contactsData = [];
            const { payload: { contacts: responseData } } = res;
            const contactKeys = Object.keys(responseData);
            if (contactKeys && contactKeys.length) {
                contactKeys.forEach(contactId => {
                    const contact = responseData[contactId];
                    const { country } = contact;
                    if (country && country.iso === "US") {
                        if (onlyEven) {
                            if (!(Number(contactId) % 2)) {
                                contactsData.push(contact);
                            }
                        } else {
                            contactsData.push(contact);
                        }
                    }
                });

                const updatedData = contacts.concat(contactsData);
                setContacts(updatedData);
            } else {
                if (page === 1) {
                    setContacts([]);
                }
            }
        });
    }, []);

    const onScrollStop = () => {
        const updatedPage = page + 1;
        setPage(updatedPage);
        //getContactsData({ isConcatData: true, pageNumber: updatedPage });
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl' backdrop="static">
                <Modal.Header>
                    <Modal.Title>All Contacts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CommonFilter filterContacts={value} setFilterContacts={setValue} />
                    <ContactDataTable contacts={contacts} onScrollStop={onScrollStop} />
                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    <div>
                        <FormCheck label="Only Even" value={onlyEven} onChange={(event) => setOnlyEven(event.target.value)}>
                        </FormCheck>
                    </div>
                    <Link to="/" className="btn btn-secondary button-c">Close</Link>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        contacts: state.contacts
    };
}

export default connect(mapStateToProps, { retrieveContacts })(ModalA);