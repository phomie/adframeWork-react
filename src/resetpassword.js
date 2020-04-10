import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
const cryptoRandomString = require("crypto-random-string");
const secretCode = cryptoRandomString({
    length: 6,
});


export default class Resetpasswords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        };
    }

    updateField(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    submit() {
        axios
            .post("/reset", {
                mail: this.state.mail
                
            })
            .then((response) => {
                console.log('theresponse.data ',response.data);
                if (response.data.success) {
                    location.replace("/");
                } else {
                    this.setState({ error: response.data.error });
                }
            });
    }

    generateCode() {
        axios
            .post("/reset", { 
              code:this.state.secretCode,
              mail: this.state.email, 
            
            
            })
            .then((result) => {
              console.log('result', result);

            
                

                //console.log('cryptoRandomString({length: 10, type: 'url-safe'});', cryptoRandomString({length: 10, type: 'url-safe'}););
            });
    }
    checkCode() {
        axios.post("/password/Reset/verify").then((result) => {});
    }

    render() {
        return (
            <div>
                {this.state.step == 1 && (
                    <div>
                        {" "}
                        You want to reset your password? Who are you ? Please
                        insert you mail
                        <input
                            type="text"
                            onChange={(e) => this.updateField(e)}
                            name="mail"
                            placeholder="mail"
                        />
                        <input
                            onClick={() => this.generateCode()}
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
                            name="mail"
                            placeholder="RESETCODE"
                        />
                        <input
                            type="text"
                            onChange={(e) => this.updateField(e)}
                            name="mail"
                            placeholder="NEWPASSWORD"
                        />
                        <input
                            onClick={() => this.checkCode()}
                            type="submit"
                            value="Submit your new passeword"
                        />
                    </div>
                )}

                {this.state.step == 3 && (
                    <div>
                        Reset Password
                        <p> Success</p>
                        <div>
                            IF you haven't an Account register yourself ->
                            <Link to="/">here</Link>{" "}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
