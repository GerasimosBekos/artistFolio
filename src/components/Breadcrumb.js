import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

const titleMapping = {
  "": "Αρχική",
  "gallery": "Δημιουργίες",
  "about": "Το Εργαστήρι",
  "contact": "Επικοινωνία",
  "templa": "Τέμπλα",
  "proskinitaria": "Προσκυνητάρια",
  "stasidia": "Στασίδια",
  "epitafioi": "Επιτάφιοι",
  "kornizes": "Κορνίζες",
  "stavroi": "Σταυροί",
  "pagkaria": "Παγκαρία",
};

const Breadcrumb = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const crumbs = pathnames.map((segment, index) => {
      const path = "/" + pathnames.slice(0, index + 1).join("/");
      return {
        name: titleMapping[segment] || segment,
        path,
      };
    });
    setBreadcrumbs(crumbs);
  }, [location]);

  return (
    <nav className="breadcrumb">
      <Link to="/">Αρχική</Link>
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
