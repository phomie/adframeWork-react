import React, { useState, useEffect, StrictMode } from "react";
import Axios from "./axios.js";
import { Link } from "react-router-dom";
import Adinjection from "./adinjection.js";
import Siteconfig from "./siteconfig.js";


export default function Findthepeople() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
 


    //console.log("AdConfig", AdConfig.site);
    //console.log("AdConfig", AdConfig.id);
    //console.log("AdConfig", AdConfig.name);

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
<React.StrictMode>
            <div className="mainLoggt">
                {/*--------------------------thewholeAdsContainer-------------------------*/}
               

                <div className="billboard" >
              
                    <Adinjection adtype="billboard" 
                       
                        configobject={Siteconfig.userfinder.billboard}
                    />
                  
                </div>
            
              
                <div className="bigbillboard" >
              
                    <Adinjection adtype="bigbillboard" 
                     configobject={Siteconfig.userfinder.bigbillboard}
                    />
                       
                </div>   
               
            </div>
        
            {/* A JSX comment 
<div className="mediumReactangle"> <Adinjection adtype='mediumreactangle' /></div>
<div className="hpa"> <Adinjection adtype='hpa' /></div>
   */}
      
            <div className="left">

                <div className="sky" >
               
                    <Adinjection adtype="sky" 
                     configobject={Siteconfig.userfinder.sky}
                     />
                        
                </div>
            </div>
        
          
            <div className="right">
                <div className="bigsky" >
         
                    <Adinjection adtype="bigsky" configobject={Siteconfig.userfinder.bigsky} />
                        
                </div>

               
                {/*--------------------------thewholeAdsContainer-------------------------*/}
            </div>
            
           

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
                    <Adinjection adtype="mediumrectangle" configobject={Siteconfig.userfinder.mediumrectangle}/>
         

                </div>
            </div>

            </React.StrictMode>

         


        </div>
      
    );
}
