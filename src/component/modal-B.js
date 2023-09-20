import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function ModalB() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl'>
                <Modal.Header>
                    <Modal.Title>US Contacts</Modal.Title>
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
                    <Row>
                        <>
                            <Form.Label htmlFor="filter-contacts" className='remove-padding-left'>Filter Contacts</Form.Label>
                            <Form.Control
                                type="text"
                                id="filter-contacts"
                                name="filter-contacts"
                            />
                        </>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Link to="/" className="btn btn-secondary">Close</Link>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalB;