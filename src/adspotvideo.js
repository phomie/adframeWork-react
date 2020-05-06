import React, { Component } from 'react';
import VideoPlayer from 'react-video-js-player';
import VidUploader from './viduploader.js';
import Axios from './axios.js'


const sources = {
    sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
    bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
    bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
    test: 'http://media.w3.org/2010/05/video/movie_300.webm'
  };


 
export default class AdspotVideoplayer extends React.Component {
    constructor(props) {
        super(props);
        this.player={}
        
        this.state = {
           
        
            video: {
               
                src:sources.bunnyMovie,
               
                poster: "http://www.example.com/path/to/video_poster.jpg"

                
            },
            hasseenprerool: false,
        };
    }

    
    





 
    onPlayerReady(player){
        console.log("Player is ready: ", player);
            
            this.player = player;
        
    }
 
    onVideoPlay(duration){
        console.log("Video played at: ", duration);
      
        console.log('adspot', adspot);
    }
 
    onVideoPause(duration){
        console.log("Video paused at: ", duration);
    }
 
    onVideoTimeUpdate(duration){
        console.log("Time updated: ", duration);
    }
 
    onVideoSeeking(duration){
        console.log("Video seeking: ", duration);
    }
 
    onVideoSeeked(from, to){
        console.log(`Video seeked from ${from} to ${to}`);
    }
 
    onVideoEnd(){
        console.log("Video ended");
    }
 
    render() {
        const adspot = this.state.video.src;
       
     
       
        return (

            <div >
              
               
               <div className='theonevidPly'>       
                
                {this.state.hasseenprerool ?(
                <div className="Movie">
                <VideoPlayer
                    key='videoplayer'
                    controls={true}
                    src={this.props.src}
                  //  poster={this.state.video.poster}
                    width="720"
                    height="420"
                    autoplay='true'
                    
                /> </div>):( <div className="adspot"> <VideoPlayer
                    key='adplayer'
                    controls={true}
                    src={adspot}
                  //  poster={this.state.video.poster}
                    width="720"
                    height="420"
                    onEnd={     ()=>{   this.setState({
                        
                        hasseenprerool:true
                        
                        
                                    })
                                console.log('wir wollensehen')}
                            }
                /> </div>)
         
              }
              
              
              
              )}


            </div>
           
)}
         </div>
        );
    }
}
