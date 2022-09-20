import Image from "next/image";
import Link from "next/link";
export default function BlogCard(props) {
  return (
    <div className="col">
      <div className="card border-0">
        <Link href={"/blog/" + props.elee.slug}>
          <a>
            <Image
              src={"https://api.condomonk.ca" + props.elee.thumbnail_image}
              className="img-fluid card-img-top rounded-mine"
              alt={props.elee.thumbnail_image_alt_description}
              width={800}
              height={500}
              objectFit="cover"
              objectPosition="center"
              layout="responsive"
            />
          </a>
        </Link>
        <div className="card-body bg-white rounded-mine">
          <div className="col-12 py-4 d-flex flex-column position-static">
            <div className="d-flex justify-content-between">
              <Link href={"/blog/category/" + props.elee.category.name}>
                <a className="mb-2 text-bluish btn btn-sm btn-outline-secondary">
                  {props.elee.category.name}
                </a>
              </Link>
            </div>
            <Link href={"/blog/" + props.elee.slug}>
              <a className="mb-3 mt-1 fs-5 fw-mine text-dark link2">
                {props.elee.title}
              </a>
            </Link>
            <div className="py-1 d-flex justify-content-start small-text text-secondary">
              <span>15 min read</span>
              <span className="mx-2">|</span>
              <span>March 20, 2020</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
