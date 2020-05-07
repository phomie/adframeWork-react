import React from "react";
import Axios from "./axios.js";
import Uploader from "./uploader.js";
import ProfilePic from "./profilePic.js";
import Adinjection from "./adinjection.js";
import Siteconfig from "./siteconfig.js";


const bigbillboard = Math.random() < 0.5;

export default class Profile extends React.Component {

  
  render() {
   
    const { firstname, lastname, profilePicture, Bioeditor, Locationselecta } = this.props;
    return (
      <div>



 { bigbillboard ? (
                    <div className="billboard">
                        <Adinjection
                            adtype="billboard"
                            configobject={Siteconfig.profile.billboard}
                            decisionmaker2={true}
                        />
                    </div>
) : (
                    <div className="bigbillboard">
                        <Adinjection
                            adtype="bigbillboard"
                            configobject={Siteconfig.profile.bigbillboard}
                            decisionmaker1={true}
                        />
                    </div>
                    ) }
              

                
   

                <div className="left">
                    <div className="sky">
                        <Adinjection
                            adtype="sky"
                            configobject={Siteconfig.profile.sky}
                        />
                    </div>
                </div>

                <div className="right">
                    <div className="bigsky">
                        <Adinjection
                            adtype="bigsky"
                            configobject={Siteconfig.profile.bigsky}
                        />
                    </div>

                </div>





















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
      </div>
    );
  }
}
