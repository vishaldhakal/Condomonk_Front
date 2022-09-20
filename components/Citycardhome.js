import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Categorycard.module.css";

export default function Citycardhome(props) {
  return (
    <Link href={"/" + props.cityname.toLowerCase()}>
      <a className="col hoverr">
        <div className={"border-0 " + styles.card_wrapper}>
          <Image
            src="/houses/4.webp"
            className={"img-fluid rounded-lg card-img-top" + styles.imagee}
            alt="..."
            height={500}
            width={800}
            layout="responsive"
            objectFit="cover"
            objectPosition="center"
          />
          <div className={styles.over}></div>
          <button
            className={"btn btn-sm btn-light small-text-mine " + styles.mytext}
          >
            {props.cityname}
          </button>
        </div>
      </a>
    </Link>
  );
}
