import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import Svg from "../Svg";

const DEFAULT_HEIGHT = "100vh";

const GoogleMap = forwardRef((props, ref) => {
  const [bounds, setBounds] = useState([]);
  const [zoom, setZoom] = useState(props.zoom);
  const [center, setCenter] = useState(props.center);
  const [coordinates] = useState(props.coordinates);
  const [height] = useState(props.height);
  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);
  const [data] = useState(props.data);
  const [maps, setMaps] = useState({});
  const mapRef = useRef();

  const drawSvg = (ref) => {
    if (!googleApiLoaded || bounds.length === 0) return null;
    else
      return (
        <Svg
          lat={bounds[0]}
          lng={bounds[1]}
          coordinates={coordinates}
          bounds={bounds}
          zoom={zoom}
          height={ref ? ref.offsetHeight : 0}
          width={ref ? ref.offsetWidth : 0}
          openDrawer={props.openDrawer}
          data={data}
        />
      );
  };

  const onBoundsChange = (e) => {
    setZoom(e.zoom);
    setBounds(Object.values(...Object.values(e.bounds)));
    setCenter(Object.values(e.center));
  };

  const onGoogleApiLoaded = ({ map, maps }) => {
    setGoogleApiLoaded(true);
    setMaps(maps);
    const bounds = new maps.LatLngBounds();

    function extendBounds(lat, lng) {
      const latLng = new maps.LatLng(lat, lng);
      bounds.extend(latLng);
    }
    function extendCoordsBounds(coords, center) {
      if (center) {
        extendBounds(center[0], center[1]);
      } else {
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
    }
    extendCoordsBounds(coordinates.coords, center);

    map.fitBounds(bounds);
    map.setZoom(zoom);
  };

  useImperativeHandle(ref, () => ({
    zoomToCenter(area) {
      const bounds = new maps.LatLngBounds();
      area.coords.forEach((coordinate) => {
        const arr = Object.values(coordinate);
        bounds.extend(new maps.LatLng(arr[0], arr[1]));
      });
      setZoom(17);
      setCenter([bounds.getCenter().lat(), bounds.getCenter().lng()]);
    },
  }));

  return (
    <div
      style={{ height: height || DEFAULT_HEIGHT }}
      id={props.id}
      ref={mapRef}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }} // set if you need stats etc ...
        center={center}
        zoom={zoom}
        onChange={onBoundsChange}
        onGoogleApiLoaded={onGoogleApiLoaded.bind(this)}
        yesIWantToUseGoogleMapApiInternals
        options={props.options}
      >
        {drawSvg(mapRef.current)}
      </GoogleMapReact>
    </div>
  );
});

GoogleMap.propTypes = {
  coordinates: PropTypes.object,
  options: PropTypes.func,
  center: PropTypes.array,
  zoom: PropTypes.number,
  height: PropTypes.string,
  id: PropTypes.string,
};

export default GoogleMap;
