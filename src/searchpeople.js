import React, { useState,useEffect} from "react";
import Axios from "./axios.js";
import {Link} from 'react-router-dom';
import Adinjection from './adinjection.js';
export default function Findthepeople() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        let ignore = false;
        Axios.get('/api/users',{params:{search:query}}).then(result =>{
           
           if(!ignore){
            setUsers(result.data.users);
           }
        });

        return()=>{
            ignore=true;
        };

     }, [query]);
  


    return (
        <div className="themain">
    

<div className='mainLoggt'>
<div className="billboard"> <Adinjection adtype='billboard' /></div>
<div className="bigbillboard"> <Adinjection adtype='bigbillboard' /></div>

</div>
{/* A JSX comment 
<div className="mediumReactangle"> <Adinjection adtype='mediumreactangle' /></div>
<div className="hpa"> <Adinjection adtype='hpa' /></div>
   */} 
<div className="left">
<div className="sky"> <Adinjection adtype='sky' /></div>
</div>

<div className="right">
<div className="bigsky"> <Adinjection adtype='bigsky' /></div>
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
                    <div key={user.id} id="friendslist" className="animated  zoomInUp ">
            
                        <Link to={"/user/"+user.id}>
                        {" "}
                        <div className="overviewpicture" >
                        <img src={user.profile_picture_url} alt=""/>
                        </div>
                        <div className="overviewtext">
                        {user.firstname}
                        {user.lastname} 
                        </div>

                     </Link>

                    </div>
                    
                ))}
                <div className="mediumreactangle"> <Adinjection adtype='mediumrectangle' /></div>
        </div>
    </div>
    );
}
