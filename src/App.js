import React from "react";
import Axios from "./axios.js";


export default class App extends React.Component {
                   
                    constructor(props) {
                       super(props);
                       this.state = {
                        user:null

                       };
                   }

                   componentDidMount(){
                       
                    Axios.get('/user').then(result =>{
                    console.log('result', result);
                        this.setState({
                              user:result.data  
                        });        



                    })

                   }

                   render() {
                        if(!this.state.user){
                            return(<div>Loading</div>);

                        }   
                    const {firstname} =this.state.user;

                       return (
                           <div className="loggtin">
                               <div className="navBarLoggt"></div>
                               <div className="mainLoggt">
                                 <div id="welocmetext"> Buenos Dias {firstname}, you have entered the Zone of pleasure!</div>

                                   <button className="button">Button</button>
                               </div>
                               <div className="footer"></div>
                           </div>
                       );
                   }
               }