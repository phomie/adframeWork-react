import React from 'react';
import Axios from './axios.js'
export default class Otherprofile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: false
           
        }
    }

    componentDidMount() {

        const userId = this.props.match.params.id;
        console.log('this.props.match.params', this.props.match.params);
        Axios.get('/api/user/' + userId).then(response => {
           // console.log('responsesdsdsdsdsd', response.data);

            if (response.data.success) {

                this.setState({ user: response.data.user })
            } else {

                this.setState({ error: "Cannot load anything" })
                this.setState({ })
            }
        })
    }
    render() {

        const { error, user } = this.state;
        if (error || !user) {
            return (<div> Error:{error}</div>)
        }

        if(!user.profile_picture_url){
            return (<div> Error:{error}</div> )

        }


        return (<div className="otherProfil"> there is a new boy in town. Hello {user.firstname} here are the picture <img src={user.profile_picture_url }/></div>)
        
    }
}