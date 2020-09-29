import React from "react";
import GoogleMap from "../../../components/GoogleMap";

class Map extends React.Component {
  
  render() {
    const defaultOptions = {
      strokeWidth: 1,
      stroke: "#FF5106",
      strokeOpacity: "0.8",
      fill: "#FF4234",
      fillOpacity: "0.3",
      onMouseEnter: (e) => {},
      onMouseLeave: (e) => {},
    };
    const coords = [];
    this.props.data.forEach((element) => {
      coords.push(element.coords);
    });

    console.log(this.props);

    return (
      <GoogleMap
        coordinates={{ coords: coords, options: defaultOptions }}
        zoom={11}
        center={[24.886, -70.268]}
        openDrawer={this.props.openDrawer}
        data={this.props.data}
      />
    );
  }
}

export default Map;
