import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

let baseUrl = "https://api.condomonk.ca";
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Home() {
  let route = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      route.push("/admin/login");
    }
  }, []);

  const [pageIndex, setPageIndex] = useState(1);
  const [filters, setFilters] = useState({
    city: "All",
    status: "All",
    typee: "All",
  });

  const { data } = useSWR(
    `${baseUrl}/api/pre-constructions/?page=${pageIndex}&city=${filters.city}&status=${filters.status}&typee=${filters.typee}`,
    fetcher
  );
  function checkPrev() {
    if (pageIndex === 1) {
      return false;
    }
    return true;
  }
  function checkNext() {
    if (data && pageIndex === data.data.totalPages) {
      return false;
    }
    return true;
  }
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  return (
    <>
      <Head>
        <title>Edit Pre Constructions</title>
      </Head>
      <Navbar></Navbar>
      <div className="row row-cols-1 g-0">
        <div className="col col-12">
          <div className="py-4 bg-light w-100 hei3">
            <div className="row row-cols-1 row-cols-md-5 px-4 d-flex align-items-center mx-0">
              <div className="col-md-2">
                <label htmlFor="city" className="fw-bold mb-2">
                  Select City
                </label>
                <select
                  className="form-select"
                  id="city"
                  value={filters.city}
                  onChange={(e) => handleChange(e)}
                  aria-label="Floating label select example"
                >
                  <option value="All">All</option>
                  <option value="Toronto">Toronto</option>
                  <option value="Hamilton">Hamilton</option>
                  <option value="Guelph">Guelph</option>
                  <option value="London">London</option>
                  <option value="Welland">Welland</option>
                  <option value="Collingwood">Collingwood</option>
                  <option value="Whitby">Whitby</option>
                  <option value="Caledon">Caledon</option>
                  <option value="Bradford">Bradford</option>
                  <option value="Barrie">Barrie</option>
                  <option value="Mississauga">Mississauga</option>
                  <option value="Brampton">Brampton</option>
                  <option value="Ajax">Ajax</option>
                  <option value="Georgetown">Georgetown</option>
                  <option value="Oakville">Oakville</option>
                  <option value="Milton">Milton</option>
                  <option value="Burlington">Burlington</option>
                  <option value="Vaughan">Vaughan</option>
                  <option value="Markham">Markham</option>
                  <option value="Waterloo">Waterloo</option>
                  <option value="Cambridge">Cambridge</option>
                  <option value="Kitchener">Kitchener</option>
                  <option value="Ottawa">Ottawa</option>
                  <option value="Oshawa">Oshawa</option>
                  <option value="Calgary">Calgary</option>
                  <option value="Grimsby">Grimsby</option>
                  <option value="Thorold">Thorold</option>
                  <option value="Innisfil">Innisfil</option>
                  <option value="Aurora">Aurora</option>
                  <option value="Vancouver">Vancouver</option>
                  <option value="Burnaby">Burnaby</option>
                  <option value="Surrey">Surrey</option>
                  <option value="Richmond">Richmond</option>
                  <option value="Pickering">Pickering</option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="typee" className="fw-bold mb-2">
                  Select Project Type
                </label>
                <select
                  className="form-select"
                  id="typee"
                  value={filters.typee}
                  onChange={(e) => handleChange(e)}
                  aria-label="Floating label select example"
                >
                  <option value="All">All</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhome">Townhome</option>
                  <option value="Detached">Detached</option>
                  <option value="Semi-Detached">Semi-Detached</option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="status" className="fw-bold mb-2">
                  Select Status
                </label>
                <select
                  className="form-select"
                  id="status"
                  value={filters.status}
                  onChange={(e) => handleChange(e)}
                  aria-label="Floating label select example"
                >
                  <option value="All">All</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Selling">Selling</option>
                  <option value="Sold out">Sold out</option>
                </select>
              </div>
              <div className="col-md-6 d-flex justify-content-end">
                <Link href="/admin/data/">
                  <a className="btn btn-success py-3">
                    Add New Preconstruction
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between pt-5 container-fluid px-md-4">
            <div>
              <h5 className="fw-bold">
                <span className="text-danger">
                  {" "}
                  {data && data.data.totalCount}
                </span>{" "}
                Preconstructions Matches Your Filter |{" "}
                {data && data.data.totalPages} Pages
              </h5>
            </div>
            <div>
              {checkPrev() && (
                <button
                  className="btn btn-lg btn-light me-4"
                  onClick={() => setPageIndex(pageIndex - 1)}
                >
                  Previous Page
                </button>
              )}
              {checkNext() && (
                <button
                  className="btn btn-lg btn-mine4"
                  onClick={() => setPageIndex(pageIndex + 1)}
                >
                  Next Page
                </button>
              )}
            </div>
          </div>
          <div className="main py-5 mb-5">
            <div className="container-fluid px-md-4">
              <table className="table table-striped table-responsive">
                <thead>
                  <tr className="bg-dark text-light">
                    <th scope="col" className="fw-normal">
                      S.N
                    </th>
                    <th scope="col" className="fw-normal">
                      Name
                    </th>
                    <th scope="col" className="fw-normal">
                      City
                    </th>
                    <th scope="col" className="fw-normal">
                      Project Type
                    </th>
                    <th scope="col" className="fw-normal">
                      Status
                    </th>
                    <th scope="col" className="fw-normal">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.data.results.map((post, index) => (
                      <tr key={post.slug}>
                        <th scope="row" className="py-4">
                          {index + 1}
                        </th>
                        <td className="py-4">{post.project_name}</td>
                        <td className="py-4">{post.city.name}</td>
                        <td className="py-4">{post.project_type}</td>
                        <td className="py-4">{post.status}</td>
                        <td className="py-4">
                          <div className="d-flex justify-content-start">
                            <Link href={`/admin/data/${post.id}`}>
                              <a
                                target="_blank"
                                className="btn btn-sm btn-mine3 me-3"
                              >
                                Edit Data
                              </a>
                            </Link>
                            <Link href={`/admin/plan/${post.id}`}>
                              <a
                                target="_blank"
                                className="btn btn-sm btn-mine3 me-3"
                              >
                                Add | Edit Images
                              </a>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 my-5"></div>

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
