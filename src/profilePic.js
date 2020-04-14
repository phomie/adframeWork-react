import React from "react";

export default class ProfilePic extends React.Component{
render(){
    const { firstname,lastname,profile_picture_url,clickHandler} =this.props


if(profile_picture_url){
    return(<div onClick={clickHandler} id="profilePic">
        <img src={profile_picture_url} alt={'ProfilePic for'+firstname}/>
        </div>
        
        )}else{
            return(<div onClick={clickHandler} id="profilePic" className="placeholder">
            🌝
            </div>
            )
        }

        return <div> Profile Picture For{firstname}</div>
    }       

}