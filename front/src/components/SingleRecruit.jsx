import React, { Fragment } from "react";
import { Link } from "react-router-dom"
import "../css/style.css"
import SingleRecruitAddTaskContainer from "../containers/SingleRecruitAddTaskContainer"



export default ({ recruit, tasks, handlerClick, handleDeleteRecruit, state, onSortChange }) => {
    let indice = 0
    let orden =state.currentSort==="down" ? [...tasks].sort(state.sortTypes) : [...tasks].sort(state.sortTypes).reverse()

    if (tasks) {
        return (
            <div style={{ padding: "3%" }}>
                <div className="container box_container2" >
                            <div>
                                <h2 className="mb-0">
                                        Associated Tasks
                                </h2>
                            </div>
                                <div>

                                    {(tasks.length > 0 && typeof tasks[0] === 'object') ? (
                                        <>
                                            <SingleRecruitAddTaskContainer />
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr className="table1">
                                                        <th scope="col">#</th>
                                                        <th scope="col"><div onClick={() => onSortChange("task.description")}>Task 
                        {(state.sortCol === "task.description") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                        : <i class="far fa-arrow-alt-circle-up"></i>: ""}
                        </div></th>
                                                        <th scope="col"><div onClick={() => onSortChange("user.name")}>Responsable 
                        {(state.sortCol === "user.name") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                        : <i class="far fa-arrow-alt-circle-up"></i>: ""}
                        </div></th>
                                                        <th scope="col"><div onClick={() => onSortChange("dueDate", true)}>Due Date 
                        {(state.sortCol === "dueDate") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                        : <i class="far fa-arrow-alt-circle-up"></i>
                        : ""}
                        </div></th>
                                                        <th scope="col"><div onClick={() => onSortChange("state")}>State 
                        {(state.sortCol === "state") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                        : <i class="far fa-arrow-alt-circle-up"></i>
                        : ""}
                        </div></th>
                                                        <th scope="col">Coments</th>
                                                        <th scope="col">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orden.map((task) => {
                                                        let fechaArray = task.dueDate.split("-")
                                                        let fechaOrdenada = fechaArray.reverse()
                                                        let dueDate = fechaOrdenada.join("/")
                                                        indice = indice + 1
                                                        return (
                                                            <tr key={task.id}>
                                                                <th scope="row" className="align-middle">{indice}</th>
                                                                <td className="align-middle">{task.task.description}</td>
                                                                <td className="align-middle">{task.user.name} {task.user.lastName}</td>
                                                                <td className="align-middle">{dueDate}</td>
                                                                <td className="align-middle">{task.state}</td>
                                                                <td className="align-middle">{task.comment}</td>
                                                                <td className="align-middle"><button type="button" class="btn btn-outline-danger" onClick={() => handlerClick(task.id)}><i className="far fa-trash-alt"></i></button></td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>

                                        </>
                                    ) : (
                                            <div style={{ padding: "3%" }}>
                                                <p>There's no tasks associated with this new hire</p>
                                                <SingleRecruitAddTaskContainer />
                                            </div>
                                        )}
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
