import React, { useState, useEffect,useRef,createRef } from "react";
import Axios from "./axios.js";
import ReactDOM  from "react-dom";

//ADblockerdetection
export  function Adblockerdetection() {
    const [firstname, setfirstname] = useState('');

    const [adblock, adblocdetected] = useState(false);

 Axios.get("/user").then((result) => {
       setfirstname(
       result.data.firstname
           );
         }); 

    useEffect(() => {
        return Adblockerdetection();
    },[]);
  
 
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
                        <h2>HELLO {firstname}</h2>
                        <p>it looks like you are using an Adblocker. <br/>Please disable
                        the adblocker for this page!</p>
                        <button
                            onClick={() => {
                                Adblockerdetection( window.location.reload(true));
                            }}
                        >
                          
                        try to proof of Adblocker
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


export default function Adinjection(props) {
    const { adtype, zoneid, id, name } = props;
        var therealURL =
        "http://marcpassenheim.net/AdServerTest/www/delivery/afr.php?";
    var theRandom = Math.floor(Math.random() * 1000000 + 1);
    var urlparam = {
        zoneid: zoneid,
        cb: theRandom,
    };
    var theURL = Object.keys(urlparam)
        .map((key) => key + "=" + urlparam[key])
        .join("&");
    //the adurl
    var construUrl = therealURL + theURL;
//------USEstat--------------------------------------------


//----------------------------------------

    const ads = {
        bigsky: {
            id: id,
            name: name,
            src: construUrl,
            width: "160" + "px",
            height: "600" + "px",
        },
        sky: {
            id: id,
            name: name,
            src: construUrl,
            width: "120" + "px",
            height: "600" + "px",
        },

        billboard: {
            id: id,
            name: name,
            src: construUrl,
            width: "800" + "px",
            height: "250" + "px",
        },
        bigbillboard: {
            id: id,
            name: name,
            src: construUrl,
            width: "970" + "px",
            height: "250" + "px",
        },
        mediumrectangle: {
            id: id,
            name: name,
            src: construUrl,
            width: "300" + "px",
            height: "250" + "px",
        },
        hpa: {
            id: id,
            name: name,
            src: construUrl,
            width: "300" + "px",
            height: "600" + "px",
        },
    };
    //Component where the ADTYPE prop is overgiven
    const currentAd = ads[adtype];

 //----------------HIDETheSpots-------------------------
const [visible, setAdSpotvisible] = useState(false);

 useEffect( () => {
  
      return setAdSpotvisible(true);
 }, []);

//setthecomponent to display:none when its not loaded
const divStyleNone = {
 display: "none !important",
 height:0+'px !important',
 width:0+'px !important'
};
const divstyleBlock = {
 display: "block",
 background: "yellow",
 height:'auto',
 width:'auto'
 
};



//const [iframe,stateiframe] =useState()
const msyRef = useRef(null);

const myRef = createRef(null);

useEffect(()=>{
   
   
    console.log('isiframe',myRef.current)
/*
    if(isiframe=== 'iframe'){
        console.log('allo')
        setAdSpotvisible(true)
    
    }else{

        setAdSpotvisible(false)
    }*/

 },[myRef]);

    return (
      
        <div>
             <div   >
      
               {visible ? (<div style={divstyleBlock}  >
                            <iframe
                                id={currentAd.id}
                                name={currentAd.name}
                                src={currentAd.src}
                                frameBorder="no"
                                scrolling="no"
                                width={currentAd.width}
                                height={currentAd.height}
                                allow="autoplay"
                                sandbox="allow-same-origin" 
                                ref={el => myRef.current = el }
                            />
                        </div>):( <div style={divStyleNone}> </div>)
              
              
              
               }
  </div>
     
        </div>
    
    );







    
}
