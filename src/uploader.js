import React from "react";
import Axios from "./axios.js";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
    }

    handleFileChange(e) {
        this.setState({
            file: e.target.files[0],
        });
    }
    upload() {
        const formData = new FormData();
        formData.append("file", this.state.file);

        Axios.post("/user/picture", formData).then((response) => {
            if (response.data.success) {
                this.props.userchangeHandler(response.data.user);
            }
        });
    }

    render() {
        return (
            <div id="Uploader">
                  <div id="myModal" className="modal1">
                <div className="modalwindow">
                
                    <div onClick={e=>this.props.clickCloseHandler()} className="close">
                    <div className="whitespot"></div>
                        <div className='theX'>x</div></div>
                    <input
                        type="file"
                        onChange={(e) => this.handleFileChange(e)}
                    />
                   
                    <button onClick={(e) => this.upload()} className="button">
                        Upload Your PRofiel Pic
                    </button>
                </div>
                </div>
            </div>
        );
    }
}
