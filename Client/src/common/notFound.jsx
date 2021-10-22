import React from "react";
import NavBar from "./navbar";
import Footer from "./footer";

import page_not_found from "../images/Home/page_not_found.jpg";

function NotFound() {
  return (
    <React.Fragment>
      <NavBar />

      <div>
        <img src={page_not_found} alt="page_not_found" />
      </div>

      <Footer />
    </React.Fragment>
  );
}

export default NotFound;
