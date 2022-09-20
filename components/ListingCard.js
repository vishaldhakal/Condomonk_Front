import Link from "next/link";
import nFormatter from "./nFormatter";

export default function ListingCard(props) {
  function checkPricing(prii) {
    if (parseInt(prii) == 0) {
      return `Price coming soon`;
    } else {
      return `Starting from low $${nFormatter(prii, 2)}`;
    }
  }

  return (
    <>
      <div className="card border-0 shadow-sm rounded-mine my-3 my-md-0">
        {/* <button
          className="fav-btn btn mmm"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Add to Favourites"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none">
              <path
                d="M26.95 11.863a5.193 5.193 0 0 1-1.53 3.69l-1.913 1.912-7.373 7.373-7.371-7.373-1.912-1.912a5.214 5.214 0 1 1 7.377-7.366l1.906 1.907 1.908-1.908a5.214 5.214 0 0 1 8.908 3.677z"
                fillOpacity=".4"
                fill="#000"
              ></path>
              <path
                d="M26.95 11.863a5.214 5.214 0 0 0-8.908-3.677l-1.908 1.908-1.906-1.908a5.214 5.214 0 1 0-7.377 7.366l1.912 1.913 7.371 7.373 7.373-7.373 1.912-1.912a5.193 5.193 0 0 0 1.53-3.69zM16.157 6.31A7.874 7.874 0 1 1 27.3 17.433l-1.913 1.913-9.254 9.254-1.88-1.88-7.373-7.374-1.91-1.91a7.874 7.874 0 1 1 11.137-11.13l.027.025.022-.022z"
                fill="#FFF"
              ></path>
            </g>
          </svg>
        </button> */}
        <div className="position-relative is-loading">
          <Link href={`/${props.city_name.toLowerCase()}/${props.url_slug}`}>
            <a className="mylinkk" target="_blank">
              {props.img_url1 && (
                <img
                  loading="lazy"
                  src={
                    "https://api.condomonk.ca" + props.img_url1.split(",")[0]
                  }
                  layout="responsive"
                  className="img-fluid rounded-minet image"
                  alt={`${props.name} located at ${props.street} image`}
                />
              )}
              {!props.img_url1 && (
                <img
                  loading="lazy"
                  src="/noimage.webp"
                  className="img-fluid rounded-minet image"
                  alt={"no image available for " + props.name}
                />
              )}
            </a>
          </Link>
          <span className="mmmmm p-1 px-2">{props.status}</span>
          <span className="mmmmmb glassuides shadow-lg p-1 px-2">
            {props.main_feature}
          </span>
        </div>
        <Link href={`/${props.city_name.toLowerCase()}/${props.url_slug}`}>
          <a
            className="card-body text-decoration-none bg-white shadow-lgg rounded-mineb"
            target="_blank"
          >
            <div className="thumb_content">
              <h3 className="mb-1 fs-4">
                {props.num && props.num + ". "}
                {props.name}
              </h3>
              <h4 className="fs-3 mb-2">{checkPricing(props.price)}</h4>
              <h5 className="fs-mine text-limit">{props.street}</h5>
              <p className="card-subtitle pt-1 fs-mine text-limit">
                Move in {props.ready_date}
              </p>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
}
