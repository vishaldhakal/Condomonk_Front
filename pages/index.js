import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import ContactFormB from "../components/ContactFormB";
import CreateSchema from "../components/CreateSchema";
const ListingCard = dynamic(() => import("../components/ListingCard"), {
  loading: () => <p>Loading...</p>,
});
export default function Home(props) {
  const [showLeftScroll, setshowLeftScroll] = useState(false);

  function rightScrollClick() {
    let scrollDiv = document.querySelector(".main-cont");
    scrollDiv.scroll({
      left: (scrollDiv.scrollLeft += 150),
      top: 0,
      behavior: "smooth",
    });
    if (scrollDiv.scrollLeft != 0) {
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

  return (
    <>
      <Head>
        <meta name="Author" content="Homebaba"></meta>
        <meta name="Email" content="info@homebaba.ca"></meta>
        <title>
          Homebaba | Pre-Construction Homes in and around GTA, Canada.
        </title>
        <meta
          name="Description"
          content="Looking for Pre-Construction's near Greater Toronto Area, Canada? From Townhomes to Detached and Condos Homebaba offer early access to all best pre-construction's available."
        ></meta>
        <link rel="canonical" href="https://homebaba.ca/" />

        <meta property="og:type" content="og:website" />
        <meta
          property="og:title"
          content="Homebaba | Pre-Construction Homes in and around GTA, Canada."
        />
        <meta
          property="og:description"
          content="Looking for Pre-Construction's near Greater Toronto Area, Canada? From Townhomes to Detached and Condos Homebaba offer early access to all best Pre-Construction's available."
        />
        <meta property="og:image" content="/agentm.jpg" />
        <meta property="og:url" content="https://homebaba.ca/" />
        <meta property="og:site_name" content="Homebaba" />
      </Head>
      <Navbar></Navbar>
      <div className="d-flex justify-content-start align-items-center bg-mine flex-direction-column position-relative">
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
        <div className="main-cont p-3 d-flex overflow-scroll">
          <Link href="/toronto">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Toronto</a>
          </Link>
          <Link href="/aurora">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Aurora</a>
          </Link>
          <Link href="/barrie">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Barrie</a>
          </Link>
          <Link href="/hamilton">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Hamilton</a>
          </Link>
          <Link href="/calgary" activeClassName="car-item-active">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Calgary</a>
          </Link>
          <Link href="/ottawa" activeClassName="car-item-active">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Ottawa</a>
          </Link>
          <Link href="/innisfil">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Innisfil</a>
          </Link>
          <Link href="/niagara" activeClassName="car-item-active">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Niagara</a>
          </Link>
          <Link href="/thorold" activeClassName="car-item-active">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Thorold</a>
          </Link>
          <Link href="/grimsby" activeClassName="car-item-active">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Grimsby</a>
          </Link>
          <Link href="/brampton">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Brampton</a>
          </Link>
          <Link href="/oshawa">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Oshawa</a>
          </Link>
          <Link href="/georgetown" activeClassName="car-item-active">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Georgetown</a>
          </Link>
          <Link href="/ajax" activeClassName="car-item-active">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Ajax</a>
          </Link>
          <Link href="/mississauga">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">
              Mississauga
            </a>
          </Link>
          <Link href="/milton">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Milton</a>
          </Link>
          <Link href="/burlington">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Burlington</a>
          </Link>
          <Link href="/vaughan">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Vaughan</a>
          </Link>
          <Link href="/markham">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Markham</a>
          </Link>
          <Link href="/oakville">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Oakville</a>
          </Link>
          <Link href="/waterloo">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Waterloo</a>
          </Link>
          <Link href="/cambridge">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Cambridge</a>
          </Link>
          <Link href="/kitchener">
            <a className="car-item p-3 px-3 px-md-3 px-lg-4 mx-2">Kitchener</a>
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
      </div>
      <div className="main pt-3 pt-md-4">
        <div className="container-fluid px-md-4">
          <div className="d-flex justify-content-between align-items-center  pb-md-4">
            <div>
              <h2 className="text-start homet ps-2">
                Upcoming Pre-Construction homes for sale in Ontario & Assignment
                sales ( <i className="text-danger">VIP Access*</i> )
              </h2>
            </div>
            <Link href="/ontario-pre-construction-sales-and-assignment-sale">
              <a className="btn btn-mine3 d-none d-sm-block">View All</a>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 gx-2 gx-md-4 gy-md-5 mx-0">
            {props.postss4 &&
              props.postss4.map((post) => (
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
        </div>
        <div className="py-5"></div>
        <div className="container-fluid px-md-4">
          <div className="d-flex justify-content-between align-items-center  pb-md-4">
            <div>
              <h2 className="text-start homet ps-2">
                15 top upcoming projects in Mississauga you need to see
              </h2>
            </div>
            <Link href="/mississauga">
              <a className="btn btn-mine3 d-none d-sm-block">View All</a>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 gx-2 gx-md-4 gy-md-5 mx-0">
            {props.posts &&
              props.posts.map((post) => (
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
        </div>
        <div className="py-5">
          <div className="py-5">
            <img
              src="/inbetweeen.png"
              alt="your top choice Pre-construction Homes Marketplace in Canada"
              className="img-fluid inbetween-img"
            />
          </div>
        </div>
        <div className="container-fluid px-md-4">
          <div className="d-flex justify-content-between align-items-center pb-4">
            <div>
              <h2 className="text-start homet">
                10 Highly Convinent Projects in Toronto to Watch out
              </h2>
            </div>
            <Link href="/toronto">
              <a className="btn btn-mine3 d-none d-sm-block">View All</a>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 gx-2 gx-md-4 gy-md-5 mx-0">
            {props.posts2 &&
              props.posts2.map((post) => (
                <div className="col" key={post.slug}>
                  <ListingCard
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
        </div>
        <div className="py-5">
          <div className="py-5">
            <img
              src="/circle.png"
              alt="Our amazing partner brokerage and Preconstruction specialists              "
              className="img-fluid inbetween-img2"
            />
          </div>
        </div>
        <div className="container-fluid px-md-4">
          <div className="d-flex justify-content-between align-items-center pb-4">
            <div>
              <h2 className="text-start homet">
                10 Transit Friendly Projects in Oakville to Live
              </h2>
            </div>
            <Link href="/oakville">
              <a className="btn btn-mine3 d-none d-sm-block">View All</a>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 gx-2 gx-md-4 gy-md-5 mx-0">
            {props.posts3 &&
              props.posts3.map((post) => (
                <div className="col" key={post.slug}>
                  <ListingCard
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
        </div>
        <div className="py-5"></div>
      </div>
      <div className="py-5 my-5">
        <div className="container">
          <div className="row justify-content-center">
            <img
              src="/contact-bottom-2.png"
              alt="dce"
              className="img-fluid w-25 w-smm-50 mb-3"
            />
          </div>
          <h2 className="fw-bolder fw-boldie text-center px-md-4 fs-3">
            Are you looking to buy a preconstruction home for the first time ?
          </h2>
          <h2 className="fw-mine text-center px-md-4 fs-4">
            Don't know where to start ? Contact Homebaba now!
          </h2>
          <div className="row row-cols-1 row-cols-md-3 mt-5">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <ContactFormB></ContactFormB>
            </div>
            <div className="col-md-3"></div>
          </div>
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

export async function getStaticProps() {
  const posts4 = await axios.get(
    `https://api.condomonk.ca/api/pre-constructions-city/ontario-pre-construction-sales-and-assignment-sale/?perpage=5`
  );
  const posts = await axios.get(
    `https://api.condomonk.ca/api/pre-constructions-city/mississauga/?perpage=5`
  );
  const posts2 = await axios.get(
    `https://api.condomonk.ca/api/pre-constructions-city/toronto/?perpage=5`
  );
  const posts3 = await axios.get(
    `https://api.condomonk.ca/api/pre-constructions-city/oakville/?perpage=5`
  );
  return {
    props: {
      totalCount: posts.data.data.totalCount,
      pageCount: posts.data.data.totalPages,
      perPage: posts.data.data.dataPerpage,
      posts: posts.data.data.results,
      totalCount2: posts2.data.data.totalCount,
      pageCount2: posts2.data.data.totalPages,
      perPage2: posts2.data.data.dataPerpage,
      posts2: posts2.data.data.results,
      totalCount3: posts3.data.data.totalCount,
      pageCount3: posts3.data.data.totalPages,
      perPage3: posts3.data.data.dataPerpage,
      posts3: posts3.data.data.results,
      totalCount4: posts4.data.data.totalCount,
      pageCount4: posts4.data.data.totalPages,
      perPage4: posts4.data.data.dataPerpage,
      postss4: posts4.data.data.results,
    },
    revalidate: 10,
  };
}
