import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Categorycard.module.css";

export default function Categorycard(props) {
  function clearstr(mystr) {
    let str2 = mystr.split("-");
    let str3 = "";
    for (let i = 0; i < str2.length; i++) {
      str3 += " " + str2[i].charAt(0).toUpperCase() + str2[i].slice(1);
    }
    return str3;
  }
  return (
    <Link href={"/blog/category/" + props.categorydata.name}>
      <a className="col">
        <div className={"border-0 " + styles.card_wrapper}>
          <Image
            src={"https://api.condomonk.ca" + props.categorydata.cat_img}
            className={"img-fluid rounded-lg card-img-top" + styles.imagee}
            alt="..."
            height={500}
            width={800}
            layout="responsive"
            objectFit="cover"
            objectPosition="center"
          />
          <div className={styles.over}></div>
          <span className={"btn btn-sm btn-light " + styles.mytext}>
            {clearstr(props.categorydata.name)}
          </span>
        </div>
      </a>
    </Link>
  );
}
