import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalA from "./component/modal-A";
import ModalB from "./component/modal-B";
import Home from "./component/home";
import './App.css'
import { connect } from "react-redux";
import { retrieveContacts } from './actions/contacts';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={< Home />}></Route>
                <Route exact path='/a' element={< ModalA />}></Route>
                <Route exact path='/b' element={< ModalB />}></Route>
            </Routes>
        </Router>

    )
}

export default connect(null, { retrieveContacts })(App);