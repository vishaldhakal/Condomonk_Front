import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "../../components/ActiveLink";
import Head from "next/head";
import axios from "axios";
import Router from "next/router";
import CreateSchema from "../../components/CreateSchema";
import ContactFormB from "../../components/ContactFormB";

import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";
const Map = dynamic(() => import("../../components/Mapp"), { ssr: false });

const ListingCard = dynamic(() => import("../../components/ListingCard"), {
  loading: () => <p>Loading...</p>,
});

export default function MyListings(props) {
  const [isLoading, setLoading] = useState(false); //State for the loading indicator
  const [showMap, setShowMap] = useState(false);
  const [showMapClass, setShowMapClass] = useState({
    class1: "col-md-12",
    class2:
      "row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 gx-2 gx-md-4 gy-md-5 mx-0",
  });
  const [showLeftScroll, setshowLeftScroll] = useState(false);
  const routee = useRouter();

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  function mapbtnclick() {
    setShowMap(true);
    setShowMapClass({
      class1: "col-md-7",
      class2:
        "row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xxl-3 gx-2 gx-md-4 gy-md-5 mx-0",
    });
  }
  function mapbtnclick2() {
    setShowMap(false);
    setShowMapClass({
      class1: "col-md-12",
      class2:
        "row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 gx-2 gx-md-4 gy-md-5 mx-0",
    });
  }
  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  else {
    <div>Loading...</div>;
  }

  function pagination(currentPage, nrOfPages) {
    var delta = 2,
      range = [],
      rangeWithDots = [],
      l;

    range.push(1);

    if (nrOfPages <= 1) {
      return range;
    }

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i < nrOfPages && i > 1) {
        range.push(i);
      }
    }
    range.push(nrOfPages);

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

  function rightScrollClick() {
    let scrollDiv = document.querySelector(".main-cont");
    scrollDiv.scroll({
      left: (scrollDiv.scrollLeft += 150),
      top: 0,
      behavior: "smooth",
    });
    if (scrollDiv.scrollLeft >= 0) {
      setshowLeftScroll(true);
    } else {
      setshowLeftScroll(false);
    }
  }

  function leftScrollClick() {
    let scrollDiv = document.querySelector(".main-cont");
    scrollDiv.scroll({
      left: (scrollDiv.scrollLeft -= 150),
      top: 0,
      behavior: "smooth",
    });
    if (scrollDiv.scrollLeft != 0) {
      setshowLeftScroll(true);
    } else {
      setshowLeftScroll(false);
    }
  }
  // convert first letter of a string to uppercase
  function capitalizeFirstLetter(str) {
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  }

  function hellochange(vall) {
    if (
      routee.query.city_name ==
      "ontario-pre-construction-sales-and-assignment-sale"
    ) {
      return (
        <h1 className="main-title mb-0 mt-2 mb-md-0">
          Upcoming Pre-Construction homes for sale in Ontario & Assignment sales
          ( <i className="text-danger">VIP Access*</i> )
        </h1>
      );
    } else if (
      routee.query.city_name == "vancouver" ||
      routee.query.city_name == "burnaby" ||
      routee.query.city_name == "richmond" ||
      routee.query.city_name == "surrey"
    ) {
      return (
        <h1 className="main-title mb-0 mt-2 mb-md-0">
          Top {vall} {capitalizeFirstLetter(routee.query.city_name)} New
          Construction or Presale Homes, Condos & Townhomes
        </h1>
      );
    } else {
      return (
        <h1 className="main-title mb-0 mt-2 mb-md-0">
          Top {vall} {capitalizeFirstLetter(routee.query.city_name)} New
          Construction Homes, Condos & Townhomes
        </h1>
      );
    }
  }
  function hellochange2(vall) {
    if (
      routee.query.city_name ==
      "ontario-pre-construction-sales-and-assignment-sale"
    ) {
      return (
        <h2 className="main-subtitle d-flex justify-content-between mt-3 mt-md-2">
          Check out all upcoming preconstruction projects and Assignment sales
          in Ontario. Projects Selliing quickly, Call us today!
        </h2>
      );
    } else {
      return (
        <h2 className="main-subtitle d-flex justify-content-between mt-3 mt-md-2">
          {vall} New Preconstruction Detached, Townhomes, or Condos for sale in{" "}
          {capitalizeFirstLetter(routee.query.city_name)}, Ontario | Check out
          plans, pricing, availability for preconstruction homes in{" "}
          {capitalizeFirstLetter(routee.query.city_name)}
        </h2>
      );
    }
  }

  return (
    <>
      <Head>
        <meta name="Author" content="Homebaba"></meta>
        <meta name="Email" content="info@homebaba.ca"></meta>
        {props.citydetail && (
          <>
            <title>
              {"Top " +
                props.totalCount +
                " " +
                props.citydetail.name +
                " New Construction Homes, Condos & Townhomes "}
            </title>
            <meta
              name="Description"
              content={
                "Looking for a Pre construction in " +
                props.citydetail.name +
                "? Discover " +
                props.totalCount +
                " New Homes and Condo Developments in " +
                props.citydetail.name +
                ". Get early access to details and floor plans now."
              }
            ></meta>
            <link
              rel="canonical"
              href={"https://homebaba.ca/" + routee.query.city_name}
            />
            <meta name="robots" content="index, follow"></meta>
            <meta property="og:type" content="og:website" />
            <meta
              property="og:title"
              content={
                "Top " +
                props.totalCount +
                " " +
                props.citydetail.name +
                " New Construction Homes, Condos & Townhomes "
              }
            />
            <meta
              property="og:description"
              content={
                "Looking for a Pre-construction in " +
                props.citydetail.name +
                "? Discover " +
                props.totalCount +
                " New Homes and Condo Developments in " +
                props.citydetail.name +
                ". Get early access to details and floor plans now."
              }
            />
            {props.posts[0] && props.posts[0].images[0] && (
              <meta
                property="og:image"
                content={
                  "https://api.condomonk.ca" +
                  props.posts[0].images[0].split(",")[0]
                }
              />
            )}
            {!props.posts[0] ||
              (!props.posts[0].images[0] && (
                <meta property="og:image" content="/noimage.webp" />
              ))}
            <meta
              property="og:url"
              content={"https://homebaba.ca/" + routee.query.city_name}
            />
          </>
        )}
        <meta property="og:site_name" content="Homebaba" />
      </Head>
      <Navbar defval={routee.query.city_name}></Navbar>
      <div>
        <div className="row row-cols-1 row-cols-md-1 g-0">
          <div className={showMapClass.class1}>
            <div className="d-flex justify-content-start align-items-center bg-mine flex-direction-column position-relative">
              <>
                {showLeftScroll && (
                  <button
                    className="btn btn-scroll px-2 position-absolute h-100"
                    onClick={leftScrollClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                      />
                    </svg>
                  </button>
                )}
                <div className="main-cont p-2 p-md-3 px-1 px-md-3 d-flex overflow-scroll">
                  <Link href="/toronto" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Toronto
                    </a>
                  </Link>
                  <Link href="/aurora">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Aurora
                    </a>
                  </Link>
                  <Link href="/barrie">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Barrie
                    </a>
                  </Link>
                  <Link href="/pickering">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Pickering
                    </a>
                  </Link>
                  <Link href="/hamilton">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Hamilton
                    </a>
                  </Link>
                  <Link href="/calgary" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Calgary
                    </a>
                  </Link>
                  <Link href="/collingwood" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Collingwood
                    </a>
                  </Link>
                  <Link href="/ottawa" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Ottawa
                    </a>
                  </Link>
                  <Link href="/innisfil" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Innisfil
                    </a>
                  </Link>
                  <Link href="/niagara" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Niagara
                    </a>
                  </Link>
                  <Link href="/thorold" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Thorold
                    </a>
                  </Link>
                  <Link href="/grimsby" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Grimsby
                    </a>
                  </Link>
                  <Link href="/welland" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Welland
                    </a>
                  </Link>
                  <Link href="/oshawa" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Oshawa
                    </a>
                  </Link>
                  <Link href="/brampton" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Brampton
                    </a>
                  </Link>
                  <Link href="/london">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      London
                    </a>
                  </Link>
                  <Link href="/guelph">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Guelph
                    </a>
                  </Link>
                  <Link href="/georgetown" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Georgetown
                    </a>
                  </Link>
                  <Link href="/ajax" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Ajax
                    </a>
                  </Link>
                  <Link href="/mississauga" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Mississauga
                    </a>
                  </Link>
                  <Link href="/milton" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Milton
                    </a>
                  </Link>
                  <Link href="/vancouver">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Vancouver
                    </a>
                  </Link>
                  <Link href="/burnaby">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Burnaby
                    </a>
                  </Link>
                  <Link href="/surrey">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Surrey
                    </a>
                  </Link>
                  <Link href="/richmond">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Richmond
                    </a>
                  </Link>
                  <Link href="/burlington" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Burlington
                    </a>
                  </Link>
                  <Link href="/vaughan" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Vaughan
                    </a>
                  </Link>
                  <Link href="/markham" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Markham
                    </a>
                  </Link>
                  <Link href="/oakville" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Oakville
                    </a>
                  </Link>
                  <Link href="/waterloo" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Waterloo
                    </a>
                  </Link>
                  <Link href="/cambridge" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Cambridge
                    </a>
                  </Link>
                  <Link href="/kitchener" activeClassName="car-item-active">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Kitchener
                    </a>
                  </Link>
                  <Link href="/bradford">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Bradford
                    </a>
                  </Link>
                  <Link href="/caledon">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Caledon
                    </a>
                  </Link>
                  <Link href="/whitby">
                    <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
                      Whitby
                    </a>
                  </Link>
                </div>
                <button
                  className="btn btn-scroll rounded-0 h-100 position-absolute px-2 hh"
                  onClick={rightScrollClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </>
            </div>
            <div className="container-fluid px-md-4">
              <div className="row py-2 py-sm-2 mt-sm-2 mx-0">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start">
                  {hellochange(props.totalCount)}

                  {!showMap && (
                    <button
                      className="d-none d-sm-block btn bg-white btn-outline-secondary"
                      onClick={mapbtnclick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-map"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
                        />
                      </svg>
                      <span className="ms-2">Map View</span>
                    </button>
                  )}
                  {showMap && (
                    <button
                      className="d-none d-sm-block btn bg-white btn-outline-secondary"
                      onClick={mapbtnclick2}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-list"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                        />
                      </svg>
                      <span className="ms-2">List View</span>
                    </button>
                  )}
                </div>
                {hellochange2(props.totalCount)}
              </div>
              <div className="py-md-1"></div>
              <div className={showMapClass.class2}>
                {props.posts.map((post, index) => (
                  <div className="col" key={post.slug}>
                    <script
                      key={post.slug}
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify(CreateSchema(post)),
                      }}
                    />
                    <ListingCard
                      num={index + 1}
                      price={post.price_starting_from}
                      street={post.project_address}
                      status={post.status}
                      city_name={post.city.name}
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
              <div className="my-4 py-4"></div>
              {parseInt(props.totalCount) + 1 != 1 && (
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    {props.currentPage - 1 != 0 && (
                      <li className="page-item">
                        <Link
                          href={
                            props.currentPage == 2
                              ? `/${routee.query.city_name}`
                              : `/${routee.query.city_name}?page=${
                                  parseInt(routee.query.page) - 1
                                }`
                          }
                        >
                          <a
                            className="page-link no-border"
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </Link>
                      </li>
                    )}
                    {pagination(props.currentPage, props.pageCount).map(
                      (no) => (
                        <li className="page-item" key={no}>
                          <Link
                            href={
                              no == 1
                                ? `/${routee.query.city_name}`
                                : `/${routee.query.city_name}?page=${no}`
                            }
                          >
                            <a
                              className={
                                props.currentPage == no
                                  ? "page-link no-border page-item-active shadow-ha"
                                  : "page-link no-border"
                              }
                            >
                              {no}
                            </a>
                          </Link>
                        </li>
                      )
                    )}
                    {props.pageCount != props.currentPage && (
                      <li className="page-item">
                        <Link
                          href={`/${routee.query.city_name}?page=${
                            (parseInt(routee.query.page) || 1) + 1
                          }`}
                        >
                          <a
                            className="page-link no-border"
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
              <p className="main-subtitle text-center">
                Page 1 of {props.totalCount} Results
              </p>

              <div className="my-5"></div>
              <div className="py-5 my-5">
                <div className="container">
                  <div className="d-flex justify-content-center">
                    <div>
                      <h2 className="text-center main-1">
                        <span className="text-myred">Be</span> Smart.{" "}
                        <span className="text-myred">Be</span> Quick
                      </h2>
                      <h4 className="text-center main-2">
                        Get in the line before someone else does
                      </h4>
                    </div>
                  </div>
                  <div className="row row-cols-1 row-cols-md-3 mt-5 g-1 g-md-0">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                      <ContactFormB></ContactFormB>
                    </div>
                    <div className="col-md-3"></div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="py-5">
                  <img
                    src="/inbetweeen.png"
                    alt="your top choice Pre-construction Homes Marketplace in Canada"
                    className="img-fluid inbetween-img"
                  />
                </div>
              </div>
              {props.citydetail && (
                <div className="container" id="make-img-responsive">
                  <div className="row row-cols-1 g-0">
                    <div
                      className="col-12 mt-mine px-3"
                      dangerouslySetInnerHTML={{
                        __html: props.citydetail.city_details,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-5 d-none rell d-md-block rounded-pill">
            {showMap && props.posts[0] && (
              <div className="position-relative">
                <button
                  className="btn bg-white maptopbtn"
                  onClick={mapbtnclick2}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-map"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
                    />
                  </svg>
                  <span className="ms-2">Close Map</span>
                </button>
                <Map
                  heightt="100%"
                  datas={props.posts}
                  citydetail={props.citydetail}
                ></Map>
              </div>
            )}
          </div>
        </div>
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
    paths: [
      {
        params: { city_name: "toronto" },
      },
      {
        params: { city_name: "brampton" },
      },
      {
        params: { city_name: "burlington" },
      },
      {
        params: { city_name: "mississauga" },
      },
      {
        params: { city_name: "milton" },
      },
      {
        params: { city_name: "markham" },
      },
      {
        params: { city_name: "kitchener" },
      },
      {
        params: { city_name: "cambridge" },
      },
      {
        params: { city_name: "waterloo" },
      },
      {
        params: { city_name: "vaughan" },
      },
      {
        params: { city_name: "oakville" },
      },
      {
        params: { city_name: "ajax" },
      },
      {
        params: { city_name: "georgetown" },
      },
      {
        params: { city_name: "innisfil" },
      },
      {
        params: { city_name: "niagara" },
      },
      {
        params: { city_name: "thorold" },
      },
      {
        params: { city_name: "grimsby" },
      },
      {
        params: { city_name: "calgary" },
      },
      {
        params: { city_name: "ottawa" },
      },
      {
        params: { city_name: "aurora" },
      },
      {
        params: { city_name: "oshawa" },
      },
      {
        params: { city_name: "barrie" },
      },
      {
        params: { city_name: "hamilton" },
      },
      {
        params: { city_name: "bradford" },
      },
      {
        params: { city_name: "caledon" },
      },
      {
        params: { city_name: "whitby" },
      },
      {
        params: { city_name: "collingwood" },
      },
      {
        params: { city_name: "welland" },
      },
      {
        params: { city_name: "london" },
      },
      {
        params: { city_name: "guelph" },
      },
      {
        params: { city_name: "vancouver" },
      },
      {
        params: { city_name: "burnaby" },
      },
      {
        params: { city_name: "surrey" },
      },
      {
        params: { city_name: "richmond" },
      },
      {
        params: { city_name: "pickering" },
      },
      {
        params: {
          city_name: "ontario-pre-construction-sales-and-assignment-sale",
        },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = /* query.page ||  */ 1; //if page empty we request the first page
  const posts = await axios.get(
    `https://api.condomonk.ca/api/pre-constructions-city/${params.city_name}/?page=${page}`
  );
  return {
    props: {
      totalCount: posts.data.data.totalCount,
      pageCount: posts.data.data.totalPages,
      currentPage: page,
      perPage: posts.data.data.dataPerpage,
      posts: posts.data.data.results,
      citydetail: posts.data.citydata,
    },
    revalidate: 10,
  };
}
