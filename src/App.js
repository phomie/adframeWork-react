import React from "react";
import Axios from "./axios.js";
import ProfilePic from "./profilePic.js";
import Uploader from "./uploader.js";

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
            uploaderVisible,
        } = this.state.user;

        return (
            <div className="loggtin">
                <div className="navBarLoggt"></div>
                <div className="mainLoggt">
                    <div id="welcometext">
                        {" "}
                        Buenos Dias {firstname}, you have entered the Zone of
                        pleasure!
                    </div>
                    <ProfilePic
                        firstname={firstname}
                        lastname={lastname}
                        profile_picture_url={profile_picture_url}
                        clickHandler={(e) =>
                            this.setState({ uploaderVisible: true })
                        }
                    />
                    {this.state.uploaderVisible && (
                        <Uploader
                            userchangeHandler={(user) =>
                                this.setState({
                                    user,
                                })
                            }
                        />
                    )}
                </div>
                <div className="footer"></div>
            </div>
        );
    }
}
