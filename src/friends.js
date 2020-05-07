import React, { useEffect } from "react";
import { loadFriends,unfriend,acceptRequest } from "./actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Adinjection from "./adinjection.js";
import Siteconfig from "./siteconfig.js";



export default function Friends(props) {
    const dispatch = useDispatch();
    const friends = useSelector((state) => {
        if (state.friends) {
            return state.friends.filter((friend) => friend.accepted == true);
        }
    });
    console.log("friends are ", friends);

    const outstanding = useSelector((state) => {
        const dispatch = useDispatch();
        if (state.friends) {
            return state.friends.filter((friend) => friend.accepted == false);
        }
    });

    console.log("outstanding are ", outstanding);

    useEffect(() => {
        dispatch(loadFriends());
        console.log("ayoyaoyoaoyoayo");
    }, []);
    const bigbillboard = React.useMemo(() => Math.random() < 0.5, []);
    
    return (

        

        <div className="friends">

            

{/*--------------------------thewholeAdsContainer-------------------------*/}
{ bigbillboard ? ( <div className="billboard">
                        <Adinjection
                            adtype="billboard"
                            configobject={Siteconfig.friends.billboard}
                            decisionmaker2={true}
                        />
                    </div>
) : (
                    <div className="bigbillboard">
                        <Adinjection
                            adtype="bigbillboard"
                            configobject={Siteconfig.friends.bigbillboard}
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
                            configobject={Siteconfig.friends.sky}
                        />
                    </div>
                </div>

                <div className="right">
                    <div className="bigsky">
                        <Adinjection
                            adtype="bigsky"
                            configobject={Siteconfig.friends.bigsky}
                        />
                    </div>

                    {/*--------------------------thewholeAdsContainer-------------------------*/}
                </div>










            <h1>these are the priviliges</h1>
            {!friends ||
                (!friends.length && (
                    <div>
                    
                        You dont Have any confirmed friends on this website
                    </div>
                ))}

            <div id='friendsoverview'>These Are your confirmed: </div>
            {friends &&
                friends.map((friend) => <Friend key={friend.id} {...friend} />)}
            <div id="theout">These Are your requested: </div>
            {outstanding &&
                outstanding.map((friend) => (
                    <Outstanding key={friend.id} {...friend} />
                ))}
        </div>
    );
    function Friend(props) {
        const dispatch = useDispatch(props);
        const { id, firstname, lastname, profile_picture_url } = props;
        return (
            <div className="friend">
                <img src={profile_picture_url} />
                <div className="">
                    {firstname}<br/>
                    {lastname}
                </div>
                <Link to={"/user/" + id}>See the profile</Link>
                <button onClick={e=>dispatch(unfriend(id))}>Unfriend</button>
            </div>
        );
    }
    function Outstanding(props) {
        const dispatch = useDispatch(props);
        const { id, firstname, lastname, profile_picture_url } = props;
        return (
            <div className="Outstanding">
                <img src={profile_picture_url} />
                <div className="">
                    {firstname}<br/>
                    {lastname}
                </div>
                <Link to={"/user/" + id}>See the profile</Link>
                <button onClick={e=>dispatch(acceptRequest(id))}>accept</button>
            </div>
        );
    }



}
