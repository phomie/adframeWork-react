import React, { useState, useEffect } from "react";
import Axios from "./axios.js";

export default function Adblockerdetection() {
    const [user, userstat] = useState(null);

    const [adblock, adblocdetected] = useState(false);
    useEffect(() => {
        /*
   await Axios.get("/user").then((result) => {
        console.log("resultfirstname", result.data)
        userstat({
            user: result.data,
            firstname:result.data.firstname
        });
       
    });*/
        return Adblockerdetection();
    });

    function Adblockerdetection() {
        const head = document.getElementsByTagName("head")[0];

        const noadblock = () => {
            adblocdetected(false);
        };

        const adblocker = () => {
            adblocdetected(true);
        };

        const script = document.createElement("script");
        script.id = "adblock-detection";
        script.type = "text/javascript";
        script.src = "./public/gpt.js";
        script.onload = noadblock;
        script.onerror = adblocker;
        head.appendChild(script);

        //this.adblocdetected() = this.adblocdetected().bind(this);
    }

    return (
        <div>
           
            <div className="AdblockerMessage">
                {adblock ? (<div className="modal1">
                    <div id="adblock_message" >
                        <h2>HELLO {userstat.firstname}</h2>
                        <p>it looks like you are using an Adblocker. <br/>Please disable
                        the adblocker for this page!</p>
                        <button
                            onClick={(e) => {
                                Adblockerdetection(e);
                            }}
                        >
                          
                            Check for Adblocker again
                        </button>
                    </div>
                    </div>
                ) : (
                    null
                )}
           
            </div>
        </div>
    );
}
