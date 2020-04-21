import React, { Fragment } from "react";
import { Link } from "react-router-dom"

export default ({ state, user, handleSearchInput, tasks, handleChange, handleClick, onSortChange }) => {
    let indice = 0
    let orden = state.currentSort === "down" ? [...tasks].sort(state.sortTypes) : [...tasks].sort(state.sortTypes).reverse()
    return (
        <Fragment>
            <div class="card-body rgba-black-light white-text z-depth-1">
                <div style={{ textAlign: "center", marginTop: "3%" }} >
                    <h1 className="componentTitle" >MY TASKS</h1>
                </div>
                <br />
                <div>
                    <div className="container box_container2 margen">
                        <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 ">
                            <input class="form-control form-control-sm mr-3 ancho" type="text" placeholder="Search for New Hire" onChange={handleSearchInput}
                                aria-label="Search" />
                            <i class="fas fa-search searchColor" aria-hidden="true"></i>
                        </form>
                    </div>
                    <div className="container box_container2">
                        <table className="table table-striped">
                            <thead>
                                <tr className="table1">
                                    <th scope="col">#</th>
                                    <th scope="col"></th>
                                    <th scope="col"><div onClick={() => onSortChange("task.description")}>Task
                        {(state.sortCol === "task.description") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                                    </div></th>
                                    <th scope="col"><div onClick={() => onSortChange("recruit.name")}>New Hire
                        {(state.sortCol === "recruit.name") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                                    </div></th>
                                    <th scope="col"><div onClick={() => onSortChange("dueDate", true)}>Due Date
                        {(state.sortCol === "dueDate") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                                            : <i class="far fa-arrow-alt-circle-up"></i>
                                            : ""}
                                    </div></th>
                                    <th scope="col"><div onClick={() => onSortChange("state")}>Status
                        {(state.sortCol === "state") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                                    </div></th>
                                    <th scope="col">New State</th>
                                    <th scope="col">Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orden.map((task) => {
                                    let today = new Date();
                                    let due = new Date(task.dueDate);
                                    let color = ""
                                    if (due > today) {
                                        var diffTime = Math.abs(due - today);
                                        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                        (diffDays <= 3) ? color = "amarillo" : color = "verde";
                                    } else {
                                        color = "rojo"
                                    }
                                    return (
                                        <>
                                            {(task.state != "finished") ? (
                                                <>
                                                    {(color === "rojo" || task.state === "blocked out") ? (
                                                        <tr key={task.id} style={{ backgroundColor: "#ff000036" }} >
                                                            <th scope="row" className="align-middle">{++indice}</th>
                                                            <> {(color === "rojo") ? (<td style={{ color: "red" }} className="align-middle"><i class="fas fa-circle"></i></td>) : null}</>
                                                            <> {(color === "amarillo") ? (<td style={{ color: "yellow" }} className="align-middle"><i class="fas fa-circle"></i></td>) : null}</>
                                                            <> {(color === "verde") ? (<td style={{ color: "green" }} className="align-middle"><i class="fas fa-circle"></i></td>) : null}</>
                                                            <td className="align-middle"><Link style={{ color: "#285078" }} to={`/task/${task.id}`} >{task.task.description}</Link></td>
                                                            <td className="align-middle">{task.recruit.name} {task.recruit.lastName}</td>
                                                            <td className="align-middle">{task.dueDate.split("-").reverse().join("/")}</td>
                                                            <>
                                                                {(task.state == "blocked out") ? (
                                                                    <td className="align-middle" style={{ color: "red" }}  >{task.state}</td>
                                                                ) : (
                                                                        <td className="align-middle"   >{task.state}</td>
                                                                    )
                                                                }
                                                            </>
                                                            <td className="align-middle">
                                                                <div className="form-group input-group">
                                                                    <select onChange={handleChange} selected="" name="taskState" className="form-control border1">
                                                                        <option className="border1">Current State</option>
                                                                        <option className="border1">pending</option>
                                                                        <option className="border1">started</option>
                                                                        <option className="border1">blocked out</option>
                                                                        <option className="border1">finished</option>
                                                                    </select>
                                                                    <button type="button" className="btn btn-outline-success" style={{ marginLeft: "5%" }} onClick={() => handleClick(task.id)}><i className="fas fa-sync-alt"></i></button>
                                                                </div>
                                                            </td>
                                                            <td className="align-middle">{task.comment}</td>
                                                        </tr>
                                                    ) : (
                                                            <tr key={task.id} style={{ backgroundColor: "white" }} >
                                                                <th scope="row" className="align-middle">{++indice}</th>
                                                                <> {(color === "rojo") ? (<td style={{ color: "red" }} className="align-middle"><i class="fas fa-circle"></i></td>) : null}</>
                                                                <> {(color === "amarillo") ? (<td style={{ color: "yellow" }} className="align-middle"><i class="fas fa-circle"></i></td>) : null}</>
                                                                <> {(color === "verde") ? (<td style={{ color: "green" }} className="align-middle"><i class="fas fa-circle"></i></td>) : null}</>
                                                                <td className="align-middle"><Link style={{ color: "#285078" }} to={`/task/${task.id}`} >{task.task.description}</Link></td>
                                                                <td className="align-middle">{task.recruit.name} {task.recruit.lastName}</td>
                                                                <td className="align-middle">{task.dueDate.split("-").reverse().join("/")}</td>
                                                                <>
                                                                    {(task.state == "blocked out") ? (
                                                                        <td className="align-middle" style={{ color: "red" }}  >{task.state}</td>
                                                                    ) : (
                                                                            <td className="align-middle"   >{task.state}</td>
                                                                        )
                                                                    }
                                                                </>
                                                                <td className="align-middle">
                                                                    <div className="form-group input-group">
                                                                        <select onChange={handleChange} selected="" name="taskState" className="form-control border1">
                                                                            <option className="border1">Current State</option>
                                                                            <option className="border1">pending</option>
                                                                            <option className="border1">started</option>
                                                                            <option className="border1">blocked out</option>
                                                                            <option className="border1">finished</option>
                                                                        </select>
                                                                        <button type="button" className="btn btn-outline-success" style={{ marginLeft: "5%" }} onClick={() => handleClick(task.id)}><i className="fas fa-sync-alt"></i></button>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle">{task.comment}</td>
                                                            </tr>
                                                        )}
                                                </>
                                            ) : (
                                                    null
                                                )}
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}