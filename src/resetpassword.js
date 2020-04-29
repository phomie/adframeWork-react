import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Resetpasswords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            email: "",
            code: "",
            password: "",
            error: false,
        };
    }

    updateField(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    submit() {
        axios
            .post("/Reset", {
                email: this.state.email,
                
            })
            .then((response) => {
                
                if (response.data.success) {
                  
                    this.setState({ step: 2 });
                } else {
                    this.setState({ error: response.data.error });
                }
            });
    }

    submit2() {
        axios
            .post("/reset/verify", {
                code: this.state.code,
                email: this.state.email,
                password: this.state.password,
            })
            .then((response) => {
                if (response.data.success) {
                    this.setState({ step: 3 });
                } else {
                    this.setState({ error: response.data.error });
                }
            });
    }

    render() {
        return (
            <div className="Main">
            <div className="allforms">
                {this.state.step == 1 && (
                    <div>
                        <div className="regtext">
                        You want to reset your password? Who are you ? Please
                        insert you mail
                        </div>
                        <input
                            type="text"
                            onChange={(e) => this.updateField(e)}
                            name="email"
                            placeholder="email"
                        />

                      
                        <input
                            onClick={() => this.submit()}
                            type="submit"
                            value="Submit your Mail"
                        />
                    </div>
                )}

                {this.state.step == 2 && (
                    <div>
                        Fill in your Password Reset Code we send to a couple of
                        seconds ago?
                        <input
                            type="text"
                            onChange={(e) => this.updateField(e)}
                            name="code"
                            placeholder="code"
                        />
                        <input
                            type="text"
                            onChange={(e) => this.updateField(e)}
                            name="password"
                            placeholder="password"
                        />
                        <input
                            onClick={() => this.submit2()}
                            type="submit"
                            value="Submit your new passeword"
                        />
                    </div>
                )}

                {this.state.step == 3 && (
                    <div className="resetsucces">
                        Reset Password
                        <p> Success you updated your password</p>
                        <div>
                           To login click <Link to="/">here</Link>{" "}
                           
                        </div>
                    </div>
                )}
            </div>
            </div>
        );
    }
}
