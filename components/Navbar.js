import { useState } from "react";
import Link from "./ActiveLink";
import BasicAutoSuggest from "../components/BasicAutoSuggest";

export default function Navbar(props) {
  const [cityname, setCityname] = useState("");

  return (
    <>
      <div
        className={props.borderrr + " sticky-top topp bg-white py-1 shadowww"}
      >
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container-fluid px-3 px-lg-4 d-flex justify-content-between">
            <Link href="/" activeSubClassName=" " activeClassName=" ">
              <a className="navbar-brand me-0 me-sm-4">
                <div className="d-none d-sm-inline fs-3 fw-bold">
                  <span>homebaba</span>
                  <span>
                    <img
                      src="/canadaleaf.svg"
                      alt="canada mapel leaf"
                      className="img-fluid leaf-img ms-1"
                    />
                  </span>
                </div>
                <span className="d-inline d-sm-none">
                  <img
                    src="/logo.png"
                    alt="Homebaba Logo for mobile version"
                    className="img-fluid small-logo-img"
                  />
                  <span>
                    <img
                      src="/canadaleaf.svg"
                      alt="canada mapel leaf"
                      className="img-fluid leaf-img ms-1"
                    />
                  </span>
                </span>
              </a>
            </Link>
            <div className="input-group input-group-search">
              <BasicAutoSuggest
                defaultVal={props.defval}
                changeCity={setCityname}
              />
              <Link
                href={"/" + cityname.toLowerCase()}
                activeSubClassName=" "
                activeClassName=" "
              >
                <a
                  className="input-group-text btn bg-light2 bg-lh mybtn d-block"
                  type="button"
                  aria-label="Search Button"
                >
                  <svg
                    aria-hidden="true"
                    className="svg"
                    viewBox="0 0 30 30"
                    xmlns="http://www.w3.org/2000/svg"
                    height="25"
                    width="25"
                  >
                    <path
                      d="M20.756 18.876l6.155 6.154-1.88 1.881-6.155-6.155A9.269 9.269 0 0 1 13.3 22.61a9.31 9.31 0 1 1 9.31-9.31c0 2.091-.69 4.021-1.854 5.576zM13.3 19.95a6.65 6.65 0 1 0 0-13.3 6.65 6.65 0 0 0 0 13.3z"
                      fill="#000000"
                    ></path>
                  </svg>
                </a>
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <img
                loading="lazy"
                src="https://img.icons8.com/material-two-tone/24/000000/menu.png"
                width="24px"
                height="24px"
                alt="Navbar toggler icon"
              />
            </button>
            <div
              className="row row-cols-2 collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="col-12 d-flex justify-content-start justify-content-md-end">
                <ul className="navbar-nav mb-2 mb-lg-0 align-items-start align-items-md-end mt-3 mt-md-0">
                  <li className="nav-item p-1">
                    <Link href="/ontario-pre-construction-sales-and-assignment-sale">
                      <a className="nav-link active redddddd">
                        New Arrivals & Assignments
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item p-1">
                    <Link href="/blog">
                      <a className="nav-link active">Blogs</a>
                    </Link>
                  </li>
                  <li className="nav-item p-1">
                    <Link href="/contact-us">
                      <a className="nav-link active">Contact</a>
                    </Link>
                  </li>
                  <li className="nav-item p-1">
                    <div className="dropdown">
                      <button className="btn btn-filter select-options dropbtn navbd">
                        More
                        <span className="mx-1"></span>
                        <svg
                          className="svg"
                          viewBox="0 0 35 35"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.961 18.183l7.056-7.147 1.893 1.868-8.951 9.068-8.927-9.069 1.896-1.866z"
                            fill="#000000"
                          ></path>
                        </svg>
                      </button>
                      <div className="dropdown-content dcx">
                        <div className="row row-cols-1 dropdown-content-in shadm p-0 py-2 mt-3">
                          <div className="col">
                            <a className="haha" href="#">
                              First Time Buyer
                            </a>
                          </div>
                          <div className="col">
                            <a className="haha" href="#">
                              Market News
                            </a>
                          </div>
                          <div className="col">
                            <a className="haha" href="#">
                              About us
                            </a>
                          </div>
                          <div className="col">
                            <a className="haha" href="#">
                              FAQ
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  {/* <li className="nav-item p-1 ps-3">
                    <div className="position-relative">
                      <div className="hahabef">
                        <a
                          href="tel:647-527-4970"
                          className="btn btn-lg btn-call d-flex align-items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="currentColor"
                            className="bi bi-phone-vibrate"
                            viewBox="0 0 18 18"
                          >
                            <path d="M10 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4zM6 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6z" />
                            <path d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM1.599 4.058a.5.5 0 0 1 .208.676A6.967 6.967 0 0 0 1 8c0 1.18.292 2.292.807 3.266a.5.5 0 0 1-.884.468A7.968 7.968 0 0 1 0 8c0-1.347.334-2.619.923-3.734a.5.5 0 0 1 .676-.208zm12.802 0a.5.5 0 0 1 .676.208A7.967 7.967 0 0 1 16 8a7.967 7.967 0 0 1-.923 3.734.5.5 0 0 1-.884-.468A6.967 6.967 0 0 0 15 8c0-1.18-.292-2.292-.807-3.266a.5.5 0 0 1 .208-.676zM3.057 5.534a.5.5 0 0 1 .284.648A4.986 4.986 0 0 0 3 8c0 .642.12 1.255.34 1.818a.5.5 0 1 1-.93.364A5.986 5.986 0 0 1 2 8c0-.769.145-1.505.41-2.182a.5.5 0 0 1 .647-.284zm9.886 0a.5.5 0 0 1 .648.284C13.855 6.495 14 7.231 14 8c0 .769-.145 1.505-.41 2.182a.5.5 0 0 1-.93-.364C12.88 9.255 13 8.642 13 8c0-.642-.12-1.255-.34-1.818a.5.5 0 0 1 .283-.648z" />
                          </svg>
                          &nbsp; 647-527-4970
                        </a>
                      </div>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
