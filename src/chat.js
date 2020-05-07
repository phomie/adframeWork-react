import React ,{useState,useRef,useEffect}from 'react';
import {useSelector,useDispatch} from 'react-redux';
import{sendMessage} from './actions.js';
import Adinjection from "./adinjection.js";
import Siteconfig from "./siteconfig.js";

export default function Chat() {
const dispatch = useDispatch();
const messages = useSelector(state=>state.messages);
const [messageDraft,setMessageDraft]=useState('');
const referenceToMessagesDiv = useRef();


useEffect(()=>{
referenceToMessagesDiv.current.scrollTop= messages ? messages.length * 80 : 1000;
console.log('referenceToMessagesDiv', referenceToMessagesDiv);

},[messages]);




const handleClick = e =>{

    dispatch(sendMessage(messageDraft));
    setMessageDraft('');
}
const bigbillboard = React.useMemo(() => Math.random() < 0.5, []);
return (
    <div className="Chat">

{/*--------------------------thewholeAdsContainer-------------------------*/}
{ bigbillboard ? (
                    <div className="billboard">
                        <Adinjection
                            adtype="billboard"
                            configobject={Siteconfig.userfinder.billboard}
                            decisionmaker2={true}
                        />
                    </div>
) : (
                    <div className="bigbillboard">
                        <Adinjection
                            adtype="bigbillboard"
                            configobject={Siteconfig.userfinder.bigbillboard}
                            decisionmaker1={true}
                        />
                    </div>
                    ) }
              

                {/* A JSX comment 
<div className="mediumReactangle"> <Adinjection adtype='mediumreactangle' /></div>
<div className="hpa"> <Adinjection adtype='hpa' /></div>
   */}

                <div className="left">
                    <div className="sky">
                        <Adinjection
                            adtype="sky"
                            configobject={Siteconfig.userfinder.sky}
                        />
                    </div>
                </div>

                <div className="right">
                    <div className="bigsky">
                        <Adinjection
                            adtype="bigsky"
                            configobject={Siteconfig.userfinder.bigsky}
                        />
                    </div>

                    {/*--------------------------thewholeAdsContainer-------------------------*/}
                </div>

        <div className="Message" ref={referenceToMessagesDiv}>
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
            <div className='Messages' >{userImage}
             {firstname}{lastname} says: <span id="message_text">{message_text}</span>
                    
                
               
            </div>

        )
    }

}