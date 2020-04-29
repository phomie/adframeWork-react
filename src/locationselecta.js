import React from "react";
import Axios from "./axios.js";
import ProfilePic from "./profilePic.js";
import Uploader from "./uploader.js";
import { ReactBingmaps } from "react-bingmaps";

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

    componentDidMount() {
        Axios.get("/user/location").then((result) => {


            this.setState({
                location: result.data.location,
            });
        });
    }

    submit() {
        Axios.post("/user/location", {
            location: this.state.location,
        }).then((response) => {
            console.log("response", response);

            if (response.data.success) {
                this.setState({ editMode: false });
            } else {
                this.setState({ error: response.data.error });
            }
        });
    }

    render() {
        const location = this.state.location;
        console.log("location", location);
        if (this.state.editMode == false) {
            return (
                <div className="locations">
                    <h3>Your homespot</h3>
                    <span className="thebiocomment">{location}</span>
                    Fill in your homespot:
                    <span className="editbutton">
                        <button
                            onClick={(e) => this.setState({ editMode: true })}
                            value="edit"
                        >
                            Fill in your Location
                        </button>
                    </span>
                    <div className="themap1">
                        <ReactBingmaps
                            bingmapKey="AnfpyjIc3D3adpvirDTH6jE6LMoAIM6SHolbNRziiwAqU7la_55nuAuRLWuKC6dm"

                            center={[5.954920, 80.554955]}
                            mapTypeId={"canvasLight"}
                            navigationBarMode={"Aerial"}
                            heading={180}


                            boundary={{
                                search: location,
                                option: {
                                    entityType: "PopulatedPlace",
                                },
                                polygonStyle: {
                                    fillColor: "rgba(161,224,255,0.4)",
                                    strokeColor: "#a495b2",
                                    strokeThickness: 2,
                                },
                            }}
                        ></ReactBingmaps>
                    </div>

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
