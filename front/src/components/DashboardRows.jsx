import React from "react";
import "../css/style.css"
import "../css/style2.scss"
import { Link } from "react-router-dom"

export default ({ allTasks, user, usersTasks, state, onSortChange }) => {

  if (allTasks.length && user.id && usersTasks) {


    if (user.isAdmin === true) {

      let indice = 0;
      let indice1 = 0;
      let indice2 = 0;
      let ordenBlocked = state.currentSortBlocked === "down" ? [...allTasks].sort(state.sortTypesBlocked) : [...allTasks].sort(state.sortTypesBlocked).reverse()
      let ordenExpired = state.currentSortExpired === "down" ? [...allTasks].sort(state.sortTypesExpired) : [...allTasks].sort(state.sortTypesExpired).reverse()
      let ordenPending = state.currentSortPending === "down" ? [...allTasks].sort(state.sortTypesPending) : [...allTasks].sort(state.sortTypesPending).reverse()
      return (
        <div class="parentDashRow">
          <div class="div1DashRow">
            <div className="box_container3">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><i class="fas fa-user-lock"></i> &nbsp; BLOCKED</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><i class="fas fa-hourglass-end"></i> &nbsp; EXPIRED</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false"><i class="fas fa-stopwatch"></i> &nbsp; PENDING</a>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <table className="table table-striped">
                    <thead>
                      <tr className="table1 EndavaDash2-4-hex">
                        <th scope="col">#</th>
                        <th scope="col"><div onClick={() => onSortChange("task.description", "blocked")}>Task
                              {(state.sortColBlocked === "task.description") ? state.currentSortBlocked === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("recruit.name", "blocked")}>New Hire
                              {(state.sortColBlocked === "recruit.name") ? state.currentSortBlocked === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("user.name", "blocked")}>Responsable
                              {(state.sortColBlocked === "user.name") ? state.currentSortBlocked === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("dueDate", "blocked", true)}>Due Date
                              {(state.sortColBlocked === "dueDate") ? state.currentSortBlocked === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i>
                            : ""}
                        </div></th>
                        <th scope="col">Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordenBlocked.map((task) => {
                        return (
                          <>
                            {(task.state === "blocked out") ? (
                              <>
                                <tr key={task.id}>
                                  <th scope="row" className="align-middle">{++indice}</th>
                                  <td className="align-middle"><Link style={{ color: "#285078" }} to={`/task/${task.id}`} >{task.task.description}</Link></td>
                                  <td className="align-middle">{task.recruit.name} {task.recruit.lastName}</td>
                                  <td className="align-middle">{task.user.name} {task.user.lastName}</td>
                                  <td className="align-middle">{task.dueDate.split("-").reverse().join("/")}</td>
                                  <td className="align-middle">{task.comment}</td>
                                </tr>
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
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <table className="table table-striped">
                    <thead>
                      <tr className="table1 EndavaDash2-4-hex">
                        <th scope="col">#</th>
                        <th scope="col"><div onClick={() => onSortChange("task.description", "expired")}>Task
                              {(state.sortColExpired === "task.description") ? state.currentSortExpired === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("recruit.name", "expired")}>New Hire
                              {(state.sortColExpired === "recruit.name") ? state.currentSortExpired === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("user.name", "expired")}>Responsable
                              {(state.sortColExpired === "user.name") ? state.currentSortExpired === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("dueDate", "expired", true)}>Due Date
                              {(state.sortColExpired === "dueDate") ? state.currentSortExpired === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i>
                            : ""}
                        </div></th>
                        <th scope="col">Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordenExpired.map((task) => {
                        return (
                          <>
                            {(new Date(task.dueDate) < new Date && (task.state !== "finished")) ? (
                              <>
                                <tr key={task.id}>
                                  <th scope="row" className="align-middle">{++indice1}</th>
                                  <td className="align-middle"><Link style={{ color: "#285078" }} to={`/task/${task.id}`} >{task.task.description}</Link></td>
                                  <td className="align-middle">{task.recruit.name} {task.recruit.lastName}</td>
                                  <td className="align-middle">{task.user.name} {task.user.lastName}</td>
                                  <td className="align-middle">{task.dueDate.split("-").reverse().join("/")}</td>
                                  <td className="align-middle">{task.comment}</td>
                                </tr>
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
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                  <table className="table table-striped">
                    <thead>
                      <tr className="table1 EndavaDash2-4-hex">
                        <th scope="col">#</th>
                        <th scope="col"><div onClick={() => onSortChange("task.description", "pending")}>Task
                              {(state.sortColPending === "task.description") ? state.currentSortPending === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("recruit.name", "pending")}>New Hire
                              {(state.sortColPending === "recruit.name") ? state.currentSortPending === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("user.name", "pending")}>Responsable
                              {(state.sortColPending === "user.name") ? state.currentSortPending === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("dueDate", "pending", true)}>Due Date
                              {(state.sortColPending === "dueDate") ? state.currentSortPending === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i>
                            : ""}
                        </div></th>
                        <th scope="col">Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordenPending.map((task) => {
                        return (
                          <>
                            {(task.state === "pending") ? (
                              <>
                                <tr key={task.id}>
                                  <th scope="row" className="align-middle">{++indice2}</th>
                                  <td className="align-middle"><Link style={{ color: "#285078" }} to={`/task/${task.id}`} >{task.task.description}</Link></td>
                                  <td className="align-middle">{task.recruit.name} {task.recruit.lastName}</td>
                                  <td className="align-middle">{task.user.name} {task.user.lastName}</td>
                                  <td className="align-middle">{task.dueDate.split("-").reverse().join("/")}</td>
                                  <td className="align-middle">{task.comment}</td>
                                </tr>
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
          </div>
        </div>
      )
    } else {

      let indice = 0;
      let indice1 = 0;
      let indice2 = 0;
      let ordenBlocked = state.currentSortBlocked === "down" ? [...usersTasks].sort(state.sortTypesBlocked) : [...usersTasks].sort(state.sortTypesBlocked).reverse()
      let ordenExpired = state.currentSortExpired === "down" ? [...usersTasks].sort(state.sortTypesExpired) : [...usersTasks].sort(state.sortTypesExpired).reverse()
      let ordenPending = state.currentSortPending === "down" ? [...usersTasks].sort(state.sortTypesPending) : [...usersTasks].sort(state.sortTypesPending).reverse()

      return (

        <div class="parentDashRow">

          <div class="div1DashRow">

            <div className="box_container3">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><i class="fas fa-user-lock"></i> &nbsp; BLOCKED</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><i class="fas fa-hourglass-end"></i> &nbsp; EXPIRED</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false"><i class="fas fa-stopwatch"></i> &nbsp; PENDING</a>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">


                  <table className="table table-striped">
                    <thead>
                      <tr className="table1 EndavaDash2-4-hex">
                        <th scope="col">#</th>
                        <th scope="col"><div onClick={() => onSortChange("task.description", "blocked")}>Task
                              {(state.sortColBlocked === "task.description") ? state.currentSortBlocked === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("recruit.name", "blocked")}>New Hire
                              {(state.sortColBlocked === "recruit.name") ? state.currentSortBlocked === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("dueDate", "blocked", true)}>Due Date
                              {(state.sortColBlocked === "dueDate") ? state.currentSortBlocked === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i>
                            : ""}
                        </div></th>
                        <th scope="col">Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordenBlocked.map((task) => {
                        return (
                          <>
                            {(task.state === "blocked out") ? (
                              <>
                                <tr key={task.id}>
                                  <th scope="row" className="align-middle">{++indice}</th>
                                  <td className="align-middle"><Link style={{ color: "#285078" }} to={`/task/${task.id}`} >{task.task.description}</Link></td>
                                  <td className="align-middle">{task.recruit.name} {task.recruit.lastName}</td>
                                  <td className="align-middle">{task.dueDate.split("-").reverse().join("/")}</td>
                                  <td className="align-middle">{task.comment}</td>
                                </tr>
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
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <table className="table table-striped">
                    <thead>
                      <tr className="table1 EndavaDash2-4-hex">
                        <th scope="col">#</th>
                        <th scope="col"><div onClick={() => onSortChange("task.description", "expired")}>Task
                              {(state.sortColExpired === "task.description") ? state.currentSortExpired === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("recruit.name", "expired")}>New Hire
                              {(state.sortColExpired === "recruit.name") ? state.currentSortExpired === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("dueDate", "expired", true)}>Due Date
                              {(state.sortColExpired === "dueDate") ? state.currentSortExpired === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i>
                            : ""}
                        </div></th>
                        <th scope="col">Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordenExpired.map((task) => {
                        return (
                          <>
                            {(new Date(task.dueDate) < new Date && (task.state !== "finished")) ? (
                              <>
                                <tr key={task.id}>
                                  <th scope="row" className="align-middle">{++indice1}</th>
                                  <td className="align-middle"><Link style={{ color: "#285078" }} to={`/task/${task.id}`} >{task.task.description}</Link></td>
                                  <td className="align-middle">{task.recruit.name} {task.recruit.lastName}</td>
                                  <td className="align-middle">{task.dueDate.split("-").reverse().join("/")}</td>
                                  <td className="align-middle">{task.comment}</td>
                                </tr>
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

                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">


                  <table className="table table-striped">
                    <thead>
                      <tr className="table1 EndavaDash2-4-hex">
                        <th scope="col">#</th>
                        <th scope="col"><div onClick={() => onSortChange("task.description", "pending")}>Task
                              {(state.sortColPending === "task.description") ? state.currentSortPending === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("recruit.name", "pending")}>New Hire
                              {(state.sortColPending === "recruit.name") ? state.currentSortPending === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("dueDate", "pending", true)}>Due Date
                              {(state.sortColPending === "dueDate") ? state.currentSortPending === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i>
                            : ""}
                        </div></th>
                        <th scope="col">Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordenPending.map((task) => {
                        return (
                          <>
                            {(task.state === "pending") ? (
                              <>
                                <tr key={task.id}>
                                  <th scope="row" className="align-middle">{++indice2}</th>
                                  <td className="align-middle"><Link style={{ color: "#285078" }} to={`/task/${task.id}`} >{task.task.description}</Link></td>
                                  <td className="align-middle">{task.recruit.name} {task.recruit.lastName}</td>
                                  <td className="align-middle">{task.dueDate.split("-").reverse().join("/")}</td>
                                  <td className="align-middle">{task.comment}</td>
                                </tr>
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
          </div>

        </div>

      )
    }


  } else {
    return (
      <div class="spinner-border text-danger" role="status" style={{ marginTop: "20%", marginLeft: "50%" }}>
        <span class="sr-only">Loading...</span>
      </div>
    )
  }

}
