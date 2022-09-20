import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Head from "next/head";
import Image from "next/image";
import swal from "sweetalert";
import Link from "next/link";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useRouter } from "next/router";

import React, { useState, useRef, useCallback, useEffect } from "react";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidmlzaGFsZGhha2FsOTkiLCJhIjoiY2tocjN2bWh6MDZpZzJybGg0NXJtcm8waCJ9.TBbd_lsF-2Z9s_lqm754zg";

const Example = ({ viewport, setViewport, inputVal }) => {
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  return (
    <div style={{ height: "50vh" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        scrollZoom={false}
        dragRotate={false}
        dragPan={false}
        captureScroll={true}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
          inputValue={"" || inputVal}
        />
      </MapGL>
    </div>
  );
};

let baseUrl = "https://api.condomonk.ca";

export default function Upload() {
  const route = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      route.push("/admin/login");
    }
  }, []);
  const [refetch, setRefetch] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 43.653908,
    longitude: -79.384293,
    zoom: 16,
  });

  const [predata, setPredata] = useState(null);
  const [cities, setCities] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPredata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleChangeCity = (e) => {
    const { id, value } = e.target;
    let mycity = {
      name: value,
    };
    setPredata((prevState) => ({
      ...prevState,
      [id]: mycity,
    }));
    console.log(predata);
  };

  const handleSubmit = (e) => {
    e.target.innerText = "Updating...";
    e.preventDefault();
    predata["latitute"] = viewport.latitude.toFixed(4);
    predata["longitude"] = viewport.longitude.toFixed(4);
    let payload = JSON.stringify(predata);
    var configg2 = {
      method: "POST",
      url: `${baseUrl}/api/pre-constructions/data/update/`,
      data: payload,
      mode: "no-cors",
    };
    axios(configg2)
      .then(() => {
        setRefetch(!refetch);
        swal("Sucessfull", `Preconstruction Data Updated`, "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Error Updating", `Unable to update data`, "error");
      });
    setTimeout(function () {
      e.target.innerText = "Update Data Now";
    }, 3000);
  };

  useEffect(() => {
    if (!route.isReady) return;
    var configg2 = {
      method: "GET",
      url: `${baseUrl}/api/pre-constructions/getdata/${route.query.upload}/`,
      mode: "no-cors",
    };
    axios(configg2)
      .then((res) => {
        setPredata(res.data.house_detail);
        setCities(res.data.cities);
        setViewport({
          latitude: parseFloat(res.data.house_detail.latitute),
          longitude: parseFloat(res.data.house_detail.longitude),
          zoom: 16,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [refetch, route.isReady]);

  return (
    <>
      <Navbar />
      <Head>
        <title>Upload Pre Construction</title>
      </Head>
      {predata && (
        <>
          <div className="bg-white">
            <div className="container dtttt">
              <div className="d-flex justify-content-between pt-5">
                <Link href="/admin/">
                  <a className="btn bg-white shadow">Go Back</a>
                </Link>
                <button
                  className="btn btn-success btn-lg"
                  onClick={(e) => handleSubmit(e)}
                >
                  Update Data Now
                </button>
                <h4 className="fw-bold">
                  Update Data for : {predata.project_name}
                </h4>
              </div>
            </div>
            <div className="container pb-5 pt-2 mydetaill">
              <div className="row row-cols-2 bg-light py-5 px-3 rounded-mine">
                <div className="col-7">
                  <div className="row row-cols-2 gy-4">
                    <div className="col-6">
                      <div className=" w-100">
                        <label htmlFor="projectname">
                          Project Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="project_name"
                          value={predata.project_name}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="w-100">
                        <label htmlFor="floatingSelect2">
                          Select Type <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          id="project_type"
                          value={predata.project_type}
                          onChange={(e) => handleChange(e)}
                          aria-label="Floating label select example"
                        >
                          <option value="Condo">Condo</option>
                          <option value="Townhome">Townhome</option>
                          <option value="Detached">Detached</option>
                          <option value="Semi-Detached">Semi-Detached</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className=" w-100">
                        <label htmlFor="occupancy">
                          Slug <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="slug"
                          value={predata.slug}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className=" w-100">
                        <label htmlFor="units">
                          Feature Button Text{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="feature_button_text"
                          value={predata.feature_button_text}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="w-100">
                        <label htmlFor="projectaddress">
                          Project Address <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="project_address"
                          value={predata.project_address}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="w-100">
                        <label htmlFor="postalcode">
                          Postal Code <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="postalcode"
                          value={predata.postalcode}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className=" w-100">
                        <label htmlFor="pricefrom">
                          Price From <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          id="price_starting_from"
                          value={predata.price_starting_from}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className=" w-100">
                        <label htmlFor="priceto">
                          Price To <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          id="price_to"
                          value={predata.price_to}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className=" w-100">
                        <label htmlFor="developer">
                          Status <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          id="status"
                          value={predata.status}
                          onChange={(e) => handleChange(e)}
                          aria-label="Floating label select example"
                        >
                          <option value="">---</option>
                          <option value="Selling">Selling</option>
                          <option value="Upcoming">Upcoming</option>
                          <option value="Sold out">Sold out</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className=" w-100">
                        <label htmlFor="developer">
                          Assignment Clause
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          id="assignment_closure_type"
                          value={predata.assignment_closure_type}
                          onChange={(e) => handleChange(e)}
                          aria-label="Floating label select example"
                        >
                          <option value="Not Available">Not Available</option>
                          <option value="Free">Free</option>
                          <option value="Available With Fee">
                            Available With Fee
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <Example
                    viewport={viewport}
                    setViewport={setViewport}
                    inputVal={predata.project_address}
                  />
                  <div className="my-5"></div>
                  <div className="d-flex justify-content-between">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="floatinglatitude"
                        placeholder="Latitude"
                        value={viewport.latitude}
                      />
                      <label htmlFor="floatingPassword">Latitude</label>
                    </div>
                    <span className="mx-3"></span>
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="floatinglongitude"
                        placeholder="Longitude"
                        value={viewport.longitude}
                      />
                      <label htmlFor="floatingPassword">Longitude</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-5"></div>
              <div className="row bg-light px-3 py-5 rounded-mine gy-4">
                <div className="col-4">
                  <div className=" w-100">
                    <label htmlFor="occupancy">
                      Occupancy <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="occupancy"
                      value={predata.occupancy}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div className=" w-100">
                    <label htmlFor="units">
                      No of Units <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      id="total_no_of_units"
                      value={predata.total_no_of_units}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="col-4">
                  <div class="w-100">
                    <label for="floatingSelect">
                      Select City <span className="text-danger">*</span>
                    </label>
                    <select
                      class="form-select"
                      id="city"
                      value={predata.city.name}
                      onChange={(e) => handleChangeCity(e)}
                      aria-label="Floating label select example"
                    >
                      <option value={predata.city.name}>
                        {predata.city.name}
                      </option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-4">
                  <div className=" w-100">
                    <label for="developer">
                      Developer <span className="text-danger">*</span>
                    </label>
                    <select
                      class="form-select"
                      id="developer"
                      value={predata.developer.name}
                      aria-label="Floating label select example"
                    >
                      <option value={predata.developer.name}>
                        {predata.developer.name}
                      </option>
                    </select>
                  </div>
                </div>
                <div className="col-12">
                  <div className="w-100">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label mt-2"
                    >
                      Street Map Link <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="street_map"
                      rows="2"
                      value={predata.street_map}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <p className="fs-5 fw-bold mt-5">
                Enter Description about the Project
              </p>
              <Editor
                apiKey="vlst3njmwg1i2353hvmwo871hdw6pm0clfrt0h43bhbeojh1"
                plugins="wordcount"
                value={predata.description}
                onEditorChange={(newText) =>
                  setPredata((prevState) => ({
                    ...prevState,
                    ["description"]: newText,
                  }))
                }
                init={{
                  height: 600,
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:'Montserrat', sans-serif; font-size:1.1rem; letter-spacing: 0px;line-height:2.5rem; }",
                }}
              />
              <div className="py-5"></div>
              <p className="fs-5 fw-bold">Enter Deposite Structure</p>
              <Editor
                apiKey="vlst3njmwg1i2353hvmwo871hdw6pm0clfrt0h43bhbeojh1"
                plugins="wordcount"
                value={predata.deposit_structure}
                onEditorChange={(newText) =>
                  setPredata((prevState) => ({
                    ...prevState,
                    ["deposit_structure"]: newText,
                  }))
                }
                init={{
                  height: 600,
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:'Montserrat', sans-serif; font-size:1.1rem; letter-spacing: 0px;line-height:2.5rem; }",
                }}
              />
              <div className="py-5"></div>
              <p className="fs-5 fw-bold">Enter Facts / Amenities </p>
              <Editor
                apiKey="vlst3njmwg1i2353hvmwo871hdw6pm0clfrt0h43bhbeojh1"
                plugins="wordcount"
                value={predata.facts_about}
                onEditorChange={(newText) =>
                  setPredata((prevState) => ({
                    ...prevState,
                    ["facts_about"]: newText,
                  }))
                }
                init={{
                  height: 600,
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:'Montserrat', sans-serif; font-size:1.1rem; letter-spacing: 0px;line-height:2.5rem; }",
                }}
              />
              <div className="py-5"></div>
              <div className="row row-cols-2 py-5 px-3 bg-light rounded-mine">
                <div className="col-6">
                  <div className="w-100">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label mt-2"
                    >
                      Meta Title <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="meta_title"
                      rows="3"
                      value={predata.meta_title}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-6">
                  <div className="w-100">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label mt-2"
                    >
                      Meta Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="meta_description"
                      rows="3"
                      value={predata.meta_description}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center pb-5 mb-5">
                <button
                  className="btn btn-success btn-lg"
                  onClick={(e) => handleSubmit(e)}
                >
                  Update Data Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="py-5 my-5"></div>
      <div className="py-3"></div>
      <Image
        src="/line.png"
        alt="Line image"
        height="4"
        width="100"
        layout="responsive"
        className="img-fluid foot-up-img"
      />
      <Footer />
    </>
  );
}
