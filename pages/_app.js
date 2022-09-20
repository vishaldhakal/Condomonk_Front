import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import SimpleReactLightbox from "simple-react-lightbox";
import Link from "next/link";
import { useEffect, useState } from "react";
import ContactFormSubmit from "./../components/ContactFormSubmit";

const progress = new ProgressBar({
  size: 3,
  color: "#000000",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  const [submitbtn, setSubmitbtn] = useState("Contact now");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "info@homebaba.ca",
    message:
      "Please send me additional information about UC Tower 3 | From Popup",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    const adimg = document.getElementById("adimg");
    e.preventDefault();
    ContactFormSubmit(credentials, setSubmitbtn, setCredentials);
    sessionStorage.setItem("alreadyShow", "alredy shown");
    adimg.classList.add("d-none");
  };
  useEffect(() => {
    let is_modal_show = sessionStorage.getItem("alreadyShow");
    if (is_modal_show != "alredy shown") {
      const adimg = document.getElementById("adimg");
      const closeadbtn = document.getElementById("closead");
      const mahlink = document.getElementById("mahlink");
      var timer;
      var millisecBeforeRedirect = 1500;
      function timeOutClear() {
        window.clearTimeout(timer);
        adimg.classList.add("d-none");
      }
      window.addEventListener("load", () => {
        timer = window.setTimeout(function () {
          /* adimg.classList.remove("d-none"); */
        }, millisecBeforeRedirect);
      });
      closeadbtn.addEventListener("click", () => {
        timeOutClear();
        sessionStorage.setItem("alreadyShow", "alredy shown");
      });
      mahlink.addEventListener("click", () => {
        timeOutClear();
        sessionStorage.setItem("alreadyShow", "alredy shown");
      });
    }
  }, []);
  return (
    <SimpleReactLightbox>
      <Component {...pageProps} />
      <div id="adimg" className="myadbox d-none">
        <div>
          <div className="myVideo">
            <div className="position-relative">
              <div className="d-flex justify-content-end p-3">
                <button id="closead" className="btn btn-light closea">
                  Close &nbsp;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="red"
                    class="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                    />
                  </svg>
                </button>
              </div>
              <Link href={"/cambridge/westwood-village-preserve"}>
                <a className="text-decoration-none text-dark">
                  <img
                    id="mahlink"
                    src="/villagepreserve.jpg"
                    alt=""
                    className="img-fluid mujiimage"
                  />
                </a>
              </Link>
              <div className="posttttt">
                <div className="row row-cols-2 row-cols-md-3 gx-2 g-md-3">
                  <div className="col">
                    <div className="form-floating mb-0 mb-md-3 mt-2">
                      <input
                        type="email"
                        className="form-control"
                        name="name"
                        id="name"
                        value={credentials.name}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="floatingInput">Full name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-0  mb-md-3 mt-2">
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        id="phone"
                        value={credentials.phone}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="floatingInput">Phone</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <button
                      className="btn btn-warning fw-bold w-100 btn mt-0 mt-md-2 py-2 py-md-3 position-relative"
                      onClick={(e) => handleFormSubmit(e)}
                    >
                      Book Today &nbsp;
                      <img
                        src="/hand.png"
                        alt="cursor"
                        class="img-fluid mypp"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimpleReactLightbox>
  );
}
export default MyApp;
