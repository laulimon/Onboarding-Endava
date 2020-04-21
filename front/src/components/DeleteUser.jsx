import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css"

export default ({ userId, tasks, handleChange, userOptions, handleClick, handleClickDelete }) => {
    let indice = 0
    const flag = tasks.filter(task => {
        return task.state != "finished"
    })
    if (tasks && userOptions) {
        return (
            <div style={{ padding: "3%" }}>
                <div className="container box_container">
                    {(tasks.length > 0) ? (
                        <>
                            <div style={{ marginTop: "3%" }}>
                                <h5>The user you want to delete has these unfinished tasks</h5>
                            </div>
                            <br />
                            <table className="table table-striped">
                                <thead>
                                    <tr className="table1">
                                        <th scope="col">#</th>
                                        <th scope="col">Task</th>
                                        <th scope="col">New Hire</th>
                                        <th scope="col">Due Date</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Comments</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((task) => {
                                        return (
                                            <>
                                                {(task.state != "finished") ? (
                                                    <>
                                                        <tr key={task.id}>
                                                            <th scope="row" className="align-middle">{++indice}</th>
                                                            <td className="align-middle">{task.task.description}</td>
                                                            <td className="align-middle">{task.recruit.name} {task.recruit.lastName}</td>
                                                            <td className="align-middle">{task.dueDate.split("-").reverse().join("/")}</td>
                                                            <>
                                                                {(task.state == "blocked out") ? (
                                                                    <td className="align-middle" style={{ color: "red" }}>{task.state}</td>
                                                                ) : (
                                                                        <td className="align-middle">{task.state}</td>
                                                                    )
                                                                }
                                                            </>
                                                            <td className="align-middle">{task.comment}</td>
                                                            <td className="align-middle">
                                                                <div className="form-group input-group">
                                                                    <select onChange={handleChange} selected="" name="newResponsable" className="form-control border1">
                                                                        <option className="border1">Select New Responsable</option>
                                                                        {userOptions.map((userOption) => {
                                                                            return (
                                                                                <>
                                                                                    {(userOption.id != userId) ? (
                                                                                        < option key={userOption.id} className="border1" > {userOption.name} {userOption.lastName} ({userOption.id})</option>

                                                                                    ) : (
                                                                                            null
                                                                                        )}
                                                                                </>
                                                                            )
                                                                        })}
                                                                    </select>
                                                                    <button type="button" className="btn btn-outline-success" style={{ marginLeft: "5%" }} onClick={() => handleClick(task.id)}><i className="fas fa-sync-alt"></i></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </>) : (
                                                        null
                                                    )
                                                }
                                            </>
                                        )
                                    })}
                                    <>
                                        <br />
                                        {(!flag.length) ? (
                                            <>
                                                <p>The user doesn't have assigned tasks, you're able to delete it.</p>
                                                <div style={{ padding: "3%", display: "flex", justifyContent: "flex-end" }}>
                                                    <button type="button" className="align-middle btn btn-outline-danger" style={{ marginTop: "12px", marginBottom: "12px" }} onClick={handleClickDelete}>Delete User</button>
                                                </div>

                                            </>
                                        ) : (
                                                null
                                            )
                                        }
                                    </>

                                </tbody>
                            </table>
                        </>
                    ) : (
                            <>
                                <div style={{ marginTop: "3%" }}>
                                    <p>The user doesn't have assigned tasks, you can proceed to delete it</p>
                                </div>
                                <div style={{ padding: "3%", display: "flex", justifyContent: "flex-end" }}>
                                    <button type="button" className="align-middle btn btn-outline-danger" style={{ marginTop: "12px", marginBottom: "12px" }} onClick={handleClickDelete}>Delete User</button>
                                </div>
                            </>
                        )}
                </div>
            </div >
        )
    } else {
        return (
            <div class="spinner-border text-danger" role="status" style={{ marginTop: "20%", marginLeft: "50%" }}>
                <span class="sr-only">Loading...</span>
            </div>
        )
    }
}