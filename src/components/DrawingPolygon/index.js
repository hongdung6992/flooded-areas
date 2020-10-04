import React from "react";
import GoogleMapReact from "google-map-react";

export default function DrawingPolygon({ onDrawingPolygon }) {
  const handleGoogleMapApi = (google) => {
    const map = google.map;
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
      },
    });
    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, "polygoncomplete", (line) => {
      const coords = line
        .getPath()
        .getArray()
        .map((coordinate) => {
          return {
            lat: coordinate.lat(),
            lng: coordinate.lng(),
          };
        });
      onDrawingPolygon(coords);
    });
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_GOOGLE_KEY,
        libraries: ["drawing"],
      }}
      center={[16.066112, 108.207722]}
      zoom={12}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={handleGoogleMapApi.bind(this)}
    ></GoogleMapReact>
  );
}
