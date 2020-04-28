import React from "react";
import Axios from "./axios.js";



export default class Locationselecta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            userId: "",
            location: "",
        };
    }
    updateField(e) {
        this.setState({
            location: e.target.value,
        });
    }
    submit() {
        Axios.post("/user/location", {
            userId: this.state.userId,
            location: this.state.bio,
        }).then((response) => {
            console.log("the responseDATA", response.data);
            if (response.data.success) {
                this.props.setuser(response.data.user);
                this.setState({ editMode: false });
            } else {
                this.setState({ error: response.data.error });
            }
        });
    }

    render() {
        const { userId, location } = this.props;
        if (this.state.editMode == false) {
            return (
                <div className="locations">
                 <span className="thebiocomment">
                  {location}
                    </span>
                    <span className="editbutton">
                    <button
                        onClick={(e) => this.setState({ editMode: true })}
                        value="edit"
                    >
                        
                        Fill in your Location
                    </button>
                    </span>

                </div>
            );
        } else {
            return (
                <div id="theLocOpener" className="theLocOpener">
                    <h2>Your Comment</h2>

                    <textarea onChange={(e) => this.updateField(e)}></textarea>
                    <input
                        onClick={(e) => this.submit(e)}
                        type="submit"
                        value="add your location"
                    />
                </div>
            );
        }
    }
}
