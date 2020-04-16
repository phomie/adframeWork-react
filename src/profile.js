import React from "react";
import Axios from "./axios.js";
import Uploader from "./uploader.js";
import ProfilePic from "./profilePic.js";

export default class Profile extends React.Component {
    render() {
        const { firstname, lastname, profilePicture,Bioeditor } = this.props;
        return (
            <div className="theprofile">
                <div className="profilpic">
                {profilePicture}
                </div>
               <div className="bioArea">
                Some things about me:
                <h1>
                    My name is {firstname} {lastname}
                </h1>
                {Bioeditor}
            </div>
            <div className="xtraStuff"></div>
            </div>
        );
    }
}