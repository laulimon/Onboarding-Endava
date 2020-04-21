import React, { Fragment } from "react";
import "../css/style.css"
import SingleTaskEditFormContainer from "../containers/SingleTaskEditFormContainer"
export default ({ selectedTask, user }) => {
    return (
        <Fragment>
            {(selectedTask.id) ?
                (<Fragment>
                    <section id="banner_white" style={{paddingBottom:"0%"}}>
                        <div className="container box_container">
                            <div className="row">
                                <div className="col-md-6" style={{ backgroundColor: "#fff" }}>
                                    <div className="form-container">
                                        <div className="card-body mx-auto">
                                            <p className="mt-3 taskTitle"> <i class="fas fa-info-circle"></i>New Hire Information</p>
                                            <p className="text-left subtitle"><span className="referencia">Name:</span> {selectedTask.recruit.name} {selectedTask.recruit.lastName}</p>
                                            <p className="text-left subtitle"><span className="referencia">Email:</span> {selectedTask.recruit.email}</p>
                                            <p className="text-left subtitle"><span className="referencia">Phone Number:</span> {selectedTask.recruit.phone}</p>
                                            <p className="text-left subtitle"><span className="referencia">DNI: </span>{selectedTask.recruit.DNI}</p>
                                            <p className="text-left subtitle"><span className="referencia">Entry date: </span>{selectedTask.recruit.entryDate} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6" style={{ backgroundColor: "#fff" }}>
                                    <div className="form-container" style={{ display: "inline-block" }}>
                                        <div className="card-body mx-auto">
                                            <p className="mt-3 taskTitle"> <i class="fas fa-info-circle"></i>Task General Information</p>
                                            <p className="text-left subtitle"><span className="referencia">Task:</span> {selectedTask.task.description}</p>
                                            <p className="text-left subtitle"><span className="referencia">State:</span> {selectedTask.state} </p>
                                            <p className="text-left subtitle"><span className="referencia">Responsable:</span> {user.name} {user.lastName} </p>
                                            <p className="text-left subtitle"><span className="referencia">Due date: </span>{selectedTask.dueDate} </p>
                                            <p className="text-left subtitle"><span className="referencia">Finish date:</span> </p>
                                            {(selectedTask.comment) ? (<p className="text-left subtitle"><span className="referencia">Comment: </span>{selectedTask.comment} </p>) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fragment>)
                : null}
            <SingleTaskEditFormContainer />
        </Fragment>
    )
}











