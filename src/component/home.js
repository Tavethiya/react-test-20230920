import React from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container fluid>
            <Row>
                <Col lg="6" className="p-2">
                    <Link to="/a" className="btn btn-primary">Button A</Link>
                </Col>
                <Col lg="6" className="p-2">
                    <Link to="/b" className="btn btn-success">Button B</Link>
                </Col>
            </Row>
        </Container>

    );
}

export default Home