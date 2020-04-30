import React, { useState, useEffect } from "react";

export default function Adinjection(props) {
    const { adtype, zoneid ,id,name } = props;





    var therealURL =
        "https://marcpassenheim.net/AdServerTest/www/delivery/afr.php?";
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
    console.log("construUrl", construUrl);

    const [adk, handleads] = useState({
        ads: {
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
                id:id,
                name:name,
                src: construUrl,
                width: "300" + "px",
                height: "600" + "px",
            },
        },
    });

    //Component where the ADTYPE prop is overgiven

    const currentAd = adk.ads[adtype];

    return (

        
        <div>
            <iframe
                id={currentAd.id}
                name={currentAd.name}
                src={currentAd.src}
                frameBorder="no"
                scrolling="no"
                width={currentAd.width}
                height={currentAd.height}
                allow="autoplay"
            />
        </div>
    );
}
