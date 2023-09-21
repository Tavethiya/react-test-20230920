import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import FormCheck from 'react-bootstrap/FormCheck';
import CommonFilter from './common-filter';
import ContactDataTable from './contact-data-table';
import { retrieveContacts } from "../actions/contacts";
import { connect } from "react-redux";

function ModalB(props) {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const [value, setValue] = useState("");
    const [totalRecord, setTotalRecord] = useState(1);
    const [page, setPage] = useState(1);
    const [onlyEven, setOnlyEven] = useState(false);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        props.retrieveContacts();
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
    return {
        contacts: state.contacts
    };
}

export default connect(mapStateToProps, { retrieveContacts })(ModalB);