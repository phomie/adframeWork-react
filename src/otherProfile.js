import React from "react";
import Axios from "./axios.js";
import Friendbutton from "./friendbutton.js";
export default class Otherprofile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: false,
        };
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        console.log("this.props.match.params", this.props.match.params);
        Axios.get("/api/user/" + userId).then((response) => {
            // console.log('responsesdsdsdsdsd', response.data);

            if (response.data.success) {
                this.setState({ user: response.data.user });
            } else {
                this.setState({ error: "Cannot load anything" });
            }
        });
    }
    render() {
        const { error, user } = this.state;
        if (error || !user) {
            return <div> Error:{error}</div>;
        }

        if (!user.profile_picture_url) {
            return (
                <div className="otherProfil">
                    {" "}
                    there is a new boy in town. Hello{" "}
                    <span className="theuser">{user.firstname}</span> here are
                    your picture <img src={user.profile_picture_url} alt="😡" />
                    Some things about me:
                    <span className="otherprofilebiotext">{user.bio}</span>
                    <Friendbutton id={this.props.match.params.id} />
                </div>
            );
        }

        return (
            <div className="otherProfil">
                {" "}
                there is a new boy in town. Hello{" "}
                <span className="theuser">{user.firstname}</span> here are your
                picture <img src={user.profile_picture_url} />
                Some things about me:
                <span className="otherprofilebiotext">{user.bio}</span>
                <Friendbutton id={this.props.match.params.id} />
            </div>
        );
    }
}
