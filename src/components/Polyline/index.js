import React, { Component } from "react";
import PropTypes from "prop-types";
import toPoints from "../../functions/toPoints";

class Polyline extends Component {
  render() {
    let { bounds, coords, options, ptCorner, zoom, data } = this.props;
    ptCorner = ptCorner || toPoints(bounds[0], bounds[1], zoom);
    const points = [];
    for (let i = 0; i < coords.length; i++) {
      const ptScreen = toPoints(coords[i].lat, coords[i].lng, zoom);
      const point = {
        x: ptScreen.x - ptCorner.x,
        y: ptScreen.y - ptCorner.y,
      };
      points.push(point.x + "," + point.y);
    }

    return (
      <polygon
        points={points.join(" ")}
        {...options}
        onClick={() => this.props.openDrawer(data)}
      ></polygon>
    );
  }
}

Polyline.propTypes = {
  coords: PropTypes.array,
  ptCorner: PropTypes.object,
  bounds: PropTypes.array,
  zoom: PropTypes.number,
  options: PropTypes.object,
};

export default Polyline;
