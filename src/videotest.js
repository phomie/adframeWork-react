import React, { Component } from 'react';
import { Player,ControlBar } from 'video-react';
import { Button, Label, Input } from 'reactstrap';

const sources = {
    sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
    bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
    postroll: 'http://marcpassenheim.net/video/videos/alte%20Werbung%20kompletter%20Werbeblock%20ZDF%201988%20Mainzelm%C3%A4nnchen.mp4',
    preroll: 'https://marcpassenheim.net/video/videos/Atari%20Computer%20Werbung%201988.mp4',
    poster:'http://marcpassenheim.net/imgs/poster.png'
};



export default class AdspotVideoplayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            playerSource: sources.preroll,
            playerSource1: sources.postroll,
            hasseenprerool: false,
            hasseenmovie:false
        };
        this.seek = this.seek.bind(this);
    }

    seek(seconds) {
        return () => {
          this.player.seek(seconds);
        };
    }


    increment() {
        this.setState({
          count: this.state.count + 1
        });
      };
    
      reset() {
        this.setState({
          count: 0
        });
      };



    render() {
        return (
            <div>
              {/*  <h1>Current Count: {this.state.count}</h1>*/}


                <div className='theonevidPly'>

                    {this.state.hasseenprerool&&!this.state.hasseenmovie&&( 
                        <div className="Movie">
                        <Player
                            videoId="video-1"
                            key='videoplayer'
                            autoPlay={true}
                            onEnded={() => {
                                this.setState({ hasseenmovie: true })
                                console.log('Executed')
                            }}
                        >
                            <source src={this.props.src} />
                        </Player>
                    </div>
                    )}    


                  {!this.state.hasseenprerool&&!this.state.hasseenmovie&&(
                   <div className="Preroll">
                            <Player
                                videoId="video-2"
                                key='Adplayer'
                                poster={sources.poster}
                                onPlay={ (e) => {this.increment(e) }}
                                onEnded={() => {  this.setState({ hasseenprerool: true })
                                   
                                    console.log('Executed')
                                   
                                    }
                                }
                             
                            >
                                <source src={this.state.playerSource} />
                                <ControlBar autoHide={false} />
                            </Player>
                        </div>
                        )}


                    {this.state.hasseenmovie&&this.state.hasseenmovie&&(
                            <div className="adplayer2">
                            <Player
                                videoId="video-3"
                                key='Adplayer'
                                poster={sources.poster}
                                autoPlay={true}
                                onPlay={ (e) => {this.increment(e) }}
                                onEnded={() => {  this.setState({ hasseenprerool: true })
                                
                                    console.log('Executed')
                                   
                                    }
                                }
                            >
                                <source src={this.state.playerSource1} />
                                <ControlBar autoHide={false} />
                            </Player>
                        </div>
                    )}












                </div>

            </div>
        
        )}
}