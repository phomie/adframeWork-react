import React from "react";
import Axios from "./axios.js";
import Uploader from "./uploader.js";
import ProfilePic from "./profilePic.js";



export default class Profile extends React.Component {
    render() {
        const { firstname, lastname, profilePicture,Bioeditor,Locationselecta } = this.props;
        return (
            <div className="theprofile">
                <div className="profilpic">
                {profilePicture}
                <span> I'm Living </span>
                


                </div>
                
               <div className="bioArea">
                Some things about me:
                <h1>My name is {firstname} {lastname}
                </h1>
                <div className="bioeditor">{Bioeditor}</div>
              
                <div className="themap">
                <div className="Locationslecta">{Locationselecta}</div>
                    <p>Here are a list of my best spots:</p> 


                <div className="thescondmap">
                </div>  
            </div>
            </div>
            <div className="xtraStuff">
            
            
            </div>
            </div>
        );
    }
}
