import React, { forwardRef, useImperativeHandle, useRef } from "react";
import GoogleMap from "../../../components/GoogleMap";

const Map = forwardRef(({ data, openDrawer }, ref) => {
  const defaultOptions = {
    strokeWidth: 1,
    stroke: "#FF5106",
    strokeOpacity: "0.8",
    fill: "#FF4234",
    fillOpacity: "0.3",
    onMouseEnter: (e) => {},
    onMouseLeave: (e) => {},
  };

  const mapRef = useRef();

  const coords = [];
  data.forEach((element) => {
    coords.push(element.coords);
  });

  useImperativeHandle(ref, () => ({
    zoomToCenter(area) {
      mapRef.current.zoomToCenter(area);
    },
  }));

  return (
    <GoogleMap
      coordinates={{ coords: coords, options: defaultOptions }}
      zoom={15}
      center={[16.066112, 108.207722]}
      openDrawer={openDrawer}
      data={data}
      ref={mapRef}
    />
  );
});

export default Map;
