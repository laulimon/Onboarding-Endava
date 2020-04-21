import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css"
import LandingCards from "./LandingCards"
import Footer from "./Footer"
import NavbarContainer from "../containers/NavbarContainer"

export default () => (
  <>
    <NavbarContainer />
    <section id="banner" style={{ backgroundColor: "#fff" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="banner-tittle">WELCOME ON BOARD!</p>
            <p>ACCESS THIS APP TO MANAGE ALL YOUR NEW HIRES, ASIGN THEM TASKS AND ORGANICE THEIR ONBOARDING PROCESS </p>
            <Link to="/register" ><img src="images/welcome/3.png" className="welcome-btn" />LOGIN OR REGISTER</Link>
          </div>
          <div className="col-md-6 text-center">
            <img src="images/welcome/1/illustration-1.png" className="img-fluid" />
          </div>
        </div>
      </div>
      <LandingCards />
      <Footer />
    </section>
  </>
);
