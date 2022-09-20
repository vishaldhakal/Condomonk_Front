import { useState, useRef } from "react";
import ReactMapGL, { Popup, NavigationControl, Marker } from "react-map-gl";
import nFormatter from "./nFormatter";
import Link from "next/link";

export default function Map(props) {
  const navControlStyle = {
    left: 10,
    top: 10,
  };
  const [viewport, setViewport] = useState({
    latitude: parseFloat(props.citydetail.centerLat),
    longitude: parseFloat(props.citydetail.centerLong),
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });
  const mapRef = useRef();
  const [selected, setSelected] = useState(null);

  return (
    <>
      <ReactMapGL
        {...viewport}
        width="100%"
        height={props.heightt}
        scrollZoom={false}
        dragRotate={false}
        mapboxApiAccessToken="pk.eyJ1IjoidmlzaGFsZGhha2FsOTkiLCJhIjoiY2tocjN2bWh6MDZpZzJybGg0NXJtcm8waCJ9.TBbd_lsF-2Z9s_lqm754zg"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(newViewport) => {
          setViewport({ ...newViewport });
        }}
        ref={mapRef}
        captureScroll={true}
      >
        <NavigationControl
          style={navControlStyle}
          captureScroll={true}
          capturePointerMove={true}
        />
        {props.datas.map((no, index) => (
          <Marker
            key={`crime-${index}`}
            /* latitude={parseFloat(no.latitute)}
          longitude={parseFloat(no.longitude)} */
            latitude={parseFloat(no.latitute)}
            longitude={parseFloat(no.longitude)}
            offsetLeft={-5}
            offsetTop={10}
          >
            <div>
              <div
                className="pin1 bg-white"
                onMouseOver={(e) => {
                  e.preventDefault();
                  setSelected(no);
                }}
              >
                {nFormatter(no.price_starting_from, 2)}
              </div>
            </div>
          </Marker>
        ))}
        {selected && (
          <Link href={`/${selected.city.name.toLowerCase()}/${selected.slug}/`}>
            <a className="mylinkk shadow-lg" target="_blank">
              <Popup
                key={`housee-${selected.id}`}
                latitude={parseFloat(selected.latitute)}
                longitude={parseFloat(selected.longitude)}
                anchor="bottom"
                closeButton={true}
                closeOnClick={false}
                onClose={() => {
                  setSelected(null);
                }}
                dynamicPosition={true}
                className="rounded-mine2"
                tipSize={10}
              >
                <div className="mycard">
                  {selected.images[0] && (
                    <img
                      src={
                        "https://api.condomonk.ca" +
                        selected.images[0].split(",")[0]
                      }
                      layout="responsive"
                      className="img-fluid rounded-mine image2"
                      alt="..."
                    />
                  )}
                  {!selected.images[0] && (
                    <img
                      src="/noimage.webp"
                      layout="responsive"
                      className="img-fluid rounded-mine image2 bg-danger"
                      alt="..."
                    />
                  )}
                  <div className="card-body">
                    <p className="card-title fs-mine">
                      {selected.project_name}
                    </p>
                    <p className="card-text">{selected.project_address}</p>
                  </div>
                </div>
              </Popup>
            </a>
          </Link>
        )}
      </ReactMapGL>
    </>
  );
}
