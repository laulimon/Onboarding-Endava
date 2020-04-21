import React, { Fragment } from "react";
import { Link } from "react-router-dom"
import "../css/style.css"
import SingleRecruitAddTaskContainer from "../containers/SingleRecruitAddTaskContainer"

export default ({ name, handlerClick, handleDeleteRecruit, tasksRecruit }) => {
    let indice = 0

    if (tasksRecruit.length) {
        return (
            <div style={{ padding: "3%" }}>
                <div className="largeModal">
                    <div >
                        {(tasksRecruit.length > 0) ? (
                            <>
                                <table className="table table-striped">
                                    <thead>
                                        <tr className="table1">
                                            <th scope="col">#</th>
                                            <th scope="col">Task</th>
                                            <th scope="col">Responsable</th>
                                            <th scope="col">Due Date</th>
                                            <th scope="col">State</th>
                                            <th scope="col">Coments</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasksRecruit.map((task) => {
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
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                                <div style={{ padding: "3%" }}>
                                    <p>There's no tasks associated with this new hire</p>
                                </div>
                            )}
                    </div>
                </div>

            </div>
        )
    } else {
        return (
            <div style={{ padding: "3%" }}>
                <p>There's no tasks associated with this new hire</p>
            </div>
        )
    }

}
