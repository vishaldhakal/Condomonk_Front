import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import swal from "sweetalert";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

import React, { useState, useEffect } from "react";

let baseUrl = "https://api.condomonk.ca";

export default function Upload() {
  const route = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      route.push("/admin/login");
    }
  }, []);

  const [choosed, setChoosed] = useState([]);
  const [preconstinfo, setPreconstinfo] = useState(null);

  const [choices, setChoices] = useState([]);
  const [uploadimages, setUploadImages] = useState([]);
  const [images, setImages] = useState([]);
  const [plans, setPlans] = useState([]);
  const [preid, setPreid] = useState(0);
  const [refetch, setRefetch] = useState(false);
  const [refetchplans, setRefetchPlans] = useState(false);
  const [modalimages, setModalImages] = useState(false);

  const [modalplans, setModalPlans] = useState(false);
  const [uploadplans, setUploadPlans] = useState([]);
  const [uploadplantypes, setUploadPlanTypes] = useState("1 BED");
  const [uploadplanprice, setUploadPlanPrice] = useState(0);

  const [floorp, setFloorp] = useState({
    item: null,
    index: 0,
  });

  function ifexists(item, choice) {
    if (item.type_of_plan.choice == choice.choice) {
      return true;
    }
    return false;
  }

  const handleImagesChange = (e) => {
    setUploadImages(e.target.files);
  };

  const handlePlansChange = (e) => {
    setUploadPlans(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!uploadimages.length == 0) {
      let form_data = new FormData();
      for (let i = 0; i < uploadimages.length; i++) {
        form_data.append("images", uploadimages[i]);
      }
      let url = `${baseUrl}/api/pre-constructions/upload/images/${route.query.upload}/`;
      axios
        .post(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
          mode: "no-cors",
        })
        .then(() => {
          setRefetch(!refetch);
          setModalImages(false);
          setUploadImages(false);
        })
        .catch((err) => console.log(err));
    } else {
      alert("No Images Selected");
      setModalImages(false);
    }
  };

  const handleSubmitPlans = (e) => {
    e.preventDefault();
    if (!uploadplans.length == 0) {
      let form_data = new FormData();
      for (let i = 0; i < uploadplans.length; i++) {
        form_data.append("images", uploadplans[i]);
      }
      form_data.append("typee", uploadplantypes);
      form_data.append("starting", uploadplanprice);
      let url = `${baseUrl}/api/pre-constructions/upload/plans/${preid}/`;
      axios
        .post(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
          mode: "no-cors",
        })
        .then(() => {
          setRefetchPlans(!refetchplans);
          setModalPlans(false);
          setUploadPlans(false);
          setUploadPlanTypes("1 BED");
          setUploadPlanPrice(0);
        })
        .catch((err) => console.log(err));
    } else {
      alert("No Floor Plans Selected");
      setModalPlans(false);
    }
  };

  function handleimageChange(e, ite, inde) {
    let newImg = {
      id: ite.id,
      images: ite.images,
      imagealt: e.target.value,
      preconst: ite.preconst,
    };
    const newImgs = [...images];
    newImgs[inde] = newImg;
    setImages(newImgs);
  }

  function handleplandataChange(e, ite, inde) {
    let newPlan;
    if (e.target.type == "checkbox") {
      newPlan = {
        ...ite,
        [e.target.id]: e.target.checked,
      };
    } else {
      newPlan = {
        ...ite,
        [e.target.id]: e.target.value,
      };
    }
    const newPlans = [...plans];
    newPlans[inde] = newPlan;
    setFloorp({ ...floorp, item: newPlan });
    setPlans(newPlans);
  }

  function handleplantypeChange(e, ite, inde) {
    let hahaha = {};
    let check = 0;
    choosed.forEach((elem) => {
      if (e.target.value == elem.choice) {
        hahaha = elem;
        check = 1;
      }
    });
    if (check == 0) {
      choices.forEach((elem) => {
        if (e.target.value == elem.choice) {
          hahaha = elem;
        }
      });
    }
    let newPlan = {
      ...ite,
      [e.target.id]: hahaha,
    };
    const newPlans = [...plans];
    newPlans[inde] = newPlan;
    setPlans(newPlans);
    if (check == 0) {
      setChoosed([...choosed, hahaha]);
    }
  }

  const handleAltUpdateSubmission = (e) => {
    e.preventDefault();
    var payload = JSON.stringify(images);
    var configg = {
      method: "POST",
      url: `${baseUrl}/api/pre-constructions/imagesalt/update/`,
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      data: payload,
    };
    axios(configg)
      .then(() => {
        setRefetch(!refetch);
        swal({
          text: "Sucessfully Updated Alt Tags",
          timer: 500,
          button: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        swal({
          text: "Error Updating Alt Tags",
          timer: 500,
          button: false,
        });
      });
  };

  const handlePlanUpdateSubmission = (e) => {
    e.preventDefault();
    console.log(plans);
    var payload = JSON.stringify(plans);
    var configg = {
      method: "POST",
      url: `${baseUrl}/api/pre-constructions/plans/update/`,
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      data: payload,
    };
    axios(configg)
      .then(() => {
        setRefetchPlans(!refetchplans);
        alert("Sucessfully Updated Plans Data");
      })
      .catch(function (error) {
        console.log(error);
        alert("Error Updating Plans Data");
      });
  };

  const handleImageDelete = (e, inde) => {
    swal("Are you sure to Delete ?", {
      buttons: {
        cancel: false,
        catch: {
          text: "No",
          value: "cancle",
          className: "bg-light text-dark",
        },
        default: {
          text: "Yes",
          value: "delete",
          className: "bg-danger text-light",
        },
      },
    }).then((value) => {
      switch (value) {
        case "cancle":
          break;

        case "delete":
          var payload = JSON.stringify(images[inde]);
          var configg = {
            method: "DELETE",
            url: `${baseUrl}/api/pre-constructions/image/delete/`,
            headers: {
              "Content-Type": "application/json",
            },
            mode: "no-cors",
            data: payload,
          };
          axios(configg)
            .then(() => {
              swal({
                text: "Deleted Sucessfully",
                timer: 500,
                button: false,
              });
              setRefetch(!refetch);
            })
            .catch(function (error) {
              console.log(error);
              swal({
                title: "Error occured",
                icon: "error",
              });
            });
          break;

        default:
          swal({
            title: "Error occured",
            icon: "error",
          });
      }
    });
  };

  const handlePlanDelete = (e, inde) => {
    var payload = JSON.stringify(plans[inde]);
    var configg = {
      method: "DELETE",
      url: `${baseUrl}/api/pre-constructions/plans/delete/`,
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      data: payload,
    };
    axios(configg)
      .then(() => {
        setRefetchPlans(!refetchplans);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!route.isReady) return;
    var configg2 = {
      method: "GET",
      url: `${baseUrl}/api/pre-constructions/images/${route.query.upload}/`,
      mode: "no-cors",
    };
    axios(configg2)
      .then((res) => {
        setImages(res.data.images);
        setPreid(res.data.preid);
        setPreconstinfo(res.data.preconstinfo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [refetch, route.isReady]);

  useEffect(() => {
    if (!route.isReady) return;
    var configg = {
      method: "GET",
      url: `${baseUrl}/api/pre-constructions/plans/${route.query.upload}/`,
      mode: "no-cors",
    };
    axios(configg)
      .then((res) => {
        setPlans(res.data.plans);
        setPreid(res.data.preid);
        setChoices(res.data.choices);
        setChoosed(res.data.choosed);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [refetchplans, route.isReady]);

  return (
    <>
      <Navbar />
      <Head>
        <title>Update Pre Construction</title>
      </Head>
      {modalimages && (
        <div className="modal">
          <section className="modal-main rounded-3">
            <div className="p-3 py-4 bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">Upload Images</p>
                <button
                  className="btn bg-white btn-outline-danger p-1 py-0"
                  onClick={() => setModalImages(false)}
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
                <input
                  type="file"
                  multiple
                  name="imagesmultiple"
                  id="imagesmultiple"
                  onChange={(e) => handleImagesChange(e)}
                />
              </div>
              <button
                className="btn btn-success mt-5 d-flex justify-content-center w-100 btn-lg"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
          </section>
        </div>
      )}
      {modalplans && (
        <div className="modal">
          <section className="modal-main rounded-4">
            <div className="p-3 py-4 bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">Upload Floor Plans</p>
                <button
                  className="btn bg-white btn-outline-danger p-1 py-0"
                  onClick={() => setModalPlans(false)}
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
                <div className="my-1 mb-4">
                  <label htmlFor="planprices" className="fw-bold">
                    Starting Price of Plans
                  </label>
                  <input
                    type="number"
                    name="starting"
                    id="planprices"
                    className="form-control py-3"
                    value={uploadplanprice}
                    onChange={(e) => setUploadPlanPrice(e.target.value)}
                  />
                </div>
                <div className="my-1 mb-5">
                  <label htmlFor="typeofplan" className="fs-5 fw-bold">
                    Select Type of Floor Plans
                  </label>
                  <select
                    className="form-select w-100 mt-2"
                    id="typeofplan"
                    onChange={(e) => setUploadPlanTypes(e.target.value)}
                  >
                    {choices.map((choic) => (
                      <option value={choic.choice}>{choic.choice}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="file"
                  multiple
                  name="imagesmultiple"
                  id="imagesmultiple"
                  onChange={(e) => handlePlansChange(e)}
                />
              </div>
              <button
                className="btn btn-success mt-5 d-flex justify-content-center w-100 btn-lg"
                onClick={(e) => handleSubmitPlans(e)}
              >
                Submit
              </button>
            </div>
          </section>
        </div>
      )}
      {floorp.item && (
        <div className="modal2">
          <section className="modal-h rounded-0 modal-dialog-scrollable">
            <div className="p-3 py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">
                  Floor Plan : {floorp.item.plan_name}
                </p>
                <button
                  className="btn bg-white btn-outline-danger p-1 py-0"
                  onClick={() => {
                    setFloorp({
                      item: null,
                      index: 0,
                    });
                  }}
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
              <div className="mt-4"></div>
              <div className="row row-cols-2">
                <div className="col-8 myinnerimg2-box">
                  <img
                    loading="lazy"
                    src={baseUrl + floorp.item.image}
                    className="img-fluid myinnerimg2"
                  />
                </div>
                <div className="col-4 py-3">
                  <div className="d-flex">
                    <select
                      className="form-select w-50"
                      id="type_of_plan"
                      onChange={(e) =>
                        handleplantypeChange(e, floorp.item, floorp.index)
                      }
                    >
                      <option selected>
                        {floorp.item.type_of_plan.choice}
                      </option>
                      {choices.map((choic) => (
                        <option value={choic.choice}>{choic.choice}</option>
                      ))}
                    </select>
                    <span className="mx-2"></span>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Plan Name"
                        value={plans[floorp.index].plan_name}
                        id="plan_name"
                        onChange={(e) =>
                          handleplandataChange(
                            e,
                            plans[floorp.index],
                            floorp.index
                          )
                        }
                      />
                      <label htmlFor="plan_name">Plan name</label>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="No of Baths"
                        value={plans[floorp.index].no_of_baths}
                        id="no_of_baths"
                        onChange={(e) =>
                          handleplandataChange(
                            e,
                            plans[floorp.index],
                            floorp.index
                          )
                        }
                      />
                      <label htmlFor="no_of_baths">Baths</label>
                    </div>
                    <span className="mx-2"></span>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Starting Price"
                        value={plans[floorp.index].starting_price_of_plan}
                        id="starting_price_of_plan"
                        onChange={(e) =>
                          handleplandataChange(
                            e,
                            plans[floorp.index],
                            floorp.index
                          )
                        }
                      />
                      <label htmlFor="starting_price_of_plan">
                        Starting price
                      </label>
                    </div>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="has_balcony"
                      checked={plans[floorp.index].has_balcony}
                      onChange={(e) =>
                        handleplandataChange(
                          e,
                          plans[floorp.index],
                          floorp.index
                        )
                      }
                    />
                    <label className="form-check-label" for="has_balcony">
                      Has Balcony
                    </label>
                  </div>
                  <div className="d-flex">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Area"
                        value={plans[floorp.index].area}
                        id="area"
                        onChange={(e) =>
                          handleplandataChange(
                            e,
                            plans[floorp.index],
                            floorp.index
                          )
                        }
                      />
                      <label htmlFor="area">Area</label>
                    </div>
                    <span className="mx-2"></span>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Balcony Area"
                        value={plans[floorp.index].balcony_area}
                        id="balcony_area"
                        onChange={(e) =>
                          handleplandataChange(
                            e,
                            plans[floorp.index],
                            floorp.index
                          )
                        }
                      />
                      <label htmlFor="balcony_area">Balcony Area</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <div className="bg-light">
        <div className="container">
          <div className="d-flex justify-content-between pt-5">
            <Link href="/admin">
              <a className="btn bg-white shadow">Go Back</a>
            </Link>
            <h4 className="fw-bold">
              Add / Update Images and Floor Plan Data for :{" "}
              {preconstinfo && preconstinfo.name}
            </h4>
          </div>
        </div>
        <div className="container pb-5 pt-3">
          <div className="py-5 px-5 bg-white mt-5">
            <div className="row row-cols-2 row-cols-md-4 roe-cols-lg-4 gy-4 py-4">
              {images.map((item, index) => (
                <div className="col" key={item.id}>
                  <div className="position-relative">
                    <img
                      src={baseUrl + item.images}
                      alt="houseimage"
                      className="img-fluid imgcur2"
                    />
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder={item.imagealt}
                      value={item.imagealt}
                      onChange={(e) => handleimageChange(e, item, index)}
                    />
                    <button
                      className="btn myalign p-1"
                      onClick={(e) => handleImageDelete(e, index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-x-circle-fill bg-light rounded-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center pt-4">
              <button
                className="btn btn-lg btn-light shadow my-4"
                onClick={(e) => handleAltUpdateSubmission(e)}
              >
                Update Alt Tags
              </button>
              <span className="mx-3"></span>
              <button
                className="btn btn-lg btn-success my-4"
                onClick={() => setModalImages(true)}
              >
                Upload More Photos
              </button>
            </div>
          </div>
          <div className="py-5"></div>
          <div className="py-5 px-5 bg-white mt-5">
            <div className="my-5">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                {choosed[0] && (
                  <li className="nav-item me-2" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-home-tab0"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home0"
                      type="button"
                      role="tab"
                      aria-controls="pills-home0"
                      aria-selected="true"
                    >
                      {choosed[0].choice}
                    </button>
                  </li>
                )}
                {choosed.slice(1) &&
                  choosed.slice(1).map((choi, index) => (
                    <li className="nav-item me-2" role="presentation">
                      <button
                        className="nav-link"
                        id={"pills-home-tab" + index + 1}
                        data-bs-toggle="pill"
                        data-bs-target={"#pills-home" + index + 1}
                        type="button"
                        role="tab"
                        aria-controls={"pills-home" + index + 1}
                        aria-selected="false"
                      >
                        {choi.choice}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="tab-content" id="pills-tabContent">
              {choosed[0] && (
                <div
                  className="tab-pane fade show active"
                  id="pills-home0"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab0"
                >
                  <div className="row row-cols-2 row-cols-md-3 row-cols-lg-3 g-5 py-4">
                    {plans.map(
                      (item, index) =>
                        ifexists(item, choosed[0]) && (
                          <div className="col" key={index}>
                            <div className="position-relative">
                              <img
                                src={baseUrl + item.image}
                                alt="houseimage"
                                className="img-fluid imgcur shadow-lg"
                                onClick={() =>
                                  setFloorp({ item: item, index: index })
                                }
                              />
                              <span className="mmmmm p-2 fs-mine shadow">
                                {(item.plan_name || "* Plan") +
                                  " | " +
                                  item.type_of_plan.choice +
                                  " | " +
                                  (item.no_of_baths || "*") +
                                  " Baths " +
                                  " | " +
                                  (item.area || "* Sq") +
                                  " Area "}
                              </span>
                              <div className="my-2"></div>
                              <button
                                className="btn myalign p-1"
                                onClick={(e) => handlePlanDelete(e, index)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  fill="currentColor"
                                  className="bi bi-x-circle-fill bg-light rounded-circle"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}
              {choosed.slice(1) &&
                choosed.slice(1).map((choi, index) => (
                  <div
                    key="index"
                    className="tab-pane fade"
                    id={"pills-home" + index + 1}
                    role="tabpanel"
                    aria-labelledby={"pills-home-tab" + index + 1}
                  >
                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-3 g-5 py-4">
                      {plans.map(
                        (item, index) =>
                          ifexists(item, choi) && (
                            <div className="col" key={index}>
                              <div className="position-relative">
                                <img
                                  src={baseUrl + item.image}
                                  alt="houseimage"
                                  className="img-fluid imgcur shadow-lg"
                                  onClick={() =>
                                    setFloorp({ item: item, index: index })
                                  }
                                />
                                <span className="mmmmm p-2 fs-mine shadow">
                                  {(item.plan_name || "* Plan") +
                                    " | " +
                                    item.type_of_plan.choice +
                                    " | " +
                                    (item.no_of_baths || "*") +
                                    " Baths " +
                                    " | " +
                                    (item.area || "* Sq") +
                                    " Area "}
                                </span>
                                <div className="my-2"></div>
                                <button
                                  className="btn myalign p-1"
                                  onClick={(e) => handlePlanDelete(e, index)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="currentColor"
                                    className="bi bi-x-circle-fill bg-light rounded-circle"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div className="d-flex justify-content-center pt-4">
              <button
                className="btn btn-lg btn-light shadow my-4"
                onClick={(e) => handlePlanUpdateSubmission(e)}
              >
                Update Plan Data
              </button>
              <span className="mx-3"></span>
              <button
                className="btn btn-lg btn-success my-4"
                onClick={() => setModalPlans(true)}
              >
                Upload More Plans
              </button>
            </div>
          </div>
          <div className="py-5"></div>
        </div>
      </div>
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
