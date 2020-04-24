import React ,{useState,useRef,useEffect}from 'react';
import {useSelector,useDispatch} from 'react-redux';
import{sendMessage} from './actions.js';

export default function Chat() {
const dispatch = useDispatch();
const messages = useSelector(state=>state.messages);
const [messageDraft,setMessageDraft]=useState('');
const referenceToMessagesDiv = useRef();
const handleClick = e =>{

    dispatch(sendMessage(messageDraft));
    setMessageDraft('');
}

return (
    <div className="Chat">
        <div className="Message">
            {messages && messages.map((message)=>(
                    <Message key={message.message_id}{...message}/>

            ))}
        </div>
        <div className=' Input'>
            <input type="text" value={messageDraft} onChange={(e)=>setMessageDraft(e.target.value)} onKeyDown={e=>e.key=='Enter' && handleButtonClick(e)}></input>
            <button onClick={handleClick}>sendyoAnswer</button>
        </div>
    </div>




);

    function Message(props) {
        const { firstname, lastname, profile_picture_url, message_text }=props;

        const userImage = profile_picture_url 
        ? <img src={profile_picture_url} /> 
        : <div className='placeholder'> 👹</div>;
        return (
            <div className='Messages'>{userImage}<div className='user'>{firstname}{lastname}
                {message_text}
            </div></div>

        )
    }

}