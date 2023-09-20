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

function ModalB() {
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
        getContactsData({ pageNumber: 1 });
    }, [onlyEven]);

    useEffect(() => {
        setPage(1);
        const getData = setTimeout(() => {
            getContactsData({ pageNumber: 1 });
        }, 1000)

        return () => clearTimeout(getData);
    }, [value]);

    const onScrollStop = (scrollValues) => {
        const { clientHeight, scrollHeight, scrollYPossible, scrollTop } = scrollValues;
        if (scrollYPossible && !callShouldHappenOnScroll) {
            const difference = scrollHeight - scrollTop - clientHeight;
            if (difference < 10 && (page * 20) < totalRecord) {
                setCallShouldHappenOnScroll(true);
                const updatedPage = page + 1;
                setPage(updatedPage);
                getContactsData({ isConcatData: true, pageNumber: updatedPage });
            }
        }
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
            <Modal show={show} onHide={handleClose} size='xl'>
                <Modal.Header>
                    <Modal.Title>US Contacts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CommonFilter filterContacts={value} setFilterContacts={setValue} />
                    <Row>
                        <Col>
                            <RSC id="RSC-Example" style={{ height: 250 }} onUpdate={onScrollStop}>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            contacts && contacts.length ? contacts.map((contact, index) => {
                                                return (<tr onClick={() => onContactDetailsClick(contact)} key={index}>
                                                    <td>{contact.first_name}</td>
                                                    <td>{contact.last_name}</td>
                                                    <td>{contact.email}</td>
                                                    <td>{contact.phone_number}</td>
                                                </tr>);
                                            }) : null
                                        }
                                    </tbody>
                                </Table>
                            </RSC>
                        </Col>
                    </Row>
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

export default ModalB;