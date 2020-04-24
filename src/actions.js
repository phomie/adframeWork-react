import Axios from "./axios.js"
import { socket } from "./sockets.js";

export async function loadFriends(){
const response = await Axios.get('/api/friends')
console.log('response', response);

return {
    type:'LOAD_FRIENDS',
    friends:response.data.friends

}

}

export async function acceptRequest(id){
    
    const response = await Axios.get('/api/friend-request/accept/'+id)
    return {
        type:'acceptRequest',
        id
    
    }

}

export async function unfriend(id){
    const response = await Axios.get('/api/friend-request/unfriend/'+id)
    return {
        type:'UNFRIEND',
        id
    
    }

}

export async function chatMessages (messages){
    return{
        type:'RECEIVED_MESSAGES',
        messages

    }
}
export async function sendMessage(message){
    socket.emit('chatMessage',message)
return{
type:'SEND_MESSAGE',
message

}

}
