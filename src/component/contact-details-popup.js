import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function ContactDetailsPopup(props) {
    console.log(props);
    const { selectedContact } = props;
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        props.closeContactDetailsPopup();
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl'>
                <Modal.Header>
                    <Modal.Title>Contact Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-1">
                        <Col xs={3} className='d-flex'>
                            <Col>
                                <Form.Label htmlFor="filter-contacts" className='remove-padding-left'>First Name</Form.Label>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="filter-contacts" className='remove-padding-left'>{selectedContact.first_name}</Form.Label>
                            </Col>

                        </Col>
                        <Col xs={3} className='d-flex'>
                            <Col>
                                <Form.Label htmlFor="filter-contacts" className='remove-padding-left'>Last Name</Form.Label>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="filter-contacts" className='remove-padding-left'>{selectedContact.last_name}</Form.Label>
                            </Col>

                        </Col>
                    </Row>
                    <Row className="mb-1">
                        <Col xs={3} className='d-flex'>
                            <Col>
                                <Form.Label htmlFor="filter-contacts" className='remove-padding-left'>Email</Form.Label>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="filter-contacts" className='remove-padding-left'>{selectedContact.email}</Form.Label>
                            </Col>

                        </Col>
                        <Col xs={3} className='d-flex'>
                            <Col>
                                <Form.Label htmlFor="filter-contacts" className='remove-padding-left'>Phone Nnumber</Form.Label>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="filter-contacts" className='remove-padding-left'>{selectedContact.phone_number}</Form.Label>
                            </Col>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ContactDetailsPopup;