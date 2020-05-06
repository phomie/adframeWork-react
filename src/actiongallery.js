import React, { Component } from 'react';
import VideoPlayer from 'react-video-js-player';
import VidUploader from './viduploader.js';
import Axios from './axios.js'
import AdspotVideoplayer from './adspotvideo.js'


const sources = {
    sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
    bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
    bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
    test: 'http://media.w3.org/2010/05/video/movie_300.webm'
  };


 
export default class VideoApp extends React.Component {
    constructor(props) {
        super(props);
        this.player={}
        
        this.state = {
            adspot :'',
            video: {
                src:"/public/vids/GOPR6967.mp4",
               
                poster: "http://www.example.com/path/to/video_poster.jpg"

                
            },
            uploaderVisible: false,
        };
    }
    
//Video Darstellung
componentDidMount() {
    Axios.get("/videoupload").then((result) => {
      
        this.setState({
            adspot:sources.bunnyTrailer,
            videos: result.data.videos
          

        });
    });
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
        const videos = this.state.videos;
        const adspot = this.state.test
        console.log('adspot2', adspot);
        console.log('videos', videos);
        return (
            <div >
                <div className='videoPlayer'>
              {videos&&videos.map((video,index) =>{ 
                    return(
               <div className='theonevidPly'>         
               <AdspotVideoplayer
                    controls={true}
                    src={video.url}

                  //  poster={this.state.video.poster}
                    width="720"
                    height="420"
                    
              /> 
              </div>
              )})}


            </div>
           
            <button className="theVideoButton" onClick={() => this.setState({ uploaderVisible: true })}>Upload your video</button>      
{this.state.uploaderVisible && (
<VidUploader  

clickCloseHandler={(e) =>
    this.setState({ uploaderVisible: false })
}


/>
)}
         </div>
        );
    }
}
