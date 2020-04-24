import * as io from 'socket.io-client';
import {chatMessages} from './actions.js';

export let socket;
export const init = (store) =>{
socket = io.connect();
socket.on('chatMessages', messages =>{
store.dispatch(chatMessages(messages))

});

socket.on('chatMessage',message=>{

    store.dispatch(chatMessages([message]))

})

}