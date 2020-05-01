import React, { useState, useEffect } from "react";
import Axios from "./axios.js";
import { Link } from "react-router-dom";
import Adinjection from "./adinjection.js";
import siteconfig from "./siteconfig.js";
import Adblockerdetection from './adblockerdetection.js';





export default function Findthepeople() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const AdConfig = {
        site: "searchpeople",
        id: siteconfig.searchpeople.id,
        name: siteconfig.searchpeople.name,
    };
//----------------HIDETheSpots-------------------------
    const [visible, setAdSpotvisible] = useState(false);

    useEffect( () => {
        console.log("componentDidMount");
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
//------------------------------------------------------

    console.log("AdConfig", AdConfig.site);
    console.log("AdConfig", AdConfig.id);
    console.log("AdConfig", AdConfig.name);

    useEffect(() => {
        let ignore = false;
        Axios.get("/api/users", { params: { search: query } }).then(
            (result) => {
                if (!ignore) {
                    setUsers(result.data.users);
                }
            }
        );

        return () => {
            ignore = true;
        };
    }, [query]);

    return (
        <div className="themain">
            <Adblockerdetection />

            <div className="mainLoggt">
                {/*--------------------------thewholeAdsContainer-------------------------*/}
                {visible ? (
                    <div className="billboard" style={divstyleBlock}>
                        <Adinjection
                            adtype="billboard"
                            zoneid="4"
                            id={AdConfig.id}
                            name={AdConfig.name}
                        />
                    </div>
                ) : (
                    <div className="billboard" style={divStyleNone}></div>
                )}
                {visible ? (
                    <div className="bigbillboard" style={divstyleBlock}>
                        <Adinjection adtype="bigbillboard" zoneid="8" />
                    </div>
                ) : (
                    <div className="bigbillboard" style={divStyleNone}></div>
                )}
            </div>
            {/* A JSX comment 
<div className="mediumReactangle"> <Adinjection adtype='mediumreactangle' /></div>
<div className="hpa"> <Adinjection adtype='hpa' /></div>
   */}
            <div className="left">
                {visible ? (
                    <div className="sky" style={divstyleBlock}>
                        <Adinjection adtype="sky" zoneid="1" />
                    </div>
                ) : (
                    <div className="sky" style={divStyleNone}></div>
                )}
            </div>

            <div className="right">
                {visible ? (
                    <div className="bigsky" style={divstyleBlock}>
                        {" "}
                        <Adinjection adtype="bigsky" zoneid="1" />
                    </div>
                ) : (
                    <div className="bigsky" style={divStyleNone}></div>
                )}
            </div>
            {/*--------------------------thewholeAdsContainer-------------------------*/}
           
           
           
           
            <div className="findPeople">
                <h1> ⚚Find the people Search⚚ </h1>

                <input
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="searchForANewFriend"
                    type="text"
                    name="query"
                />

                {users.length &&
                    users.map((user) => (
                        <div key={user.id} id="friendslist" className="">
                            <Link to={"/user/" + user.id}>
                                {" "}
                                <div className="overviewpicture">
                                    <img
                                        src={user.profile_picture_url}
                                        alt=""
                                    />
                                </div>
                                <div className="overviewtext">
                                    {user.firstname}
                                    {user.lastname}
                                </div>
                            </Link>
                        </div>
                    ))}
                <div className="mediumreactangle">
                    {" "}
                    <Adinjection adtype="mediumrectangle" />
                </div>
            </div>
        </div>
    );
}
