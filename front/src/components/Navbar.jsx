import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css"

export default ({ user, onLogout }) => (
  <section id="nav-bar">
    <nav className="navbar navbar-light pt-2 " >
      <a className="navbar-brand" href="/">
        <img src="images/logo/Endava_Logo_Rojo.svg" />
      </a>
      {(user.name) ? (
        <>
          <button onClick={onLogout} type="button" class="btn btn-light btnout"><i class="fa fa-sign-out-alt"></i>Log Out</button>
          <div className="dropdown" id="admin-btn" >
            <button className="btn dropdown-toggle btnout" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-user1"></i>{user.name}
            </button>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <>
                {(user.isAdmin) ? (
                  <>
                    <Link to="/home" className="dropdown-item" href="#">Home</Link>
                    <Link to={`/myTasks/${user.id}`} className="dropdown-item" href="#">Tasks</Link>
                    <Link to="/recruits" className="dropdown-item" href="#">New hires</Link>
                    <Link to="/" className="dropdown-item" href="#">Dashboard</Link>
                    <Link to="/users" className="dropdown-item" href="#">Users</Link>
                  </>
                ) : (
                    <>
                      <Link to="/home" className="dropdown-item" href="#">Home</Link>
                      <Link to={`/myTasks/${user.id}`} className="dropdown-item" href="#">My Tasks</Link>
                      <Link to="/" className="dropdown-item" href="#"> My Dashboard</Link>
                    </>
                  )}
              </>
            </div>
          </div>
        </>
      ) : (
          <>
            <div>
              <Link to="/register"><button type="button" class="btn btn-light"> <i class="fa fa-user-plus"></i>Sign Up</button></Link>
              <Link style={{ marginLeft: "10px" }} to="/login"><button type="button" class="btn btn-light"> <i className="fa fa-sign-in-alt"></i> Sign In</button></Link>
            </div>
          </>
        )}
    </nav>
  </section>
);
