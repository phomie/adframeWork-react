import React, { Component } from "react";
import axios from "./axios.js";
import {Link} from 'react-router-dom';

export default class registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            mail: "",
            password: "",
        };
    }
    updateField(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    submit() {
        axios
            .post("/register" ,
            {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                mail: this.state.mail,
                password: this.state.password

               
            })
            .then((response) => {
                console.log('the responseDATA',response.data)
                if(response.data.success) {
                    location.replace('/');
                } else {
                    this.setState({error: response.data.error});
                }
            });
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    onChange={(e) => this.updateField(e)}
                    name="firstname"
                    placeholder="first"
                />
                <input
                    type="text"
                    onChange={(e) => this.updateField(e)}
                    name="lastname"
                    placeholder="last"
                />
                <input
                    type="text"
                    onChange={(e) => this.updateField(e)}
                    name="mail"
                    placeholder="mail"
                />
                <input
                    type="text"
                    onChange={(e) => this.updateField(e)}
                    name="password"
                    placeholder="password"
                />
                <input
                    onClick={(e) => this.submit(e)}
                    type="submit"
                    value="register now "
                />
<div>IF you have an Account go to loggin -><Link to='/login'>here</Link></div>  

            </div>
        );
    }
}
