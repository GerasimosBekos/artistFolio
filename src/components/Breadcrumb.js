import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";
import { useLanguage } from "../contexts/LanguageContext";

const Breadcrumb = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { t } = useLanguage();

  useEffect(() => {
    const titleMapping = {}
    // Dynamically add all categories from translations
    // This gets ALL keys from t.categories except the main pages
    Object.keys(t.categories).forEach((key) => {
      titleMapping[key] = t.categories[key];
    });

    const pathnames = location.pathname.split("/").filter((x) => x);
    const crumbs = pathnames.map((segment, index) => {
      const path = "/" + pathnames.slice(0, index + 1).join("/");
      return {
        name: titleMapping[segment] || segment,
        path,
      };
    });
    setBreadcrumbs(crumbs);
  }, [location, t]);

  return (
    <nav className="breadcrumb">
      <Link to="/">{t.categories.main}</Link>
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.path}>
          {" › "}
          {index === breadcrumbs.length - 1 ? (
            <span className="breadcrumb-current">{crumb.name}</span>
          ) : (
            <Link to={crumb.path}>{crumb.name}</Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;