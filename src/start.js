import React from "react";
import ReactDOM from "react-dom";
import Registration from "./registration.js";
import Login from "./Login";
import { Route, HashRouter } from "react-router-dom";
import Resetpasswords from "./resetpassword.js";
import {Link} from 'react-router-dom';

const showWElcome = window.location.pathname == "/welcome";

if (showWElcome) {
    ReactDOM.render(<Welcome />, document.querySelector("main")
  
    );
} else {
    ReactDOM.render(<Loggtin />,document.querySelector("main")
    );
}

function Loggtin() {
    return (
        <div>
            <div> Welcome mi Frind!</div>
            
        </div>
    );
}

function Welcome() {
    return (
        <div id="theparent">
            <img src="" alt="thelogo"></img>

            <HashRouter>
                <Route path="/" exact component={Registration} />
                <Route path="/Login" component={Login} />
                <Route path="/Reset" component={Resetpasswords} />
                
            </HashRouter>
        </div>
    );
}
