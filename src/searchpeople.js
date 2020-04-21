import React, { useState,useEffect} from "react";
import Axios from "./axios.js";
import {Link} from 'react-router-dom';

export default function Findthepeople() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() =>{

        let ignore = false;

        Axios.get('/api/users',{params:{search:query}}).then(result =>{
           console.log('result', result);
           if(!ignore){
            setUsers(result.data.users);
           }
        });

        return()=>{
            ignore=true;
        };

     }, [query]);
  
    return (
        <div className="findPeople">
            <h1> ⚚Find the people Search⚚ </h1>

            <input
                onChange={(e) => setQuery(e.target.value)}
                placeholder="searchForANewFriend"
                type="text"
                name="query"
            />
            <button></button>

            {users.length &&
                users.map((user) => (
                    <div key={user.id}>
                        <Link to={"/user/"+user.id}>
                        {" "}
                        <img src={user.profile_picture_url} alt=""/>
                        User:{user.firstname}
                        {user.lastname} 
                        

                     </Link>

                    </div>
                ))}
        </div>
    );
}
