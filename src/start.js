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
import Adinjection from "./adinjection.js";
import Siteconfig from "./siteconfig.js";
import CookieConsent, { Cookies } from "react-cookie-consent";


const store = createStore(
  
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

import {init} from './sockets.js';
init(store);

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

    const bigbillboard = React.useMemo(() => Math.random() < 0.5, []);



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
          <div className='Main'>
                   








 {/*--------------------------thewholeAdsContainer-------------------------*/}
 { bigbillboard ? (
                    <div className="billboard">
                        <Adinjection
                            adtype="billboard"
                            configobject={Siteconfig.start.billboard}
                            decisionmaker2={true}
                        />
                    </div>
) : (
                    <div className="bigbillboard">
                        <Adinjection
                            adtype="bigbillboard"
                            configobject={Siteconfig.start.bigbillboard}
                            decisionmaker1={true}
                        />
                    </div>
                    ) }
         

                {/* A JSX comment 
<div className="mediumReactangle"> <Adinjection adtype='mediumreactangle' /></div>
<div className="hpa"> <Adinjection adtype='hpa' /></div>
   */}

                <div className="left">
                    <div className="sky">
                        <Adinjection
                            adtype="sky"
                            configobject={Siteconfig.start.sky}
                        />
                    </div>
                </div>

                <div className="right">
                    <div className="bigsky">
                        <Adinjection
                            adtype="bigsky"
                            configobject={Siteconfig.start.bigsky}
                        />
                    </div>

                    {/*--------------------------thewholeAdsContainer-------------------------*/}
                </div>


                <HashRouter>
                <Route path="/" exact component={Registration} />
                <Route path="/Login" component={Login} />
                <Route path="/Reset" component={Resetpasswords} />
            </HashRouter>



              </div>
            <div className="footer">



            <CookieConsent
                    //debug={true}
                        location="bottom"
                           buttonText="Sure man!!"
                             cookieName="thegivenConsent"
                              style={{ background: "#2B373B" }}
                                  buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                                    expires={150}
                                        onAccept={() => {window.location.reload(true)}}
                                            enableDeclineButton
                                         


                                 >       
                                 This website uses cookies to enhance the user experience.{" "}
                                    <span style={{ fontSize: "10px" }}>
                        This bit of text is smaller :O
                        </span>
                        </CookieConsent>

                        </div>





        </div>
    );
}
