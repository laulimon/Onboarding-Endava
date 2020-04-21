import React, { Fragment } from "react";
import "../css/style.css"

export default ({ handleSubmit, handleChange }) => {

    return (
        <Fragment >
            <div style={{ marginTop: "0px", marginBottom: "50px" }}  >
                <form onSubmit={handleSubmit}>
                    <section id="banner_white">
                        <div className="container box_container">
                            <div style={{ padding: "3%" }}>
                                <h3 className="cardTitle5">Edit Task State</h3>
                                <br />
                                <div>
                                    <select onChange={handleChange} selected="" name="newTaskState" className="form-control border1">
                                        <option className="border1">Current State</option>
                                        <option className="border1">pending</option>
                                        <option className="border1">started</option>
                                        <option className="border1">blocked out</option>
                                        <option className="border1">finished</option>
                                    </select>
                                </div>


                                <h3 className="cardTitle5" style={{ marginTop: "40px"}}>Add Comments</h3>
                                <form>
                                    <div className="form-group">
                                        <textarea onChange={handleChange} name="comment" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                    <button className="btn btn-info btn-block mb-2" style={{ backgroundColor: "#48545b", borderColor: "#48545b" }}>Save Changes</button>
                                </form>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </Fragment>
    )
}