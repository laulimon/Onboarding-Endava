import React, { Fragment } from "react"
import { Link } from "react-router-dom"

export default ({ taskListId, tasksList, allTasks, handleDelete, handleChange, state, handleSubmit }) => {
    const flag = allTasks.filter(task => {
        return task.taskId == taskListId
    })
    return (
        <Fragment>
            {(allTasks.length) ? (
                <section id="banner_white">
                    <div className="container box_container">
                        <div className="row">
                            <div className="col-md-6" style={{ backgroundColor: "#f0f3f3" }}>
                                <div className="form-container">
                                    <div className="card-body mx-auto">
                                        <p className="card-title mt-3 text-center title">Edit / Delete Task</p>
                                        <p className="text-left subtitle">In this seccion you can edit or delete the selected task.</p>
                                        <>
                                            {(flag.length) ? (
                                                <p className="text-left subtitle"> <span style={{ fontWeight: "bold" }} >Warning:</span>  This task is assigned to multiple new hires, so it can't be deleted, but you're able to edit it.</p>

                                            ) : (
                                                    null
                                                )
                                            }
                                        </>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6" style={{ backgroundColor: "#f0f3f3" }}>
                                <div className="form-container" style={{ display: "inline-block" }}>
                                    <div className="card-body mx-auto">
                                        <div className="container box_container2" style={{ width: "500px", height: "200px", marginTop: "5%", marginBottom: "5%" }}>
                                            <div className="card bg-light" style={{ width: "400px", height: "150px", margin: "auto" }} >
                                                <div className="card-body mx-auto" style={{ maxWidth: "800px" }}>
                                                    <form onSubmit={handleSubmit} >
                                                        <div className="form-group input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"> <i className="fas fa-tasks"></i> </span>
                                                            </div>
                                                            <>
                                                                {tasksList.map(task => {
                                                                    return (
                                                                        (task.id == taskListId) ?
                                                                            <textarea onChange={handleChange} key={task.id} name="description" className="form-control" placeholder="Description" defaultValue={task.description} type="text" />
                                                                            :
                                                                            null
                                                                    )
                                                                })}
                                                            </>
                                                        </div>
                                                        <div className="form-group">
                                                            <button style={{ margin: "1%" }} type="submit" className="btn btn-outline-primary btn-inline "><i class="fas fa-check"></i></button>
                                                            <>
                                                                {(!flag.length) ? (
                                                                    <button onClick={handleDelete} style={{ margin: "1%" }} type="submit" className="btn btn-outline-danger btn-inline"><i class="fas fa-trash-alt"></i></button>
                                                                ) : (
                                                                        null
                                                                    )
                                                                }
                                                            </>
                                                            <Link to="/AddOrEditAvailableTasks" ><button style={{ margin: "1%" }} type="submit" className="btn btn-outline-primary btn-inline"><i class="fas fa-times"></i></button></Link>

                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null
            }
        </Fragment >
    )
}