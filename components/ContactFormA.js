import { useState } from "react";
import ContactFormSubmit from "./ContactFormSubmit";
import { useRouter } from "next/router";

export default function ContactFormA(props) {
  const [submitbtn, setSubmitbtn] = useState("Contact now");
  const route = useRouter();
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    message: props.defaultmessage,
    project_namee: route.query.listing_id,
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
    console.log(credentials);
    ContactFormSubmit(credentials, setSubmitbtn, setCredentials);
  };
  return (
    <form
      method="POST"
      className="mb-3"
      onSubmit={(e) => handleFormSubmit(e)}
      id="contactForm"
    >
      <div className="row me-0 row-cols-2 g-4 me-0">
        <div className="col mb-3">
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            value={credentials.name}
            onChange={(e) => handleChange(e)}
            className="fields fff"
          />
        </div>
        <div className="col">
          <div className="mb-3">
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              value={credentials.phone}
              onChange={(e) => handleChange(e)}
              className="fields fff"
            />
          </div>
        </div>
      </div>
      <div className="row me-0 row-cols-1">
        <div className="col">
          <div className="mb-3">
            <input
              type="email"
              aria-describedby="emailHelp"
              placeholder="Your email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={(e) => handleChange(e)}
              className="fields fff"
            />
          </div>
        </div>
      </div>
      <div className="row me-0">
        <div className="mb-3">
          <textarea
            id="message"
            name="message"
            className="fields fff mess"
            rows="3"
            cols="50"
            value={credentials.message}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
      </div>
      <input
        type="submit"
        value={submitbtn}
        className="btn btn-call btn-lg w-100 mb-3"
        id="subbtn"
      />
      <div className="d-flex">
        <p className="small-text2 mb-0">
          By submitting above form you are opting in to receive updates, follow
          ups, and marketing contents. We may share your info to our partner
          licensed realtors, builders or brokerages to help you with your
          questions. You can unsubscribe at any time by emailing us.
        </p>
      </div>
    </form>
  );
}
