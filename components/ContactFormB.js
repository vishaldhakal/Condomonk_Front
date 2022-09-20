import { useState } from "react";
import ContactFormSubmit from "./ContactFormSubmit";

export default function ContactFormB() {
  const [submitbtn, setSubmitbtn] = useState("Contact now");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    project_namee: " ",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    ContactFormSubmit(credentials, setSubmitbtn, setCredentials);
  };
  return (
    <form onSubmit={(e) => handleFormSubmit(e)} method="POST" className="mb-3">
      <div className="row">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            id="name"
            className="fields"
            value={credentials.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2">
        <div className="col">
          <div className="mb-3 form-floating">
            <input
              type="email"
              aria-describedby="emailHelp"
              placeholder="Your email"
              name="email"
              id="email"
              className="fields"
              value={credentials.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              name="phone"
              id="phone"
              className="fields"
              value={credentials.phone}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="mb-3">
          <textarea
            name="message"
            id="message"
            placeholder="Enter your message"
            className="fields mess"
            rows="5"
            value={credentials.message}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <p className="small-text2 mb-0">
            By submitting above form you are opting in to receive updates,
            follow ups, and marketing contents. We may share your info to our
            partner licensed realtors, builders or brokerages to help you with
            your questions. You can unsubscribe at any time by emailing us.
          </p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col text-center">
          <input
            value={submitbtn}
            type="submit"
            className="btn btn-primary btn-lg"
          ></input>
        </div>
      </div>
    </form>
  );
}
