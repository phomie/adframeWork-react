import React from "react";
import Axios from "./axios.js";
import ProfilePic from "./profilePic.js";
import Uploader from "./uploader.js";
import Bioeditor from "./bioeditor.js";
import Profile from "./profile.js";
import { Route, BrowserRouter } from 'react-router-dom';
import Otherprofile from './otherProfile.js';
import Findthepeople from './searchpeople.js';



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        Axios.get("/user").then((result) => {
            console.log("result", result);
            this.setState({
                user: result.data,

                uploaderVisible: false,
            });
        });
    }


    render() {
        if (!this.state.user) {
            return <div>Loading</div>;
        }
        const {
            firstname,
            lastname,
            profile_picture_url,
            uploaderVisible

        } = this.state.user;


        return (
            <div className="loggtin">
                <div className="navBarLoggt">
                    <div id="smallprofilepic">

                        <ProfilePic
                            firstname={firstname}
                            lastname={lastname}
                            profile_picture_url={profile_picture_url}
                            clickHandler={(e) =>
                                this.setState({ uploaderVisible: true })
                            }
                        />
                    </div>
                    <div id="welcometext">

                        Buenos Dias <span className="theuser">{firstname}</span>, you have entered the Zone of
                        pleasure! 🌊
                    </div>
                </div>
                <div className="mainLoggt">
              
                
                    <BrowserRouter>
                        <Route exact path="/user/:id" component={Otherprofile} />
                        <Route exact path="/userfinder" component={Findthepeople} />
                        <Route exact path="/" render={() =>
                            <Profile
                                firstname={firstname}
                                lastname={lastname}
                                profilePicture={
                                    <ProfilePic
                                        /* id={this.state.id}*/
                                        firstname={firstname}
                                        lastname={lastname}
                                        profile_picture_url={profile_picture_url}
                                        clickHandler={() => this.setState({ uploaderVisible: true })}
                                    />
                                }
                                Bioeditor={
                                    <Bioeditor
                                        bio={this.state.user.bio}
                                        setuser={(user) => this.setState({ user })}
                                    />
                                }
                            />


                        } />
                    </BrowserRouter>


                    {this.state.uploaderVisible && (
                        <Uploader
                            userchangeHandler={(user) =>
                                this.setState({ user, uploaderVisible: false })
                            }
                            clickCloseHandler={(e) =>
                                this.setState({ uploaderVisible: false })
                            }
                        />
                    )}
                </div>
                <div className="footer"></div>
            </div>
        );
    }
}
