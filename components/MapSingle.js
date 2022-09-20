import { useState } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";

export default function Map(props) {
  const navControlStyle = {
    left: 10,
    top: 10,
  };

  const [viewport, setViewport] = useState({
    latitude: parseFloat(props.latitudeval) || 27.666997,
    longitude: parseFloat(props.longitudeval) || 85.290863,
    zoom: 13,
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height={props.heightt}
      scrollZoom={false}
      dragRotate={false}
      mapboxApiAccessToken="pk.eyJ1IjoidmlzaGFsZGhha2FsOTkiLCJhIjoiY2tocjN2bWh6MDZpZzJybGg0NXJtcm8waCJ9.TBbd_lsF-2Z9s_lqm754zg"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(viewport) => setViewport(viewport)}
      captureScroll={true}
    >
      <NavigationControl
        style={navControlStyle}
        captureScroll={true}
        capturePointerMove={true}
      />
      <Marker
        latitude={parseFloat(props.latitudeval) || 27.666997}
        longitude={parseFloat(props.longitudeval) || 85.290863}
        offsetLeft={-20}
        offsetTop={-45}
      >
        <div className="pin2 shadow-lg bg-white">{props.name}</div>
        {/* <Image
          src="/icons/map-marker.svg"
          alt="home icon"
          className="img-fluid"
          width="40"
          height="40"
          layout="fixed"
        /> */}
      </Marker>
    </ReactMapGL>
  );
}
