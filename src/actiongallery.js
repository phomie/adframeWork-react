import React, { Component } from 'react';
import VideoPlayer from 'react-video-js-player';
import VidUploader from './viduploader.js';
import Axios from './axios.js'



 
export default class VideoApp extends React.Component {
    constructor(props) {
        super(props);
        this.player={}
        this.state = {

            video: {
                src: "/public/vids/GOPR6967.mp4",
               // src: 'https://ad-ipd.sxp.smartclip.net/select?type=vast4&ang_plrw=964&ang_plrh=542&fwd_adb=0&s=rtl_rtl/videos&tagver=1.0.1&fwd_comp=1&fwd_vpaid=1&ang_cntp=cp_rtli_fbpn&ang_ref=https%3A%2F%2Fwww.rtl.de&ang_ifa=e3901a2d-8ef9-74c9-8fb4-156093117902&ang_streamid=e3901a2d-8ef9-74c9-8fb4-156093117902&ang_conlen=196&sz=pre&fwd_device=desktop&fwd_touch=0&fwd_view=desktop&fwd_vpo=l&fwd_vpc=a&fwd_ipd_flash=0&fwd_html5=1&fwd_ipd_ac=1&fwd_dnt=0&fwd_dabu=0&fwd_relaunch=true&fwd_theme=rtl_fernsehen&fwd_j4=2&fwd_j5=5&fwd_i1=3&fwd_c1=1&fwd_c2=2&fwd_d7=2&fwd_c4=2&fwd_n1=4&fwd_n5=4&fwd_n7=4&fwd_g5=4&fwd_c3=1&fwd_d5=4&fwd_d9=4&fwd_c5=4&fwd_k1=1&fwd_k2=1&fwd_k3=1&fwd_k5=1&fwd_f1=1&fwd_f4=1&fwd_f7=1&fwd_z2=3&fwd_ct_b=1&fwd_ct_d=2&fwd_ct_f=1&fwd_ct_g=0&fwd_ct_h=5&fwd_ct_j=0&fwd_ct_l=0&fwd_ct_o=0&fwd_uhc=1&fwd_bj4=2&fwd_bj5=2:7:8:9:15:13:14:11:12:10&fwd_thc=4ab56ec5.5702d4638c58b&fwd_b3=2&fwd_d1=3&fwd_f2=1&fwd_z1=1&fwd_vcd=196&fwd_vcdc=0&fwd_sxvpcd=1&fwd_sxvpcc=1&fwd_sxvpcb=1&fwd_sxvpca=1&fwd_cf=short_form&fwd_dev=0&opt=out&rnd=6702598500773782',
                poster: "http://www.example.com/path/to/video_poster.jpg"

                
            },
            uploaderVisible: false,
        };
    }
    
//Video Darstellung
componentDidMount() {
    Axios.get("/videoupload").then((result) => {
        console.log("resultsadasdasd", result);
        this.setState({
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
        return (
            <div >
                <div className='videoPlayer'>
              {videos&&videos.map(video =>{ 
                    return(
               <div className='theonevidPly'>         
                <VideoPlayer
                    controls={true}
                    src={video.url}
                  //  poster={this.state.video.poster}
                    width="720"
                    height="420"
                    onReady={this.onPlayerReady.bind(this)}
                    onPlay={this.onVideoPlay.bind(this)}
                    onPause={this.onVideoPause.bind(this)}
                    onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
                    onSeeking={this.onVideoSeeking.bind(this)}
                    onSeeked={this.onVideoSeeked.bind(this)}
                    onEnd={this.onVideoEnd.bind(this)}
              /> 
              </div>
              )})}

<button onClick={() => this.setState({ uploaderVisible: true })}>Upload your video</button>
            </div>
           
           
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
