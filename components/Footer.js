import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="footerr bg-white">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5">
            <div className="col-md-4 my-3">
              <a className="navbar-brand bottomlogo" href="/">
                homebaba
                <span>
                  <img
                    src="/canadaleaf.svg"
                    alt="canada mapel leaf"
                    className="img-fluid leaf-img2 ms-1"
                  />
                </span>
              </a>
              <p className="bottex mt-3 justifyy">
                Homebaba is the online Database for new Pre construction
                detached, semi-detached, townhomes and condos in Canada.
                Homebaba does not represent any builder. The content of the
                pages of this website is for your general information, reference
                only. We are not liable for the use or misuse of the site's
                information. Prices, sizes, specifications, and promotions of
                the condos are subject to change by the builder without notice.
                E&OE
              </p>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3 my-3">
              <h5 className="text-dark fw-bold">Popular Cities</h5>
              <div className="row row-cols-2">
                <Link href="/toronto">
                  <a className="mybot">Toronto</a>
                </Link>
                <Link href="/aurora">
                  <a className="mybot">Aurora</a>
                </Link>
                <Link href="/barrie">
                  <a className="mybot">Barrie</a>
                </Link>
                <Link href="/hamilton">
                  <a className="mybot">Hamilton</a>
                </Link>
                <Link href="/calgary">
                  <a className="mybot">Calgary</a>
                </Link>
                <Link href="/ottawa">
                  <a className="mybot">Ottawa</a>
                </Link>
                <Link href="/innisfil">
                  <a className="mybot">Innisfil</a>
                </Link>
                <Link href="/niagara">
                  <a className="mybot">Niagara</a>
                </Link>
                <Link href="/thorold">
                  <a className="mybot">Thorold</a>
                </Link>
                <Link href="/grimsby">
                  <a className="mybot">Grimsby</a>
                </Link>
                <Link href="/brampton">
                  <a className="mybot">Brampton</a>
                </Link>
                <Link href="/oshawa">
                  <a className="mybot">Oshawa</a>
                </Link>
                <Link href="/georgetown">
                  <a className="mybot">Georgetown</a>
                </Link>
                <Link href="/ajax">
                  <a className="mybot">Ajax</a>
                </Link>
                <Link href="/mississauga">
                  <a className="mybot">Mississauga</a>
                </Link>
                <Link href="/milton">
                  <a className="mybot">Milton</a>
                </Link>
                <Link href="/burlington">
                  <a className="mybot">Burlington</a>
                </Link>
                <Link href="/vaughan">
                  <a className="mybot">Vaughan</a>
                </Link>
                <Link href="/markham">
                  <a className="mybot">Markham</a>
                </Link>
                <Link href="/oakville">
                  <a className="mybot">Oakville</a>
                </Link>
                <Link href="/waterloo">
                  <a className="mybot">Waterloo</a>
                </Link>
                <Link href="/cambridge">
                  <a className="mybot">Cambridge</a>
                </Link>
                <Link href="/kitchener">
                  <a className="mybot">Kitchener</a>
                </Link>
              </div>
            </div>
            <div className="col-md-2 my-3">
              <h5 className="text-dark fw-bold">Company</h5>
              <div className="list">
                <a href="#" className="mybot">
                  Work with us
                </a>
                <a href="#" className="mybot">
                  Blogs
                </a>
                <a href="#" className="mybot">
                  Contact us
                </a>
                <a href="#" className="mybot">
                  Privacy Policy
                </a>
              </div>
            </div>
            <div className="col-md-2 my-3">
              <h5 className="text-dark fw-bold">Partnership</h5>
              <div className="list">
                <a href="#" className="mybot">
                  Affiliate Program
                </a>
                <a href="#" className="mybot">
                  Marketing Plan
                </a>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-3 pt-5">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <div className="row row-cols-4">
                <div className="col">
                  <a
                    href="https://www.facebook.com/thehomebaba/"
                    className=" text-center"
                    target="_blank"
                  >
                    <img
                      loading="lazy"
                      src="/facebook.svg"
                      alt="Facebook Icon which links to homebaba facebook page"
                      className="img-fluid social-icon"
                    />
                  </a>
                </div>
                <div className="col">
                  <a
                    href="https://www.instagram.com/homebabaa/"
                    className=" text-center"
                    target="_blank"
                  >
                    <img
                      loading="lazy"
                      src="/instagram.svg"
                      alt="Instagram Icon which links to homebaba instagram page"
                      className="img-fluid social-icon"
                    />
                  </a>
                </div>
                <div className="col">
                  <a
                    href="https://www.linkedin.com/company/homebaba/about/?viewAsMember=true"
                    className=" text-center"
                  >
                    <img
                      loading="lazy"
                      src="/linkedin.svg"
                      alt="Linked Icon which links to homebaba linkedin page"
                      className="img-fluid social-icon"
                    />
                  </a>
                </div>
                <div className="col">
                  <a
                    href="https://twitter.com/homebabaa"
                    className=" text-center"
                  >
                    <img
                      loading="lazy"
                      src="/twitter.png"
                      alt="Twitter Icon which links to homebaba twitter page"
                      className="img-fluid social-icon"
                    />
                  </a>
                </div>
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
              </div>
            </div>
            <div className="col-sm-4"></div>
          </div>
          <div className="row text-center mt-3 px-3 pb-5">
            <p>&copy;2021 Homebaba</p>
          </div>
        </div>
      </footer>
    </>
  );
}
