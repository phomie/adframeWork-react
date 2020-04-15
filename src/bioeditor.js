import React from "react";
import Axios from "./axios.js";
import ProfilePic from "./profilePic.js";
import Uploader from "./uploader.js";

export default class Bioeditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            userId: "",
            bio: ""
        };
    }
    updateField(e) {
        this.setState({
            bio: e.target.value,
        });
    }
    submit() {
        Axios
            .post("/user/bio", {
                userId: this.state.userId,
                bio: this.state.bio

            })
            .then((response) => {
                console.log("the responseDATA", response.data);
                if (response.data.success) {
                    this.props.setuser(response.data.user);
                    this.setState({ editMode: false })



                } else {
                    this.setState({ error: response.data.error });
                }
            });
    }


    render() {
        const {
            userId, bio

        } = this.props;
        if (this.state.editMode == false) {
            return (

                <div className="thebio">
                    <h1> Your Profile Stuff </h1>
                    {bio}
                    <button onClick={(e) =>
                        this.setState({ editMode: true })} value="edit"> Edit your bio</button>
                </div>

            );
        } else {

            return (<div id="theBioOpener" className="button">


                <h2>das sollte nach klick erscheinen</h2>

                <textarea onChange={(e) => this.updateField(e)}></textarea>
                <input
                    onClick={(e) => this.submit(e)}
                    type="submit"
                    value="add a Biotext "
                />
            </div>
            )
        }



    }

}



