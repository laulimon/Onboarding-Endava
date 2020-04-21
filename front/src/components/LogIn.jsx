import React from "react";
import "../css/style.css"
import { Link } from "react-router-dom";

export default ({ handleSubmit, handleChange, state }) => (

    <div className="form-container">
        <div className="card-body mx-auto allform">
            <h4 className="card-title text-center title">Sign In</h4>
            <p className="text-center subtitle">Use your corporate email to access your account</p>

            <form className="logform" onSubmit={handleSubmit} >
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text icon1"> <i className="fa fa-envelope"></i> </span>
                    </div>
                    <input onChange={handleChange} value={state.email} name="email" className="form-control" placeholder="Email address" type="email" />
                </div>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text icon1"> <i className="fa fa-lock"></i> </span>
                    </div>
                    <input onChange={handleChange} value={state.password} name="password" className="form-control" placeholder="Password" type="password" />
                </div>
                {state.error ? <div class="alert alert-danger" role="alert">Error: The email entered is not registered or the password is incorrect</div> : null}
                <div className="form-group">
                    <button type="submit" className="btn btn-danger btn-block button1"> Log In  </button>
                </div>
                <p className="text-center log">Don't have an account yet? <Link className="log" to={"/register"}>Register</Link></p>

            </form>
        </div>
    </div>
);
