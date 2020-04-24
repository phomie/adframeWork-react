export default function (state = {}, action) {


    if (action.type == 'LOAD_FRIENDS') {
        state = {

            ...state,
            friends: action.friends
        }

    }

    if (action.type == 'acceptRequest') {

        state = {
            ...state,
            friends: state.friends.map(friend => {
                if (friend.id == action.id) {
                    friend.accepted = true;
                    
                }
                return friend;
            })
        }
    }
    if (action.type == 'UNFRIEND') {

        state = {
            ...state,
            friends: state.friends.map(friend => {
                if (friend.id == action.id) {
                    friend.accepted = false;
                    
                }
                return friend;
            })
        }
    }



    if (action.type == 'RECEIVED_MESSAGES') {

            const existingMessages=state.messages || [];

        state = {
            ...state,
            messages: [...existingMessages,...action.messages]
               
            }
        }

        if (action.type == 'SEND_MESSAGE'){
            state = {
                ...state,
                chatMessages: action.chatMessages

        }
    }
    return state;
}