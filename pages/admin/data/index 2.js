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

export default function Upload2() {
  const route = useRouter();
  const [refetch, setRefetch] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 43.653908,
    longitude: -79.384293,
    zoom: 16,
  });
  const [modalstat, setModalstat] = useState(false);
  let stat = {
    id: 1,
    meta_title: "",
    meta_description: "",
    street_map: "",
    project_name: "",
    slug: "",
    total_no_of_units: 0,
    price_starting_from: 0.0,
    price_to: 0.0,
    project_type: "Condo",
    description: "",
    project_address: "",
    postalcode: "",
    latitute: "",
    longitude: "",
    occupancy: "",
    feature_button_text: "",
    status: "",
    assignment_closure_type: "",
    video_url: "No Video",
    facts_about: "",
    deposit_structure: "",
    developer: "",
    city: {
      name: "Mississauga",
    },
  };
  const [predata, setPredata] = useState(stat);
  const [cities, setCities] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [uploadimage, setUploadimage] = useState(null);
  const [developerr, setDeveloperr] = useState({
    developer_name: "",
    details: "",
    website_link: "",
  });

  const handleChangeDeveloper = (e) => {
    const { id, value } = e.target;
    setDeveloperr((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleImagesChange = (e) => {
    setUploadimage(e.target.files[0]);
  };

  const handleSubmitDeveloper = (e) => {
    e.preventDefault();
    if (
      uploadimage &&
      developerr.developer_name != "" &&
      developerr.website_link != "" &&
      developerr.details != ""
    ) {
      let form_data = new FormData();
      form_data.append("image", uploadimage);
      form_data.append("developer_name", developerr.developer_name);
      form_data.append("details", developerr.details);
      form_data.append("website_link", developerr.website_link);
      let url = `${baseUrl}/api/pre-constructions-new/submit/developer/`;
      axios
        .post(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
          mode: "no-cors",
        })
        .then((res) => {
          console.log(res);
          setDevelopers(res.data.developers);
          setModalstat(false);
          setUploadimage(null);
          setDeveloperr({
            developer_name: "",
            details: "",
            website_link: "",
          });
          swal({
            text: "Developer Added Sucessfully",
            timer: 500,
            button: false,
          });
        })
        .catch((err) => console.log(err));
    } else {
      swal("Blank Fields", "No Images Selected or Blank Fields", "warning");
    }
  };

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
  };

  const handleChangeDev = (e) => {
    const { id, value } = e.target;
    let mydev = {
      name: value,
    };
    setPredata((prevState) => ({
      ...prevState,
      [id]: mydev,
    }));
  };

  const handleSubmit = (e) => {
    predata["latitute"] = viewport.latitude.toFixed(4);
    predata["longitude"] = viewport.longitude.toFixed(4);
    let isEmpty = false;
    let emptyyy = [];
    let myarr = Object.keys(predata);
    myarr.forEach((ele) => {
      if (predata[ele] === "") {
        isEmpty = true;
        emptyyy.push(ele);
      }
    });
    if (isEmpty) {
      swal("Blank Field", `${emptyyy[0]}  Is Empty`, "warning");
    } else {
      let urll = predata["street_map"];
      var src = urll.split("src=")[1].split(/[ >]/)[0];
      predata["street_map"] = src.substring(1, src.length - 1);
      e.target.innerText = "Uploading...";
      e.preventDefault();
      let payload = JSON.stringify(predata);
      var configg2 = {
        method: "POST",
        url: `${baseUrl}/api/pre-constructions/data/upload/`,
        data: payload,
        mode: "no-cors",
      };
      axios(configg2)
        .then((res) => {
          console.log(res);
          alert("Added Sucessfully");
          route.push("/admin");
        })
        .catch((err) => console.log(err));
      setTimeout(function () {
        e.target.innerText = "Add Pre Construction";
        setPredata(stat);
      }, 3000);
    }
  };

  useEffect(() => {
    if (!route.isReady) return;
    var configg2 = {
      method: "GET",
      url: `${baseUrl}/api/pre-constructions/getcity/devs/`,
      mode: "no-cors",
    };
    axios(configg2)
      .then((res) => {
        setDevelopers(res.data.developers);
        setCities(res.data.cities);
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
      {modalstat && (
        <div className="modal">
          <section className="modal-main rounded-3">
            <div className="p-3 py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">Add Developer</p>
                <button
                  className="btn bg-white btn-outline-danger p-1 py-0"
                  onClick={() => setModalstat(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#ff0000"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </div>
              <div className="py-3 mt-5">
                <label htmlFor="images" className="fw-bold mb-4">
                  Upload Logo <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  name="images"
                  id="images"
                  onChange={(e) => handleImagesChange(e)}
                />
              </div>
              <div className="py-2">
                <div className=" w-100">
                  <label htmlFor="occupancy" className="fw-bold mb-2">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="developer_name"
                    value={developerr.developer_name}
                    onChange={(e) => handleChangeDeveloper(e)}
                  />
                </div>
              </div>
              <div className="py-2">
                <div className=" w-100">
                  <label htmlFor="occupancy" className="fw-bold mb-2">
                    Website Link <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="website_link"
                    value={developerr.website_link}
                    onChange={(e) => handleChangeDeveloper(e)}
                  />
                </div>
              </div>
              <div className="py-2">
                <div className=" w-100">
                  <label htmlFor="occupancy" className="fw-bold mb-2">
                    Description <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="details"
                    value={developerr.details}
                    onChange={(e) => handleChangeDeveloper(e)}
                  />
                </div>
              </div>
              <button
                className="btn btn-success mt-5 d-flex justify-content-center w-100 btn-lg"
                onClick={(e) => handleSubmitDeveloper(e)}
              >
                Submit
              </button>
            </div>
          </section>
        </div>
      )}
      {predata && (
        <>
          <div className="bg-white">
            <div className="container-fluid px-minn">
              <div className="d-flex justify-content-between pt-5">
                <Link href="/admin/">
                  <a className="btn bg-white shadow">Go Back</a>
                </Link>
                <h4 className="fw-bold">Upload New Pre Construction</h4>
              </div>
            </div>
            <div className="container-fluid px-minn py-5 mydetaill">
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
                          <option value="">---</option>
                          <option value="Free">Free</option>
                          <option value="Not Available">Not Available</option>
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
                  <div className="w-100">
                    <label htmlFor="floatingSelect">
                      Select City <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="city"
                      onChange={(e) => handleChangeCity(e)}
                      aria-label="Floating label select example"
                    >
                      <option value="">---</option>
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
                    <label htmlFor="developer">
                      Developer <span className="text-danger">*</span>
                      <button
                        className="btn btn-sm btn-mine3 ms-3"
                        onClick={() => setModalstat(true)}
                      >
                        Add New Developer
                      </button>
                    </label>
                    <select
                      className="form-select"
                      id="developer"
                      aria-label="Floating label select example"
                      onChange={(e) => handleChangeDev(e)}
                    >
                      <option value="">---</option>
                      {developers &&
                        developers.map((developer) => (
                          <option key={developer.id} value={developer.name}>
                            {developer.name}
                          </option>
                        ))}
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
                  height: 300,
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
                  height: 300,
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
                  height: 300,
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
              <div className="row row-cols-2 py-5 px-3 bg-light rounded-mine">
                <div className="col-6">
                  <div className="w-100">
                    <p>
                      Meta Title Example<span className="text-danger">*</span>
                    </p>
                    <p>
                      XYZ Condos CITYNAME | Plans Price and Availability - Book
                      Now
                    </p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="w-100">
                    <p>
                      Meta Description Example
                      <span className="text-danger">*</span>
                    </p>
                    <p>
                      XYZ condos is a new upcoming condo development at CITYNAME
                      , ON Canada by DEVELOPERNAME which will be launched soon/
                      selling soon/ is selling. Get access to plans and pricing
                      now
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3 d-flex justify-content-center align-items-center pb-5 mb-5">
              <button
                className="btn btn-success btn-lg"
                onClick={(e) => handleSubmit(e)}
              >
                Add Pre Construction
              </button>
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
