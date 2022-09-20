import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Login() {
  let route = useRouter();
  const [loginerror, setLoginerror] = useState(null);
  const [logedin, setLogedin] = useState(false);

  const [credentials, setcredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setcredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admintoken");
    setLogedin(false);
  };

  const handleSubmit = (e) => {
    if (
      credentials.username == "Vishal" &&
      credentials.password == "Superuserpassword"
    ) {
      localStorage.setItem("admintoken", "thisismyrandomtoken");
      setLoginerror("Sucessfully Logged in");
      setcredentials({
        username: "",
        password: "",
      });
      setLogedin(true);
      route.push("/admin");
    } else {
      setLoginerror("Username or Password Incorrect");
    }
    e.preventDefault();
  };

  useEffect(() => {
    if (localStorage.getItem("admintoken")) {
      setLogedin(true);
    } else {
      setLogedin(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Navbar></Navbar>

      <div className="py-5 my-5">
        <div className="d-flex align-items-center justify-content-between">
          {!logedin && (
            <section className="container col-12 col-sm-6 col-md-5 col-lg-4">
              {loginerror && (
                <div
                  className="alert alert-danger d-flex justify-content-between mb-5"
                  role="alert"
                >
                  {loginerror}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setLoginerror(null)}
                  ></button>
                </div>
              )}

              <div className="mb-5">
                <h5 className="text-center fw-bold fs-4">Admin Login</h5>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control bg-white"
                  id="username"
                  placeholder="Table1"
                  value={credentials.username}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="floatingInput">Username</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control bg-white"
                  id="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button
                className="btn bg-dark w-100 text-light p-2 mt-4"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </section>
          )}
          {logedin && (
            <section className="container col-12 col-sm-6 col-md-5 col-lg-4">
              <h5 className="mb-4 text-center">Loged in</h5>
              <button
                className="btn bg-dark w-100 text-light p-2 mt-4"
                onClick={(e) => handleLogout(e)}
              >
                Logout
              </button>
            </section>
          )}
        </div>
      </div>

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
