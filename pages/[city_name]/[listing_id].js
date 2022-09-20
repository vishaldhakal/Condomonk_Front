import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import Head from "next/head";
import Link from "../../components/ActiveLink";
import axios from "axios";
import CreateSchema from "../../components/CreateSchema";
import nFormatter from "../../components/nFormatter";
import { useRouter } from "next/router";
import { SRLWrapper } from "simple-react-lightbox";
import { useLightbox } from "simple-react-lightbox";
import swal from "sweetalert";
import ContactFormA from "../../components/ContactFormA";
import ContactFormB from "../../components/ContactFormB";

const Map = dynamic(() => import("../../components/MapSingle"), { ssr: false });
const ListingCard = dynamic(() => import("../../components/ListingCard"), {});
/* let baseUrl = "https://api.condomonk.ca"; */

export default function MyListings(props) {
  const [modalstat, setModalstat] = useState(false);
  const [modalfloor, setModalfloor] = useState(false);
  const [floorp, setFloorp] = useState(null);
  const [myemailval, setMyemailval] = useState("");
  const [myimages, setMyimages] = useState(props.images);
  const { openLightbox, closeLightbox } = useLightbox();
  const route = useRouter();

  function ifexists(item, choice) {
    if (item.type_of_plan.choice == choice.choice) {
      return true;
    }
    return false;
  }

  function handleEmailChange(e) {
    setMyemailval(e.target.value);
  }
  function showModal() {
    setModalstat(true);
  }
  function hideModal() {
    setModalstat(false);
  }

  const doTOcheck = (noo) => {
    if (parseInt(noo) != 0) {
      return "- High $ " + nFormatter(props.house_detail.price_to, 2);
    }
  };

  const doTOcheck2 = (noo) => {
    if (parseInt(noo) != 0) {
      return "Low $ " + nFormatter(props.house_detail.price_starting_from, 2);
    } else {
      return "Price coming soon";
    }
  };

  function hellochange() {
    if (
      route.query.city_name ==
      "ontario-pre-construction-sales-and-assignment-sale"
    ) {
      return (
        <h1 className="main-title mb-0 mt-2 mb-md-0">
          See similar upcoming preconstruction projects and Assignment sales in
          Ontario
        </h1>
      );
    } else {
      return (
        <h2 className="text-start homet ps-2">
          <Link href={`/${route.query.city_name}`}>
            <a className="bg-white text-decoration-mine">
              See similar preconstruction homes in {route.query.city_name}
            </a>
          </Link>
        </h2>
      );
    }
  }

  const convDash = (add) => {
    var result = add.split(" ").join("-");
    var newresult = result.split(",").join("-");
    return newresult;
  };

  const download = (e) => {
    fetch(e.target.href, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let neImgs = myimages;
    for (let i = myimages.length; i < 6; i++) {
      neImgs.push({
        id: 0,
        images: "/media/noimage.webp",
        imagealt: "no image available",
        preconst: 1,
      });
    }
    setMyimages(neImgs);
  }, []);

  function retF(arr) {
    arr.pop();
    let jjj = arr.join(" ");
    return jjj;
  }
  function retL(arr) {
    let jjj = arr[arr.length - 1];
    return jjj;
  }
  function retImg() {
    if (props.images[0]) {
      return "https://api.condomonk.ca" + props.images[0].images;
    } else {
      return "https://images.unsplash.com/photo-1627507055227-dd9c87118eb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80";
    }
  }

  const capture = (e) => {
    e.target.innerHTML = "Sharing...";
    axios({
      method: "post",
      url: "https://api.condomonk.ca/api/send-mail/",
      /* url: "http://127.0.0.1:8000/api/send-mail/", */
      data: {
        email: myemailval,
        img_url1: retImg(),
        name: props.house_detail.project_name,
        address: props.house_detail.project_address,
        from: nFormatter(props.house_detail.price_starting_from, 2),
        to: nFormatter(props.house_detail.price_to || 0, 2),
        developer: props.house_detail.developer.name,
        slug: props.house_detail.slug,
        cityname: route.query.city_name,
        deposite: props.house_detail.deposit_structure,
        movein: props.house_detail.occupancy,
        act: props.house_detail.assignment_closure_type,
      },
    })
      .then(function (response) {
        console.log(response);
        setModalstat(false);
        swal({
          text: "Sucessfully sent",
          timer: 1000,
          button: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        setModalstat(false);
      });
  };
  const options = {
    caption: {
      showCaption: false,
    },
    buttons: {
      showNextButton: true,
      showPrevButton: true,
    },
  };
  return (
    <>
      <Head>
        <meta name="Author" content="Homebaba"></meta>
        <meta name="Email" content="info@homebaba.ca"></meta>
        <title>{props.house_detail.meta_title}</title>
        <meta
          name="Description"
          content={props.house_detail.meta_description}
        ></meta>
        <link
          rel="canonical"
          href={
            "https://homebaba.ca/" +
            route.query.city_name +
            "/" +
            route.query.listing_id
          }
        />
        <meta name="robots" content="index, follow"></meta>
        <meta property="og:type" content="og:website" />
        <meta property="og:title" content={props.house_detail.meta_title} />
        <meta
          property="og:description"
          content={props.house_detail.meta_description}
        />
        {props.images[0] && (
          <meta
            property="og:image"
            content={`https://api.condomonk.ca${props.images[0].images}`}
          />
        )}
        {!props.images[0] && (
          <meta
            property="og:image"
            content="https://homebaba.ca/noimage.webp/"
          />
        )}
        <meta
          property="og:url"
          content={`https://homebaba.ca/${route.query.city_name}/${route.query.listing_id}`}
        />
        <meta property="og:site_name" content="Homebaba" />
      </Head>
      <script
        key={props.house_detail.slug}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(CreateSchema(props.house_detail)),
        }}
      />
      <Navbar defval={route.query.city_name}></Navbar>
      {modalstat && (
        <div className="modal">
          <section className="modal-main rounded-3">
            <div className="p-3 py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">
                  Email {props.house_detail.project_name}
                </p>
                <button
                  className="btn bg-white btn-outline-danger p-1 py-0"
                  onClick={hideModal}
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
              <div className="form-floating mb-3 mt-4">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="example@gmail.com"
                  value={myemailval}
                  onChange={handleEmailChange}
                />
                <label htmlFor="floatingInput">Receipent's Email address</label>
              </div>
              <div className="my-1"></div>
              <button
                className="btn btn-primary w-100 btn py-3 mt-2"
                onClick={capture}
              >
                Email this project
              </button>
            </div>
          </section>
        </div>
      )}

      {floorp && (
        <div className="modal">
          <section className="modal-main2 rounded-3">
            <div className="p-3 py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="fw-bold mb-0">Floor Plan : {floorp.plan_name}</p>
                <button
                  className="btn bg-white btn-outline-danger p-1 py-0"
                  onClick={() => {
                    setFloorp(null);
                    setModalfloor(false);
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
              <div>
                <img
                  loading="lazy"
                  src={`https://api.condomonk.ca${floorp.image}`}
                  alt={`${floorp.plan_name} Floor plan for ${props.house_detail.project_name}`}
                  className="img-fluid myinnerimg"
                />
              </div>
              <a
                href={`https://api.condomonk.ca${floorp.image}`}
                className="btn-light btn cur"
                target="_blank"
                download
                onClick={(e) => download(e)}
              >
                Download
              </a>
            </div>
          </section>
        </div>
      )}
      <div className="floating fixxcont">
        <a
          href="#mycontact"
          className="btn bgggggggg text-light rounded-0 w-100 py-3 shadow"
        >
          Send a message{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chat-left-dots"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </a>
      </div>
      <div className="container px-sm-0 px-md-mine">
        <div className="row row-cols-1 row-cols-sm-2 px-0 px-sm-3">
          <div className="col-sm-12 col-md-12 col-lg-12 mt-1">
            <div className="d-flex flex-column flex-sm-row align-items-start justify-content-sm-start align-items-sm-center mt-3">
              <span className="d-none d-md-flex">
                <Link href={`/${route.query.city_name}`} activeSubClassName=" ">
                  <a className="btn btn-sm p-0 fw-mine">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left-short"
                      viewBox="0 0 18 18"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                      />
                    </svg>
                    Back to Search
                  </a>
                </Link>
              </span>
              <span className="mx-2"></span>
              <Breadcrumbs />
            </div>
            <div className="position-relative ohid rounded-mine">
              <div className="position-absolute myps">
                <button
                  className="btn bg-white shadow-mine btn-sm"
                  onClick={showModal}
                >
                  Sent to a Friend
                </button>
              </div>
              <div className="position-absolute myps2">
                <button
                  className="btn bg-white shadow-mine btn-sm"
                  onClick={() => openLightbox()}
                >
                  View all Photos
                </button>
              </div>
              <div className="my-3 grid-cont">
                <SRLWrapper options={options}>
                  {myimages?.slice(0, 6).map((image, no) => (
                    <div
                      className={
                        "position-relative g-item grid-item" + parseInt(no + 1)
                      }
                      key={no}
                    >
                      <img
                        src={`https://api.condomonk.ca${image.images}`}
                        alt={`${props.house_detail.project_name} located at ${
                          props.house_detail.project_address
                        } image ${no + 1}`}
                        className="img-fluid w-100 h-100 rounded-mine"
                      />
                    </div>
                  ))}
                  <div className="grid-item0 g-item position-relative">
                    <Map
                      id="sd"
                      heightt="100%"
                      latitudeval={props.house_detail.latitute}
                      longitudeval={props.house_detail.longitude}
                      name={props.house_detail.project_name}
                    ></Map>
                  </div>
                </SRLWrapper>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-0 px-sm-3 pt-3">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2">
            <div className="col col-md-8">
              <div className="screenshot">
                <div className="row row-cols-1 row-cols-sm-2">
                  <div className="col-sm-12">
                    <h1 className="main-title main-titlee mb-0 fw-bold mt-2">
                      {retF(props.house_detail.project_name.split(" "))}{" "}
                      <span className="aff2">
                        {retL(props.house_detail.project_name.split(" "))}
                      </span>
                    </h1>
                    <p className="mb-0">
                      By {props.house_detail.developer.name}
                    </p>
                    <p className="mt-1 mb-0">Price Starting from</p>
                    <h2 className="text-mine main-title fs-3 fw-mine2 mt-1 mb-0">
                      {doTOcheck2(props.house_detail.price_starting_from)}
                      {doTOcheck(props.house_detail.price_to)}
                    </h2>
                    <p className="d-flex align-items-center my-0">
                      <svg
                        width="14"
                        height="20"
                        viewBox="0 0 16 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z"
                          fill="#000000"
                        />
                      </svg>
                      <span className="mx-1"></span>
                      <span className="text-dark">
                        {props.house_detail.project_address}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="my-4"></div>
                <h2 className="fw-bold pt-2 fs-3 letsp">
                  Information about {props.house_detail.project_name}
                </h2>
                <div id="features">
                  <div className="mb-5 mt-4">
                    <div className="rounded-mine">
                      <div>
                        <div className="mb-1">
                          <span className="me-2 fw-mine2 mb-2 fs-mine3">
                            City:
                          </span>
                          <span scope="col">
                            <Link href={`/${route.query.city_name}`}>
                              <a className="bg-white text-decoration-mine">
                                {props.house_detail.city.name}
                              </a>
                            </Link>
                          </span>
                        </div>
                        <div className="mb-1">
                          <span className="me-2 fw-mine2 mb-2 fs-mine3">
                            Occupancy:
                          </span>
                          <span scope="col">
                            {props.house_detail.occupancy}
                          </span>
                        </div>
                        <div className="mb-1">
                          <span className="me-2 fw-mine2 mb-2 fs-mine3">
                            Developed by:
                          </span>
                          <span scope="col">
                            {props.house_detail.developer.name}
                          </span>
                        </div>
                        <div className="mb-1">
                          <span className="me-2 fw-mine2 mb-2 fs-mine3">
                            Selling Status:
                          </span>
                          <span scope="col">{props.house_detail.status}</span>
                        </div>
                        <div className="mb-1">
                          <span className="me-2 fw-mine2 mb-2 fs-mine3">
                            No of units:
                          </span>
                          <span scope="col">
                            {props.house_detail.total_no_of_units}
                          </span>
                        </div>
                        <div className="mb-1">
                          <span className="me-2 fw-mine2 mb-2 fs-mine3">
                            Postal code:
                          </span>
                          <span scope="col">
                            {props.house_detail.postalcode}
                          </span>
                        </div>
                      </div>
                      {/* <div className="row me-0 row-cols-1 row-cols-md-2 row-cols-lg-3 py-1 gy-5">
                        <div className="col rounded-mine">
                          <div className="mybox">
                            <h4 className="fw-mine2 mb-2 fs-mine3">
                              Occupancy
                            </h4>
                            <span>{props.house_detail.occupancy}</span>
                          </div>
                        </div>
                        <div className="col rounded-mine">
                          <div className="mybox">
                            <h4 className="fw-mine2 mb-2 fs-mine3">
                              Assignment
                            </h4>
                            <span>
                              {props.house_detail.assignment_closure_type}
                            </span>
                          </div>
                        </div>
                        <div className="col rounded-mine">
                          <div className="mybox">
                            <h4 className="fw-mine2 mb-2 fs-mine3">
                              Selling Status
                            </h4>
                            <span>{props.house_detail.status}</span>
                          </div>
                        </div>
                        <div className="col rounded-mine">
                          <div className="mybox">
                            <h4 className="fw-mine2 mb-2 fs-mine3">
                              No of units
                            </h4>
                            <span>{props.house_detail.total_no_of_units}</span>
                          </div>
                        </div>
                        <div className="col rounded-mine">
                          <div className="mybox">
                            <h4 className="fw-mine2 mb-2 fs-mine3">
                              Postal code
                            </h4>
                            <span>{props.house_detail.postalcode}</span>
                          </div>
                        </div>
                        <div className="col rounded-mine">
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="row me-0 row-cols-1 row-cols-md-2">
                    <div className="col">
                      <div className="py-4">
                        <h3 className="fw-bold fs-5">
                          Extended Deposit Structure
                        </h3>
                        <div className="text-inside">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: props.house_detail.deposit_structure,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="py-4">
                        <h3 className="fw-bold fs-5">Facts and Features</h3>
                        <div>
                          <div className="text-inside">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: props.house_detail.facts_about,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {props.floor_plans[0] && (
                  <div className="py-4">
                    <h2 className="fw-bold fs-3 mb-4">See all Floor Plans</h2>
                    <ul
                      className="nav nav-pills mb-3 ps-0"
                      id="pills-tab"
                      role="tablist"
                    >
                      {props.house_detail.type_of_plan[0] && (
                        <li className="nav-item me-3" role="presentation">
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
                            {props.house_detail.type_of_plan[0].choice}
                          </button>
                        </li>
                      )}
                      {props.house_detail.type_of_plan.slice(1) &&
                        props.house_detail.type_of_plan
                          .slice(1)
                          .map((choi, index) => (
                            <li className="nav-item me-3" role="presentation">
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

                    <div className="tab-content" id="pills-tabContent">
                      {props.house_detail.type_of_plan[0] && (
                        <div
                          className="tab-pane fade show active"
                          id="pills-home0"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab0"
                        >
                          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-3 g-5 py-4">
                            {props.floor_plans.map(
                              (item, index) =>
                                ifexists(
                                  item,
                                  props.house_detail.type_of_plan[0]
                                ) && (
                                  <div className="col" key={index}>
                                    <div
                                      id={item.plan_name}
                                      className="col border-0"
                                      onClick={() => {
                                        setFloorp(item);
                                        setModalfloor(true);
                                      }}
                                    >
                                      <div className="card border-0 shadow-mi rounded-mine">
                                        <img
                                          loading="lazy"
                                          src={
                                            "https://api.condomonk.ca" +
                                            item.image
                                          }
                                          alt={
                                            item.plan_name +
                                            " Floor Plan of " +
                                            props.house_detail.project_name +
                                            " with " +
                                            item.no_of_beds +
                                            " beds"
                                          }
                                          height="500px"
                                          className="img-fluid card-img-top rounded-top-mine"
                                        />
                                        <div className="card-body">
                                          <p className="card-title fw-mine small-text">
                                            {props.house_detail.project_name}
                                          </p>
                                          <h4 className="fw-bold mb-1">
                                            {item.plan_name}
                                          </h4>
                                          <div className="d-flex justify-content-start">
                                            <p className="mb-1">
                                              {item.area || "NaN"} ft{" "}
                                              <sup>2</sup>
                                            </p>
                                            <span className="mx-2">|</span>
                                            <p className="mb-0">
                                              {item.no_of_baths} Bath
                                            </p>
                                          </div>
                                        </div>
                                        <button className="btn btn-minee text-start">
                                          Starting From $
                                          {item.starting_price_of_plan}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      )}
                      {props.house_detail.type_of_plan.slice(1) &&
                        props.house_detail.type_of_plan
                          .slice(1)
                          .map((choi, index) => (
                            <div
                              key="index"
                              className="tab-pane fade"
                              id={"pills-home" + index + 1}
                              role="tabpanel"
                              aria-labelledby={"pills-home-tab" + index + 1}
                            >
                              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-3 g-5 py-4">
                                {props.floor_plans.map(
                                  (item, index) =>
                                    ifexists(item, choi) && (
                                      <div className="col" key={index}>
                                        <div
                                          id={item.plan_name}
                                          className="col border-0"
                                          onClick={() => {
                                            setFloorp(item);
                                            setModalfloor(true);
                                          }}
                                        >
                                          <div className="card border-0 shadow-mi rounded-mine">
                                            <img
                                              loading="lazy"
                                              src={
                                                "https://api.condomonk.ca" +
                                                item.image
                                              }
                                              alt={
                                                item.plan_name +
                                                " Floor Plan of " +
                                                props.house_detail
                                                  .project_name +
                                                " with " +
                                                item.no_of_beds +
                                                " beds"
                                              }
                                              height="500px"
                                              className="img-fluid card-img-top rounded-top-mine"
                                            />
                                            <div className="card-body">
                                              <p className="card-title fw-mine small-text">
                                                {
                                                  props.house_detail
                                                    .project_name
                                                }
                                              </p>
                                              <h4 className="fw-bold mb-1">
                                                {item.plan_name}
                                              </h4>
                                              <div className="d-flex justify-content-start">
                                                <p className="mb-1">
                                                  {item.area || "NaN"} ft{" "}
                                                  <sup>2</sup>
                                                </p>
                                                <span className="mx-2">|</span>
                                                <p className="mb-0">
                                                  {item.no_of_baths} Bath
                                                </p>
                                              </div>
                                            </div>
                                            <button className="btn btn-minee text-start">
                                              Starting From $
                                              {item.starting_price_of_plan}
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                )}
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                )}
                {!props.floor_plans[0] && (
                  <div className="py-4">
                    <h2 className="fw-bold fs-3">See all Floor Plans</h2>
                    <p>Floor Plans Coming soon</p>
                  </div>
                )}
                <div className="py-5">
                  <h2 className="fw-bold fs-3">
                    More About {props.house_detail.project_name} in{" "}
                    <Link href={`/${route.query.city_name}`}>
                      <a className="bg-white text-decoration-mine">
                        {props.house_detail.city.name}
                      </a>
                    </Link>
                  </h2>
                  <div className="text-start my-3 text-inside">
                    <div
                      className="iframe-container"
                      dangerouslySetInnerHTML={{
                        __html: props.house_detail.description,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="py-3 my-5">
                <h2 className="fw-bold fs-4 pb-3">
                  <img
                    src="/icons/walking.png"
                    alt="..."
                    className="img-fluid"
                  />
                  <span className="mx-1"></span>
                  Walk Score for {props.house_detail.project_name}
                </h2>

                <div>
                  <div className="p-1">
                    <div className="walkscore-container mt-2 p-1 rounded-mine">
                      <script type="text/javascript"></script>
                      <div id="ws-walkscore-tile" className="ham2 img-fluid">
                        <iframe
                          marginHeight="0"
                          marginWidth="0"
                          height="500px"
                          frameBorder="0"
                          scrolling="no"
                          title="Walk Score"
                          className="ham"
                          width="100%"
                          src={
                            "https://www.walkscore.com/serve-walkscore-tile.php?wsid=&amp&s=" +
                            convDash(props.house_detail.project_address) +
                            "&amp;o=h&amp;c=f&amp;h=500&amp;fh=0&amp;w=737"
                          }
                        ></iframe>
                      </div>
                      <script
                        type="text/javascript"
                        src="https://www.walkscore.com/tile/show-walkscore-tile.php"
                      ></script>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-4">
                <h2 className="fw-bold fs-4">
                  <img
                    loading="lazy"
                    src="/icons/home_address.png"
                    alt={
                      "property location icon of " +
                      props.house_detail.project_name
                    }
                    className="img-fluid"
                  />
                  <span className="mx-1"></span>
                  Property Location - {props.house_detail.project_name}
                </h2>
                <p className="small-text2 mb-2 mt-1">
                  Note : The exact location of the project may be vary from the
                  address shown here
                </p>
                <div>
                  <div className="bg-white p-1 rounded-mine">
                    <div className="mx-5 px-5"></div>
                    <Map
                      id="ds"
                      heightt="50vh"
                      latitudeval={parseFloat(props.house_detail.latitute)}
                      longitudeval={parseFloat(props.house_detail.longitude)}
                      name={props.house_detail.project_name}
                    ></Map>
                  </div>
                </div>
              </div>
              <div className="py-4">
                <h2 className="fw-bold fs-4">
                  <img
                    loading="lazy"
                    src="/icons/home_address.png"
                    alt={
                      "property street view icon of " +
                      props.house_detail.project_name
                    }
                    className="img-fluid"
                  />
                  <span className="mx-1"></span>
                  Street View of the Neighbourhood
                </h2>
                <p className="small-text2 mb-2 mt-1">
                  Note : The exact location of the project may vary from the
                  street view shown here
                </p>
                <div>
                  <div className="bg-white p-1 rounded-mine">
                    <div className="mx-5 px-5"></div>
                    <div className="map-responsive">
                      <iframe
                        title={
                          "Google Street Map View for" +
                          props.house_detail.project_name
                        }
                        src={props.house_detail.street_map}
                        width="600"
                        height="450"
                        className="border-0"
                        allowFullScreen={true}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-md-4 ps-md-2 pt-5 pt-md-0" id="mycontact">
              <div className="py-4 py-md-0"></div>
              <div className="myps3 mt-mine pe-0">
                <div className="text-center">
                  <img
                    loading="lazy"
                    alt="Register Now Text Design"
                    src="/reg.webp"
                    className="img-fluid mb-3 imgmm"
                  />
                </div>
                <div className="m-1 p-4 py-3 shadow-lg rounded-mine bordt">
                  <div className="row row-cols-2 align-items-center">
                    <div className="col-4">
                      <img src="/milan-2.png" alt="dce" className="agent-img" />
                    </div>
                    <div className="col-8">
                      <h5 className="fw-bold text-center linem fs-4  mb-0">
                        Receive a Call
                      </h5>
                      <p className="text-center fw-normal mb-0">
                        Speak to an expert agent
                      </p>
                    </div>
                  </div>
                  <div className="my-4"></div>
                  <ContactFormA
                    projects_name={props.house_detail.project_name}
                    defaultmessage={
                      "Please send me additional information about " +
                      props.house_detail.project_name +
                      ".  Thank you"
                    }
                  ></ContactFormA>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5"></div>
      <div className="d-none d-md-block container">
        <div className="contact_part py-5 my-5">
          <div className="row justify-content-center">
            <img
              src="/contact-bottom-2.png"
              alt="dce"
              className="img-fluid w-25 w-smm-50 mb-3"
            />
            <h4 className="text-center fs-5 fs-md-4 fw-bold">
              Have any questions about {props.house_detail.project_name} ?
            </h4>
            <p className="mb-0 text-center fs-mine2">
              Speak to our Preconstruction expert today{" "}
              {/* |{" "}
              <a href="tel:647-527-4970" className="link-mine fs-mine2">
                647-527-4970
              </a> */}
            </p>
          </div>
          <div className="row row-cols-1 row-cols-md-3 mt-5">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <ContactFormB></ContactFormB>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
      <div className="py-3 py-md-4"></div>
      <div className="container-fluid px-md-4 pt-md-5 mt-4">
        <section>
          <div className="d-flex justify-content-between align-items-center  pb-md-4">
            <div>{hellochange()}</div>
            <Link href={`/${route.query.city_name}`}>
              <a className="btn btn-mine3 d-none d-sm-block">View All</a>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 gx-2 gx-md-4 gy-md-5 mx-0">
            {props.house_detail.related1 &&
              props.house_detail.related1.map((post) => (
                <div className="col" key={post.slug}>
                  <script
                    key={post.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(CreateSchema(post)),
                    }}
                  />
                  <ListingCard
                    price={post.price_starting_from}
                    street={post.project_address}
                    status={post.status}
                    city_name={props.house_detail.city.name}
                    name={post.project_name}
                    house_type={post.project_type}
                    img_url1={post.images[0]}
                    url_slug={post.slug}
                    main_feature={post.feature_button_text}
                    ready_date={post.occupancy}
                    storeys={post.storeys}
                  />
                </div>
              ))}
          </div>
          <div className="my-3"></div>
        </section>
        <div className="py-4"></div>
      </div>
      <div className="py-5"></div>
      <img
        loading="lazy"
        src="/line.png"
        alt="Line image for character"
        className="img-fluid foot-up-img"
      />
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const posts = await axios.get(
    `https://api.condomonk.ca/api/pre-constructions/${params.listing_id}/`
  );

  return {
    props: posts.data,
    revalidate: 10,
  };
}
