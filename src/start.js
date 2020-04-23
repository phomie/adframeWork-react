import React from "react";
import ReactDOM from "react-dom";
import Registration from "./registration.js";
import Login from "./Login";
import { Route, HashRouter } from "react-router-dom";
import Resetpasswords from "./resetpassword.js";
import {Link} from 'react-router-dom';
import App from './App.js';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxPromise from "redux-promise";
import reducer from "./reducer.js";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);



const showWElcome = window.location.pathname == "/welcome";

let elementToRender;

if (showWElcome) {
    ReactDOM.render(elementToRender =<Welcome />, document.querySelector("main"))
  
    ;
} else {
    ReactDOM.render(elementToRender =<Provider store={store}><App /></Provider>,document.querySelector("main"))
    ;
}



function Welcome() {
    return (
        <div className="grid-container">
            <div className="navbar">
                <span>
                    <img
                        src="./public/pics/Logo.gif"
                        alt="thelogo"
                        className="logo"
                    />
                </span>
                <span className="theLogoText"> BOARDERLINES SURFTRAVELERS</span>
            </div>

            <HashRouter>
                <Route path="/" exact component={Registration} />
                <Route path="/Login" component={Login} />
                <Route path="/Reset" component={Resetpasswords} />
            </HashRouter>

            <div className="footer"></div>
        </div>
    );
}
