import React from 'react';
import axios from './axios.js';
import {Link} from 'react-router-dom';
export default class Login extends React.Component{
constructor(){
super();
this.state={
    email:'',
    password:'',
    error:false
    };
}

updateField(e) {
    this.setState({
        [e.target.name]: e.target.value,
    });
}
submit() {
    axios
        .post("/Login" ,
        { mail: this.state.mail,
          password: this.state.password

           
        })
        .then((response) => {
            console.log(response.data)
            if(response.data.success) {
                location.replace('/');
            } else {
                this.setState({error: response.data.error});
            }
        });
}
render(){
    return(
<div className="Main">
<div className="allforms">
    this is the Login area !
    {this.state.error && <div className='error'>{this.state.error}}</div>}
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
                    value="Login"
                />
                <div className="regtext">IF you haven't an Account register yourself Click-><Link to='/'>here</Link>  </div>
                <div className="regtext">IF you want reset your password Click-><Link to='/Reset'>here</Link>  </div>
</div>
</div>

    )




}










}