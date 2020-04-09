import React from 'react';
import ReactDOM from 'react-dom';
import Registration from './registration.js';

const showWElcome = (window.location.pathname =='/welcome')

if(showWElcome){
ReactDOM.render(
    <Welcome />,
    document.querySelector('main')
);
}else{
    ReactDOM.render(
        <Loggtin />,
        document.querySelector('main')
    )
}

function Loggtin(){
return (<div> Welcome mi Frind!</div>);

}



function Welcome() {
    return (
<div id='theparent'>
        <img src="" alt ="thelogo"></img>
        <Registration/>
        <div>Hello, World!</div>

</div>        
    );
}
