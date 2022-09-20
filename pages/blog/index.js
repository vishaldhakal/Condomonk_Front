import Navbar from "../../components/Navbar";
import Categorycard from "../../components/Categorycard";
import BlogCard from "../../components/BlogCard";
import Footer from "../../components/Footer";
import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumbs";
import CategoryList from "../../components/CategoryList";
import Head from "next/head";

export default function Page({ data, catdata }) {
  return (
    <>
      <Head>
        <title>Homebaba Blogs | Real Estate Insights</title>
        <meta name="Author" content="Homebaba"></meta>
        <meta name="Email" content="info@homebaba.ca"></meta>
        <meta
          name="Description"
          content="Homebaba Insights is a blog for all new construction homes. We provide knowledge on industry news and trends, real estate tech, and many more."
        ></meta>
        <link rel="canonical" href="https://homebaba.ca/blog" />
        <meta name="robots" content="index, follow"></meta>
        <meta property="og:type" content="og:website" />
        <meta
          property="og:title"
          content="Homebaba Blogs | Real Estate Insights"
        />
        <meta
          property="og:description"
          content="Homebaba Insights is a blog for all new construction homes. We provide knowledge on industry news and trends, real estate tech, and many more."
        />
        <meta property="og:image" content="/blogback.jpg" />
        <meta property="og:url" content="https://homebaba.ca/blog" />
        <meta property="og:site_name" content="Homebaba" />
      </Head>
      <Navbar borderrr="shadow-mine aa" />
      <div className="bg-white">
        <div className="py-5 mb-4 bg-light backk rounded-3 position-relative">
          <Image
            src="/blogback.jpg"
            alt="..."
            className="backkimg"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          ></Image>
          <div className="container py-4 py-sm-5  col text-white cob2 position-relative">
            <h1 className="fw-bold cob position-relative fssss">
              Homebaba Blogs
            </h1>
            <Breadcrumb textcol="text-white" />
          </div>
        </div>
        <div className="container mt-2">
          <main>
            <div className="py-4">
              <CategoryList catlist={catdata} />
            </div>
            <div className="py-2"></div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {data.results.map((ele) => (
                <div key={ele.slug} className="col">
                  <BlogCard elee={ele} />
                </div>
              ))}
            </div>
            <div className="my-5"></div>
            <div className="my-5"></div>
            {/* <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a
                    className="page-link no-border"
                    href="#"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link  no-border" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link  no-border" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link  no-border" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link  no-border"
                    href="#"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav> */}
            <div className="my-5 py-3"></div>
            <div className="row row-cols-1 row-cols-md-2">
              <div className="col-md-12">
                <div className="row row-cols-1 row-cols-sm-2">
                  <div className="col-sm-10">
                    <h2 className="main-title fw-bold">
                      Explore <u className="bordbot">Categories</u>
                    </h2>
                    <p className="main-suntitle">
                      Learn about the Toronto housing market through trends and
                      averages.
                    </p>
                  </div>
                </div>
                <div className="py-2"></div>
                <div className="py-2"></div>
                <div className="row row-cols-2 row-cols-md-4 g-4">
                  {catdata.map((catt) => (
                    <Categorycard categorydata={catt} key={catt.name} />
                  ))}
                </div>
              </div>
            </div>
            <div className="py-4"></div>
          </main>

          <div className="py-4"></div>
          <div className="py-4"></div>
        </div>
        <div className="py-4"></div>
      </div>
      <div className="bg-white">
        <Image
          src="/line.png"
          alt="Line image"
          height="4"
          width="100"
          layout="responsive"
          className="img-fluid foot-up-img"
        />
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const req = await fetch("https://api.condomonk.ca/api/posts");
  const res = await req.json();
  return {
    props: {
      data: res.data,
      catdata: res.categories,
    },
    revalidate: 1,
  };
}
