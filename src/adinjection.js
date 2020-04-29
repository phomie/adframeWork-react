import React from 'react';



export default function Adinjection(){

const sky={
    id:"a05bf5da",
    name:"a05bf5da",
    src:"https://marcpassenheim.net/AdServerTest/www/delivery/afr.php?zoneid=1&amp;cb=799862", 
    width:'160'+'px',
    height:'600'+'px'

}

function Iframe(props){

return (<iframe id={props.id} name={props.name} src={props.src} frameBorder="no" scrolling="no" width={props.width} height={props.height} allow="autoplay"></iframe>)
}

return(
  <div>
<Iframe id={sky.id} name={sky.name} src={sky.src} frameBorder="no" scrolling="no" width={sky.width} height={sky.height} allow="autoplay"/>
</div>

)

}




