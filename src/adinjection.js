import React, { useState,useEffect} from 'react';

/*
const usehandleads =(initialstate)=>{
    
    
    const [adk, handleads ]=useState(initialstate);

    const handleads = ()=>{
        /*
        const adk= ;



handleads({...adk,
            [key]:
})



    }


}
*/


export default function Adinjection(props){
const{adtype}=props;

    const [adk, handleads ]=useState({ads:{

        bigsky:{
            id:"a05bf5da",
            name:"a05bf5da",
            src:"https://marcpassenheim.net/AdServerTest/www/delivery/afr.php?zoneid=1&amp;cb=799862", 
            width:'160'+'px',
            height:'600'+'px'
        
        },
        sky:{
            id:"a05bf5da",
            name:"a05bf5da",
            src:"https://marcpassenheim.net/AdServerTest/www/delivery/afr.php?zoneid=1&amp;cb=799862", 
            width:'120'+'px',
            height:'600'+'px'
        
        },

        billboard:{
        id:"a05bf5da",
            name:"a05bf5da",
            src:"https://marcpassenheim.net/AdServerTest/www/delivery/afr.php?zoneid=4&amp;cb=799862", 
            width:'800'+'px',
            height:'250'+'px'

     },
     bigbillboard:{
        id:"a05bf5da",
        name:"a05bf5da",
        src:"https://marcpassenheim.net/AdServerTest/www/delivery/afr.php?zoneid=8&amp;cb=799862", 
        width:'970'+'px',
        height:'250'+'px'
        
     },
     mediumrectangle:{
        id:"a05bf5da",
        name:"a05bf5da",
        src:"https://marcpassenheim.net/AdServerTest/www/delivery/afr.php?zoneid=5&amp;cb=799862", 
        width:'300'+'px',
        height:'250'+'px'
        
     },
     hpa:{
        id:"a05bf5da",
        name:"a05bf5da",
        src:"https://marcpassenheim.net/AdServerTest/www/delivery/afr.php?zoneid=9&amp;cb=799862", 
        width:'300'+'px',
        height:'600'+'px'
        
     }

    }


   });

//Component where the ADTYPE prop is overgiven   

const currentAd=adk.ads[adtype]

return(
  <div>
     
<iframe  id={currentAd.id} name={currentAd.name} src={currentAd.src} frameBorder="no" scrolling="no" width={currentAd.width} height={currentAd.height} allow="autoplay"/>
  


   
</div>

)

}




