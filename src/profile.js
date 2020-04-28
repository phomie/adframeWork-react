import React from "react";
import Axios from "./axios.js";
import Uploader from "./uploader.js";
import ProfilePic from "./profilePic.js";
import  {ReactBingmaps}  from 'react-bingmaps';



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


                <ReactBingmaps 
                      bingmapKey = "AnfpyjIc3D3adpvirDTH6jE6LMoAIM6SHolbNRziiwAqU7la_55nuAuRLWuKC6dm" 
                       center = {[]}
                       mapTypeId = {"birdseye"}
                       navigationBarMode = {"compact"}
                       boundary = {
                        {
                          "search":"Arabellastraße  München",
                          "option":{
                            entityType: 'PopulatedPlace'
                          },
                          "polygonStyle" :{
                            fillColor: 'rgba(161,224,255,0.4)',
                            strokeColor: '#a495b2',
                            strokeThickness: 2
                          }
                        }
                      }
                       >
                </ReactBingmaps>
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
