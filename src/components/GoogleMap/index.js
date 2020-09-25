import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import Svg from "../Svg";

const DEFAULT_HEIGHT = "100vh";

export default class GoogleMap extends Component {
  static propTypes = {
    coordinates: PropTypes.object,
    options: PropTypes.func,
    center: PropTypes.array,
    zoom: PropTypes.number,
    height: PropTypes.string,
    ref: PropTypes.string,
    id: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      bounds: [],
      zoom: props.zoom,
      center: props.center,
      coordinates: props.coordinates,
      height: props.height,
      googleApiLoaded: false,
    };
    this.mapRef = React.createRef();
  }

  render() {
    const height = this.state.height || DEFAULT_HEIGHT;
    return (
      <div style={{ height: height }} id={this.props.id} ref={this.mapRef}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }} // set if you need stats etc ...
          center={this.state.center}
          zoom={this.state.zoom}
          onChange={this.onBoundsChange}
          onGoogleApiLoaded={this.onGoogleApiLoaded.bind(this)}
          yesIWantToUseGoogleMapApiInternals
          options={this.props.options}
        >
          {this.drawSvg(this.mapRef.current)}
        </GoogleMapReact>
      </div>
    );
  }

  drawSvg = ref => {
    if (!this.state.googleApiLoaded || this.state.bounds.length === 0)
      return null;
    else
      return (
        <Svg
          lat={this.state.bounds[0]}
          lng={this.state.bounds[1]}
          coordinates={this.state.coordinates}
          bounds={this.state.bounds}
          zoom={this.state.zoom}
          height={ref ? ref.offsetHeight : 0}
          width={ref ? ref.offsetWidth : 0}
          openDrawer={this.props.openDrawer}
          data={this.state.data}
        />
      );
  }

  onBoundsChange = (e) => {
    this.setState({
      zoom: e.zoom,
      bounds: Object.values(...Object.values(e.bounds)),
      center: Object.values(e.center),
    });
  };

  onGoogleApiLoaded({ map, maps }) {
    this.setState({
      googleApiLoaded: true,
    });

    const bounds = new maps.LatLngBounds();

    function extendBounds(lat, lng) {
      const latLng = new maps.LatLng(lat, lng);
      bounds.extend(latLng);
    }
    function extendCoordsBounds(coords) {
      for (var i = 0; i < coords.length; i++) {
        if (
          coords[i].hasOwnProperty("lat") &&
          coords[i].hasOwnProperty("lng")
        ) {
          extendBounds(coords[i].lat, coords[i].lng);
        } else if (Array.isArray(coords[i])) {
          extendCoordsBounds(coords[i]);
        }
      }
    }

    extendCoordsBounds(this.state.coordinates.coords);

    map.fitBounds(bounds);
  }
}
