import React, { Component } from "react";
import Axios from "./axios.js";
import ProfilePic from "./profilePic.js";
import Uploader from "./uploader.js";
import Bioeditor from "./bioeditor.js";
import Profile from "./profile.js";
import { Route, BrowserRouter, Link } from 'react-router-dom';
import Otherprofile from './otherProfile.js';
import Findthepeople from './searchpeople.js';
import Friends from './friends.js'
import Chat from './chat.js'


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
                <BrowserRouter>

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
                        <div id="NavButton">
                            <Link className='seemember' to="/userfinder"> See all members</Link>
                            <Link className='yourprofile' to="/"> YourProfile</Link>

                            <Link className='yourfriends' to="/friends">Yourfriends</Link>
                            <Link className='yourfriends' to="/chat">Letshaveatalk</Link>
                        </div>
                    </div>
                    <div className="mainLoggt">



                        <Route exact path="/user/:id" component={Otherprofile} />
                        <Route exact path="/userfinder" component={Findthepeople} />
                        <Route exact path="/friends" component={Friends} />
                        <Route exact path="/chat" component={Chat} />
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
                </BrowserRouter>
                <div className="footer"></div>
            </div>
        );
    }
}
