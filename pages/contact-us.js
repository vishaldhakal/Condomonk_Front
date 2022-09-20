import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Head from "next/head";
import ContactFormB from "../components/ContactFormB";

export default function Contact() {
  return (
    <>
      <Head>
        <meta name="Author" content="Homebaba"></meta>
        <meta name="Email" content="info@homebaba.ca"></meta>
        <title>Contact Homebaba - We love to hear from you</title>
        <meta
          name="Description"
          content="Contact Homebaba Now | We'd love to hear from you! Don't hesitate to contact us with any questions or feedback. Pre construction questions? Ask us now!"
        ></meta>
        <link rel="canonical" href="https://homebaba.ca/contact-us" />

        <meta property="og:type" content="og:website" />
        <meta
          property="og:title"
          content="Contact Homebaba - We love to hear from you"
        />
        <meta
          property="og:description"
          content="Contact Homebaba Now | We'd love to hear from you! Don't hesitate to contact us with any questions or feedback. Pre construction questions? Ask us now!"
        />
        <meta property="og:image" content="https://homebaba.ca/contact.png" />
        <meta property="og:url" content="https://homebaba.ca/contact-us" />
        <meta property="og:site_name" content="Homebaba" />
      </Head>
      <Navbar></Navbar>
      <div className="pb-md-5 mb-5"></div>
      <div className="container">
        <div className="contact_part py-5 my-5">
          <div className="row justify-content-center">
            <img
              src="/contact-bottom-2.png"
              alt="dce"
              className="img-fluid w-25 w-smm-50 mb-3"
            />
            <h4 className="text-center fs-5 fs-md-4 fw-bold">
              Have any Questions ?
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
      <div className="py-5 my-4"></div>
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
