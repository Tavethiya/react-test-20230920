import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function CommonFilter(props) {
    return (

        <>
            <Row className="mb-1">
                <Col xs={3} className='d-flex'>
                    <Col>
                        <Link to="/a" className="btn btn-primary">All Contacts</Link>
                    </Col>
                    <Col>
                        <Link to="/b" className="btn btn-success">US Contacts</Link>
                    </Col>

                </Col>
            </Row>
            <Row>
                <Row className="mb-2">
                    <Col>
                        <Form.Label htmlFor="filter-contacts" className='remove-padding-left'>Filter Contacts</Form.Label>
                        <Form.Control
                            type="text"
                            id="filter-contacts"
                            name="filter-contacts"
                            value={props.filterContacts}
                            onChange={(event) => props.setFilterContacts(event.target.value)}
                        />
                    </Col>
                </Row>
            </Row>
        </>
    )
}

export default CommonFilter;