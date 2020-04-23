import Axios from "./axios.js"

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