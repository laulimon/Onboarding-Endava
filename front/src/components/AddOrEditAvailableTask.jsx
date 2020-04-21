import React, { Fragment } from "react";
import "../css/style.css"

export default ({ handleSubmit, handleChange, state, tasksList, handleClick, handleSearchTaskList }) => {
    let indice = 0
    return (
        <Fragment>
            <section id="banner_white">
                <div className="container box_container">
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <img src="/images/design/admin1.svg" className="img-fluid" style={{ margin: "3%" }} />
                        </div>
                        <div className="col-md-6" style={{ backgroundColor: "#f0f3f3" }}>
                            <div className="form-container">
                                <div className="card-body mx-auto allform" style={{ maxWidth: "400px" }}>
                                    <h4 className="card-title mt-2 text-center">Add a task to the list of availables tasks.</h4>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label style={{ color: "#48545b" }}>Description</label>
                                            <textarea onChange={handleChange} value={state.description} name="description" className="form-control" id="exampleFormControlTextarea1" rows="3">  </textarea>
                                        </div>
                                        <button className="btn btn-info btn-block mb-2" style={{ backgroundColor: "#de4242", borderColor: "#de4242" }}>Create Task</button>
                                    </form>
                                    {state.errorDescription ? (
                                        <div
                                            className="alert alert-danger"
                                            style={{
                                                borderRadius: "5px",
                                                marginTop: "17px"
                                            }}
                                            role="alert"
                                        >
                                            Please check the task's description
                                        </div>
                                    ) : null}
                                    <button type="button" className=" btn btn-link " data-toggle="modal" data-target="#tasksList">
                                        See, modify or delete available tasks.
                                    </button>
                                    {/* -- Modal task form -- */}
                                    <div className="modal fade" id="tasksList" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLongTitle">List of available tasks</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="container box_container2 margen">
                                                        
                                                        <form class="lupa d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 ">
                                                            <input class="form-control form-control-sm mr-3 ancho" type="text" placeholder="Search for Task" onChange={handleSearchTaskList}
                                                                aria-label="Search" />
                                                            <i class="fas fa-search searchColor" aria-hidden="true"></i>
                                                        </form>
                                                
                                                    </div>
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr className="table1">
                                                                <th scope="col">#</th>
                                                                <th scope="col">Task</th>
                                                                <th scope="col"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {tasksList.map((task) => {
                                                                return (
                                                                    <tr key={task.id}>
                                                                        <th scope="row" className="align-middle">{++indice}</th>
                                                                        <td className="align-middle">{task.description} </td>
                                                                        <td className="align-middle"><button type="button" class="btn btn-outline-danger" data-dismiss="modal" onClick={() => handleClick(task.id)}><i className="fas fa-pencil-alt"></i></button></td>

                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment >
    )
}