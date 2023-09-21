import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ContactDetailsPopup from './contact-details-popup';
import RSC from "react-scrollbars-custom";
import Table from 'react-bootstrap/Table';

function ContactDataTable(props) {
    const [isContactDetailsPopup, setIsContactDetailsPopup] = useState(false);
    const [selectedContact, setSelectedContact] = useState({});

    const { contacts, totalRecord, callShouldHappenOnScroll, page } = props;
    const onScrollStop = (scrollValues) => {
        const { clientHeight, scrollHeight, scrollYPossible, scrollTop } = scrollValues;
        if (scrollYPossible && !callShouldHappenOnScroll) {
            const difference = scrollHeight - scrollTop - clientHeight;
            if (difference < 10 && (page * 20) < totalRecord) {
                props.onScrollStop(scrollValues);
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
            {
                isContactDetailsPopup && <ContactDetailsPopup closeContactDetailsPopup={closeContactDetailsPopup} selectedContact={selectedContact} />
            }
        </>
    )
}

export default ContactDataTable;