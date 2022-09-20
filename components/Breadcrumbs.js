import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const convertBreadcrumb = (string) => {
  var string2 = string
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü")
    .toLowerCase();

  return string2.charAt(0).toUpperCase() + string2.slice(1);
};

const Breadcrumbs = (props) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  function breadcrumbsret(bread) {
    const cont = (
      <ol className="breadcrumb m-0">
        {bread.map((breadcrumb, i) => {
          if (bread.length == i + 1) {
            return (
              <li key={breadcrumb.href}>
                <span className={"mx-1 mylinkkact " + props.textcol}>
                  {convertBreadcrumb(breadcrumb.breadcrumb)}
                </span>
              </li>
            );
          } else {
            return (
              <li key={breadcrumb.href}>
                <Link href={breadcrumb.href}>
                  <a className={"mx-1 mylinkk " + props.textcol}>
                    {convertBreadcrumb(breadcrumb.breadcrumb)}
                  </a>
                </Link>
                <span>
                  <svg
                    className="svg minearr"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.65 16.513l-7.147-7.055 1.868-1.893 9.068 8.951-9.069 8.927-1.866-1.896z"
                      fill={(props.textcol && "#ffffff") || "#869099"}
                    ></path>
                  </svg>
                </span>
              </li>
            );
          }
        })}
      </ol>
    );
    return cont;
  }

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return <nav aria-label="breadcrumb">{breadcrumbsret(breadcrumbs)}</nav>;
};

export default Breadcrumbs;
