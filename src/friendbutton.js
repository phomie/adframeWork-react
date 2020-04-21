import React, { useState, useEffect } from 'react';
import Axios from './axios.js'

const STATUS_NO_REQUEST = 'no-request';
const STATUS_REQUEST_ACCEPTED = 'request-accepted';
const STATUS_REQUEST_MADE_BY_YOU = 'request-made-by-you';
const STATUS_REQUEST_MADE_TO_YOU = 'request-made-to-you';

export default function Friendbutton(props) {

    const [status, setstatus] = useState('');
    const { id } = props;



    useEffect(() => {
        const getCurrentStatus = async () => {
            const response = await Axios.get('/api/friend-request/' + id)
            setstatus(response.data.status)
        }
        getCurrentStatus();
    },
    []
    
    );

    const sendRequest = async (action) => {

        const response = await Axios.get('/api/friend-request/' + action + '/' + id)
        setstatus(response.data.status)

    }


    if (status === STATUS_NO_REQUEST) {

        return (<button onClick={e => sendRequest('make-request')}>Make friend request</button>);
    }

    if (status === STATUS_REQUEST_MADE_BY_YOU) {

        return (<button onClick={e =>sendRequest('cancel')}>cancel friend request</button>)
    }

    if (status === STATUS_REQUEST_MADE_TO_YOU) {

        return (<button onClick={e =>sendRequest('accept')}>Accept</button>)
    }

    if (status === STATUS_REQUEST_ACCEPTED) {

        return (<button onClick={e =>sendRequest('unfriend')}>Gohome Stupid</button>)
    }

    return (<button>Friendbutton</button>)

}