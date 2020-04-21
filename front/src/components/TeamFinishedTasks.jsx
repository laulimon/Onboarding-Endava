import React, { Fragment } from "react";
import { Link } from "react-router-dom"


export default ({ handleSearchInputS, handleSearchInputT, allTasks, state, onSortChange }) => {
    let indice = 0
    let orden =state.currentSort==="down" ? [...allTasks].sort(state.sortTypes) : [...allTasks].sort(state.sortTypes).reverse()

    return (
        <Fragment>
            <div class="card-body rgba-black-light white-text z-depth-1">
                <div style={{ textAlign: "center", marginTop: "3%" }} >
                    <h1 className="componentTitle">TEAM FINISHED TASKS</h1>
                </div>
                <br />
                <div>
                    <div className="container box_container2 margen">
                        <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 ">
                            <input class="form-control form-control-sm mr-3 ancho" type="text" placeholder="Search for New Hires" onChange={handleSearchInputS}
                                aria-label="Search" />
                            <i class="fas fa-search searchColor" aria-hidden="true"></i>
                        </form>
                        <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 ">
                            <input class="form-control form-control-sm mr-3 ancho" type="text" placeholder="Search for Task Owners" onChange={handleSearchInputT}
                                aria-label="Search" />
                            <i class="fas fa-search searchColor" aria-hidden="true"></i>
                        </form>
                    </div>
                    <div className="container box_container2">
                        <table className="table table-striped">
                            <thead>
                                <tr className="table1">
                                    <th scope="col">#</th>
                                    <th scope="col"><div onClick={() => onSortChange("task.description")}>Task 
                        {(state.sortCol === "task.description") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                        : <i class="far fa-arrow-alt-circle-up"></i>: ""}
                        </div></th>
                                    <th scope="col"><div onClick={() => onSortChange("recruit.name")}>New Hire 
                        {(state.sortCol === "recruit.name") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                        : <i class="far fa-arrow-alt-circle-up"></i>: ""}
                        </div></th>
                                    <th scope="col"><div onClick={() => onSortChange("user.name")}>Task owner 
                        {(state.sortCol === "user.name") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                        : <i class="far fa-arrow-alt-circle-up"></i>: ""}
                        </div></th>
                                    <th scope="col"><div onClick={() => onSortChange("dueDate", true)}>Due Date 
                        {(state.sortCol === "dueDate") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                        : <i class="far fa-arrow-alt-circle-up"></i>
                        : ""}
                        </div></th>
                                    <th scope="col"><div onClick={() => onSortChange("finishDate", true)}>End date 
                        {(state.sortCol === "finishDate") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                        : <i class="far fa-arrow-alt-circle-up"></i>
                        : ""}
                        </div></th>
                                    <th scope="col">Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orden.map((task) => {
                                    if (task.finishDate.length>10) task.finishDate=task.finishDate.substr(0,10)
                                    return (
                                        <>
                                            {(task.state == "finished") ? (
                                                <>
                                                    <tr key={task.id} style={{ backgroundColor: "white" }} >
                                                        <th scope="row" className="align-middle">{++indice}</th>
                                                        <td className="align-middle"><Link style={{ color: "#1d57a8" }} to={`/task/${task.id}`} >{task.task.description}</Link></td>
                                                        <td className="align-middle">{task.recruit.name} {task.recruit.lastName}</td>
                                                        <td className="align-middle">{task.user.name} {task.user.lastName}</td>
                                                        <td className="align-middle">{task.dueDate.split("-").reverse().join("/")}</td>
                                                        <td className="align-middle">{task.finishDate.split("-").reverse().join("/")}</td>
                                                        <td className="align-middle">{task.comment}</td>
                                                    </tr>
                                                </>
                                            ) : (
                                                    null
                                                )
                                            }
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