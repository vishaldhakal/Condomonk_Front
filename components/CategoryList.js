import Link from "./ActiveLink";

export default function CategoryList(props) {
  function clearstr(mystr) {
    let str2 = mystr.split("-");
    let str3 = "";
    for (let i = 0; i < str2.length; i++) {
      str3 += " " + str2[i].charAt(0).toUpperCase() + str2[i].slice(1);
    }
    return str3;
  }
  return (
    <>
      <div className="d-flex justify-content-start">
        {props.catlist.map((catt) => (
          <Link
            href={"/blog/category/" + catt.name}
            activeSubClassname=""
            activeClassName="myactive"
            scroll={false}
          >
            <a className="btn-sm shadow-sm me-4 border-bottom catbtn">
              {clearstr(catt.name)}
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}
