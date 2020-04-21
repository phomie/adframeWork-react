import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '20%',
  height: '25%',
  padding:'13px'
};

export class MapContainer extends Component {
   
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: -1.2884,
         lng: 36.8233
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB23zVt6UriMy6hk2wOqbPf339BYpS2FHU'
})(MapContainer);