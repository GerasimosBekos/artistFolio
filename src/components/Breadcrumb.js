import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";
import { useLanguage } from "../contexts/LanguageContext"



const Breadcrumb = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const {t} = useLanguage();

  

  useEffect(() => {
    const titleMapping = {
      "": t.categories.main,
      "gallery": t.categories.gallery,
      "about": t.categories.about,
      "contact": t.categories.contact,
      "templa": t.categories.templa,
      "proskinitaria": t.categories.proskinitaria,
      "stasidia": t.categories.stasidia,
      "epitafioi": t.categories.epitafioi,
      "kornizes": t.categories.kornizes,
      "stavroi": t.categories.stavroi,
      "pagkaria": t.categories.pagkaria,
      "thronoi": t.categories.thronoi,
      "polithrones": t.categories.polithrones,
      "amvones": t.categories.amvones,
      "karekles": t.categories.karekles,
      "psaltiria": t.categories.psaltiria,
      "lipsanothikes": t.categories.lipsanothikes,
    };
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
