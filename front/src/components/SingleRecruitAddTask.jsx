import React, { Fragment } from "react";
import { Link } from "react-router-dom"
import "../css/style.css"



export default ({ taskOptions, userOptions, handleSubmit, handleChange, state }) => {

    if (taskOptions.length > 0 && userOptions.length > 0) {
        return (
            <div style={{ padding: "3%" }}>
                <div className="container box_container2" >

                    <h2>Associate tasks with the New Hire</h2>
                    <div style={{ padding: "3%" }}>
                        <form onSubmit={handleSubmit}>
                            <div class="container">
                                <div class="row">
                                    <div class="col-sm">New Task</div>
                                    <div class="col-sm">Responsable</div>
                                    <div class="col-sm">Due Date</div>
                                </div>
                            </div>

                            <div class="container">
                                <div class="row">
                                    <div class="col-sm">
                                        <select selected="" name="taskDescription" className="form-control border1" onChange={handleChange} value={state.taskDescription}>
                                            <option className="border1">Select Task</option>
                                            {taskOptions.map((taskOption) => (
                                                <option key={taskOption.id} className="border1">{taskOption.description}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="col-sm">
                                        <select selected="" name="responsable" className="form-control border1" onChange={handleChange} value={state.responsable}>
                                            <option className="border1">Select Responsable</option>
                                            {userOptions.map((userOption) => (
                                                <option key={userOption.id} className="border1">{userOption.name} {userOption.lastName} ({userOption.id})</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="col-sm">
                                        <input type="date" name="dueDate" max="2050-12-31" min="2020-03-01" className="form-control" placeholder="Starting on" onChange={handleChange} value={state.dueDate} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: "3%", display: "flex", justifyContent: "flex-end" }}>
                                <button type="submit" className="btn btn-outline-primary" style={{ borderColor: "#1E5DAC" }} >Associate Task</button>
                            </div>
                            {(state.errorFields) ? (
                                <div class="alert alert-danger" role="alert">
                                    A simple danger alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
                              </div>
                            ) : (null)}
                        </form>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div class="spinner-border text-danger" role="status" style={{ marginTop: "20%", marginLeft: "50%" }}>
                <span class="sr-only">Loading...</span>
            </div>
        )
    }
}