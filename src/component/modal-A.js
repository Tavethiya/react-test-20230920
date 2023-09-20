import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormCheck from 'react-bootstrap/FormCheck';
import Table from 'react-bootstrap/Table';
import RSC from "react-scrollbars-custom";
import BaseService from '../services/base-service';
import CommonFilter from './common-filter';
import ContactDetailsPopup from './contact-details-popup';
import ContactDataTable from './contact-data-table';

//const pageSize = 20;

function ModalA() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const [value, setValue] = useState("");
    const [totalRecord, setTotalRecord] = useState(1);
    const [page, setPage] = useState(1);
    const [onlyEven, setOnlyEven] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [callShouldHappenOnScroll, setCallShouldHappenOnScroll] = useState(false);
    const [isContactDetailsPopup, setIsContactDetailsPopup] = useState(false);
    const [selectedContact, setSelectedContact] = useState({});

    const getContactsData = async (params) => {
        let { isConcatData, pageNumber } = params;
        if (!pageNumber) pageNumber = page;
        let URL = `contacts.json?companyId=171&countryId=226&page=${pageNumber}`;
        if (value && value.trim()) {
            URL = `${URL}&query=${value}`;
        }
        await BaseService.get(URL)
            .then((response) => {
                const contactsData = [];
                const { total, contacts: responseData } = response.data;
                setTotalRecord(total);
                const contactKeys = Object.keys(responseData);
                if (contactKeys && contactKeys.length) {
                    contactKeys.forEach(contactId => {
                        if (onlyEven) {
                            if (!(Number(contactId) % 2)) {
                                const contact = responseData[contactId];
                                contactsData.push(contact);
                            }
                        } else {
                            const contact = responseData[contactId];
                            contactsData.push(contact);
                        }
                    });

                    if (isConcatData) {
                        const updatedData = contacts.concat(contactsData);
                        setContacts(updatedData);
                    } else {
                        setContacts(contactsData);
                    }
                } else {
                    if (page === 1) {
                        setContacts([]);
                    }
                }
                setCallShouldHappenOnScroll(false);
            });
    }

    useEffect(() => {
        setPage(1);
        const getData = setTimeout(() => {
            getContactsData({ pageNumber: 1 });
        }, 1000)

        return () => clearTimeout(getData);
    }, [value])

    // useEffect(() => {
    //     setPage(1);
    //     getContactsData({ pageNumber: 1 });
    // }, [onlyEven]);

    const onScrollStop = (scrollValues) => {
        // const { clientHeight, scrollHeight, scrollYPossible, scrollTop } = scrollValues;
        // if (scrollYPossible && !callShouldHappenOnScroll) {
        //     const difference = scrollHeight - scrollTop - clientHeight;
        //     if (difference < 10 && (page * 20) < totalRecord) {
        //         setCallShouldHappenOnScroll(true);
        //         const updatedPage = page + 1;
        //         setPage(updatedPage);
        //         getContactsData({ isConcatData: true, pageNumber: updatedPage });
        //     }
        // }
        setCallShouldHappenOnScroll(true);
        const updatedPage = page + 1;
        setPage(updatedPage);
        getContactsData({ isConcatData: true, pageNumber: updatedPage });
    }

    const onContactDetailsClick = (contact) => {
        setSelectedContact(contact);
        setIsContactDetailsPopup(true);
    }

    const closeContactDetailsPopup = () => {
        setIsContactDetailsPopup(false);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl' backdrop="static">
                <Modal.Header>
                    <Modal.Title>All Contacts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CommonFilter filterContacts={value} setFilterContacts={setValue} />

                </Modal.Body>
                <Modal.Footer className='justify-content-between'>
                    <div>
                        <FormCheck label="Only Even" value={onlyEven} onChange={(event) => setOnlyEven(event.target.value)}>
                        </FormCheck>
                    </div>
                    <Link to="/" className="btn btn-secondary">Close</Link>
                </Modal.Footer>
            </Modal>
            {
                isContactDetailsPopup && <ContactDetailsPopup closeContactDetailsPopup={closeContactDetailsPopup} selectedContact={selectedContact} />
            }
        </>
    );
}

export default ModalA;