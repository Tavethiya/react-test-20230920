import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Table from 'react-bootstrap/Table';
import RSC from "react-scrollbars-custom";
import BaseService from '../services/base-service';

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

    const getContactsData = (params) => {
        //const { isConcatData } = params;
        let URL = `contacts.json?companyId=171&countryId=226&page=${page}`;
        if (value && value.trim()) {
            URL = `${URL}&query=${value}`;
        }
        BaseService.get(URL)
            .then((response) => {
                const contactsData = [];
                const { total, contacts } = response.data;
                setTotalRecord(total);
                const contactKeys = Object.keys(contacts);
                if (contactKeys && contactKeys.length) {
                    contactKeys.forEach(contactId => {
                        if (onlyEven) {
                            if (!(Number(contactId) % 2)) {
                                const contact = contacts[contactId];
                                contactsData.push(contact);
                            }
                        } else {
                            const contact = contacts[contactId];
                            contactsData.push(contact);
                        }
                    });

                    setContacts(contactsData);
                }
                setCallShouldHappenOnScroll(false);
            });
    }

    useEffect(() => {
        const getData = setTimeout(() => {
            getContactsData({});
        }, 1000)

        return () => clearTimeout(getData);
    }, [value])

    useEffect(() => {
        if (onlyEven) {
            getContactsData({});
        }
    }, [onlyEven]);

    const onScrollStop = (scrollValues) => {
        const { clientHeight, scrollHeight, scrollYPossible, scrollTop } = scrollValues;
        if (scrollYPossible && !callShouldHappenOnScroll) {
            const difference = scrollHeight - scrollTop - clientHeight;
            if (difference < 10) {
                setCallShouldHappenOnScroll(true);
                console.log(scrollValues);
            }
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl'>
                <Modal.Header>
                    <Modal.Title>All Contacts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="p-2">
                            <Link to="/a" className="btn btn-primary">All Contacts</Link>
                        </Col>
                        <Col className="p-2">
                            <Link to="/b" className="btn btn-success">US Contacts</Link>
                        </Col>
                        <Col className="p-2">
                            <Link to="/" className="btn btn-secondary">Close</Link>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <Form.Label htmlFor="filter-contacts" className='remove-padding-left'>Filter Contacts</Form.Label>
                            <Form.Control
                                type="text"
                                id="filter-contacts"
                                name="filter-contacts"
                                value={value}
                                onChange={(event) => setValue(event.target.value)}
                            />
                        </Col>
                    </Row>
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
                                                return (<tr>
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
            </Modal >
        </>
    );
}

export default ModalA;