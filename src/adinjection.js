import React, { useState, useEffect, useRef, createRef } from "react";
import Axios from "./axios.js";
import ReactDOM from "react-dom";
import { config } from "aws-sdk";
import CookieConsent,{Cookies} from "react-cookie-consent";













//ADblockerdetection
export function Adblockerdetection() {
    const [firstname, setfirstname] = useState("");

    const [adblock, adblocdetected] = useState(false);

    Axios.get("/user").then((result) => {
        setfirstname(result.data.firstname);
    });

    useEffect(() => {
        return Adblockerdetection();
    }, []);

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
                {adblock ? (
                    <div className="modal1">
                        <div id="adblock_message">
                            <h2>HELLO {firstname}</h2>
                            <p>
                                it looks like you are using an Adblocker. <br />
                                Please disable the adblocker for this page!
                            </p>
                            <button
                                onClick={() => {
                                    Adblockerdetection(
                                        window.location.reload(true)
                                    );
                                }}
                            >
                                try to proof of Adblocker
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default function Adinjection(props) {




//--------CookieConsent-------------------------------------------

var thecookie= Cookies.get('thegivenConsent');
console.log('thecookie', thecookie);


if ( thecookie) {
    console.log('awsome');
    //setAdSpotvisible(true);
}

//------------------------------------------------



    const { adtype,configobject, onAccept } = props;
    var therealURL ="http://marcpassenheim.net/AdServerTest/www/delivery/afr.php?";
    var theRandom = Math.floor(Math.random() * 1000000 + 1);
    var urlparam = {
        zoneid: configobject.zoneid,
        cb: theRandom
    };

    var theURL = Object.keys(urlparam)
        .map((key) => key + "=" + urlparam[key])
        .join("&");
   
    var construUrl = therealURL + theURL;



    //------The ZählPixel--------------------------------------------
    const head1 = document.getElementsByTagName("head")[0];
    var theRealscripturl ="http://marcpassenheim.net/AdServerTest/www/delivery/tjs.php";
    var urlparam = "?trackerid=3&amp;append=1&amp;r="
    var random = theRandom;
    //the adurl
    var ScriptconstruUrl = theRealscripturl + urlparam+random;
    

    const Pixelscript = document.createElement("script");
    Pixelscript.id = "Pixelscript";
    Pixelscript.type = "text/javascript";
    Pixelscript.src = ScriptconstruUrl;
    Pixelscript.onload = (console.log('Loading pixel '));
    Pixelscript.onerror =(console.log('loaded but not fired'));


 //head1.appendChild(Pixelscript).onload = (console.log('pixel fired'));

    //console.log('ScriptconstruUrl', ScriptconstruUrl);


    //----------------------------------------

    const ads = {
        bigsky: {
            src: construUrl
        },
        sky: {
            src: construUrl
        },

        billboard: {
            src: construUrl
        },
        bigbillboard: {
            src: construUrl,
        },
        mediumrectangle: {
            src: construUrl,
        },
        hpa: {
            src: construUrl,
        },
    };
   
    //----------------HIDETheSpots-------------------------
    const [visible, setAdSpotvisible] = useState(false);

    useEffect(() => {
        return setAdSpotvisible(false);
    }, []);

    //setthecomponent to display:none when its not loaded
    const divStyleNone = {
        display: "none !important",
        height: 0 + "px !important",
        width: 0 + "px !important",
    };
    const divstyleBlock = {
        display: "block",
        background: "yellow",
        height: "auto",
        width: "auto",
    };

    //const [iframe,stateiframe] =useState(false)
    const mySecREf = createRef(null)
    const myRef = createRef(null);

    useEffect(() => {
        if (thecookie) {
            console.log('awsome');
            setAdSpotvisible(true);
        }

        if(setAdSpotvisible(false)){

            head1a.appendChild(Pixelscript);

        }
       


        const isiframe = myRef.current;
       // const isPixel = mySecREf.current;
        //console.log('isPixel', isPixel);
        console.log('isiframe', isiframe);


        if(isiframe &&isiframe.tagName==='IFRAME'){
                      setAdSpotvisible(true);
        } 

    }, [myRef,mySecREf]);
       
    const currentAd = ads[adtype];
   // console.log('currentAd', currentAd);


    return (
        <div>
            {visible ? (
                <div style={divstyleBlock}>
                    <iframe
                        id={configobject.id}
                        name={configobject.name}
                        src={currentAd.src}
                        frameBorder="no"
                        scrolling="no"
                        width={configobject.width}
                        height={configobject.height}
                        allow="autoplay"
                        sandbox="allow-same-origin"
                        ref={(el) => (myRef.current = el)}
                        onLoad={
                            ((onload) => {
                                console.log("the frame is loaded ");
                                setAdSpotvisible(true); 
                            })
                        }
                        onError={
                            (  (onerror) => {
                                console.log("my fram is not  loaded ");
                                setAdSpotvisible(false);
                                head1a.appendChild(Pixelscript);
                                
                            })
                        }
                    />
                </div>
            ) : (
                <div style={divStyleNone}  ref={(el) => (mySecREf.current = el)} >
                
                    
                    
                     </div>
            )}



<Adblockerdetection/>
        </div>
    );
}
