import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css"
import RegisterContainer from "../containers/RegisterContainer"

export default () => (
<section id="banner_white">
  <div className="container box_container">
    <div className="row">

      <div className="col-md-6" style={{backgroundColor:"#f0f3f3"}}>
        <RegisterContainer/>
      </div>

      <div className="col-md-6 text-center">
        <img src="images/design/register12.svg" className="img-fluid"/>
      </div>

    </div>
  </div>
</section>
);
