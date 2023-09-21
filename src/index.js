import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import "react-bootstrap/dist/react-bootstrap.min.js";
import { Provider } from 'react-redux';
import store from './store';

// reactDom.render(<App />, document.getElementById("root"));
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);