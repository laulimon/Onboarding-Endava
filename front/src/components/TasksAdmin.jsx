import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import "../css/style.css"

export default ({ handleSubmit, handleSearchInput, handleSearchTaskList, handleSearchAllPendingInputS, handleSearchAllPendingInputT, handleSearchAllFinishedInputS, handleSearchAllFinishedInputT, handleChange, state, tasks, handleClick, allTasks, tasksList, user, clearState, handleClick2 }) => {

  let indice = 0
  let indice2 = 0
  let indice3 = 0
  let indice4 = 0
  let indice5 = 0

  return (
    <Fragment>
      {(user.id) ? (
        <div className="container box_container2 mt-4">
          <div class="accordion md-accordion accordion-5" id="accordionEx5" role="tablist"
            aria-multiselectable="true">
            {/* COLLAPSE MY  TASKS */}
            <div class="card mb-4">
              <div class="card-header p-0 z-depth-1 collapseTitleBackground" style={{ textDecoration: "none" }} role="tab" id="heading30">
                <a data-toggle="collapse" data-parent="#accordionEx5" href="#mytask" aria-expanded="true"
                  aria-controls="collapse30">
                  <i class="fas fa-list-ol collapseLogo fa-2x p-3 mr-4 float-left black-text" aria-hidden="true"></i>
                  <h4 class="text-uppercase mb-0 py-3 mt-1 collapseTitle" style={{ textDecoration: "none" }}>
                    MY TASKS
                </h4>
                </a>
              </div>
              <div id="mytask" class="collapse" role="tabpanel" aria-labelledby="heading30"
                data-parent="#accordionEx5">
                <div class="card-body rgba-black-light white-text z-depth-1">
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
                            <th scope="col">Task</th>
                            <th scope="col">New Hire</th>
                            <th scope="col">Due Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">New State</th>
                            <th scope="col">Comments</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tasks.map((task) => {
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
                                    <tr key={task.id}>
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
            {/* COLLAPSE MY FINISHED TASKS */}
            <div class="card mb-4">
              <div class="card-header p-0 z-depth-1 collapseTitleBackground" style={{ textDecoration: "none" }} role="tab" id="heading30">
                <a data-toggle="collapse" data-parent="#accordionEx5" href="#myFinishedTasks" aria-expanded="true"
                  aria-controls="collapse30">
                  <i class="fas fa-tasks collapseLogo fa-2x p-3 mr-4 float-left black-text" aria-hidden="true"></i>
                  <h4 class="text-uppercase mb-0 py-3 mt-1 collapseTitle" style={{ textDecoration: "none" }}>
                    MY FINISHED TASKS
                </h4>
                </a>
              </div>
              <div id="myFinishedTasks" class="collapse" role="tabpanel" aria-labelledby="heading30"
                data-parent="#accordionEx5">
                <div class="card-body rgba-black-light white-text z-depth-1">
                  <div>
                    <div className="container box_container2">
                      <table className="table table-striped">
                        <thead>
                          <tr className="table1">
                            <th scope="col">#</th>
                            <th scope="col">Task</th>
                            <th scope="col">New Hire</th>
                            <th scope="col">Due Date</th>
                            <th scope="col">End date</th>
                            <th scope="col">Comments</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tasks.map((task) => {
                            return (
                              <>
                                {(task.state == "finished") ? (
                                  <>
                                    <tr key={task.id}>
                                      <th scope="row" className="align-middle">{++indice4}</th>
                                      <td className="align-middle"><Link style={{ color: "#1d57a8" }} to={`/task/${task.id}`} >{task.task.description}</Link></td>
                                      <td className="align-middle">{task.recruit.name} {task.recruit.lastName}</td>
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
              </div>
            </div>
            {/* COLLAPSE ALL PENDING TASKS */}
            <>
              {(user.isAdmin) ? (
                <div class="card mb-4">
                  <div class="card-header p-0 z-depth-1 collapseTitleBackground" style={{ textDecoration: "none" }} role="tab" id="heading30">
                    <a onClick={clearState} data-toggle="collapse" data-parent="#accordionEx5" href="#allPendingTasks" aria-expanded="true"
                      aria-controls="collapse30">
                      <i class="far fa-list-alt collapseLogo fa-2x p-3 mr-4 float-left black-text" aria-hidden="true"></i>
                      <h4 class="text-uppercase mb-0 py-3 mt-1 collapseTitle" style={{ textDecoration: "none" }}>
                        TEAM PENDING TASKS
                    </h4>
                    </a>
                  </div>
                  <div id="allPendingTasks" class="collapse" role="tabpanel" aria-labelledby="heading30"
                    data-parent="#accordionEx5">
                    <div class="card-body rgba-black-light white-text z-depth-1">
                      <div>
                        <div className="container box_container2 margen">
                          <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 ">
                            <input class="form-control form-control-sm mr-3 ancho" type="text" placeholder="Search for New Hires" onChange={handleSearchAllPendingInputS}
                              aria-label="Search" />
                            <i class="fas fa-search searchColor" aria-hidden="true"></i>
                          </form>
                          <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 ">
                            <input class="form-control form-control-sm mr-3 ancho" type="text" placeholder="Search for Task Owners" onChange={handleSearchAllPendingInputT}
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
                                <th scope="col">Task</th>
                                <th scope="col">New Hire</th>
                                <th scope="col">Task owner</th>
                                <th scope="col">Due Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Comments</th>
                              </tr>
                            </thead>
                            <tbody>
                              {allTasks.map((task) => {
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
                                      <tr key={task.id}>
                                        <th scope="row" className="align-middle">{++indice2}</th>
                                        <> {(color === "rojo") ? (<td style={{ color: "red" }} className="align-middle"><i class="fas fa-circle"></i></td>) : null}</>
                                        <> {(color === "amarillo") ? (<td style={{ color: "yellow" }} className="align-middle"><i class="fas fa-circle"></i></td>) : null}</>
                                        <> {(color === "verde") ? (<td style={{ color: "green" }} className="align-middle"><i class="fas fa-circle"></i></td>) : null}</>
                                        <td className="align-middle"><Link style={{ color: "#1d57a8" }} to={`/task/${task.id}`} >{task.task.description}</Link></td>
                                        <td className="align-middle">{task.recruit.name} {task.recruit.lastName}</td>
                                        <td className="align-middle">{task.user.name} {task.user.lastName}</td>
                                        <td className="align-middle">{task.dueDate.split("-").reverse().join("/")}</td>
                                        <>
                                          {(task.state == "blocked out") ? (
                                            <td className="align-middle" style={{ color: "red" }}  >{task.state}</td>
                                          ) : (
                                              <td className="align-middle"   >{task.state}</td>
                                            )
                                          }
                                        </>
                                        <td className="align-middle">{task.comment}</td>
                                      </tr>
                                    ) : (null)}

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
              ) : (
                  null
                )
              }
            </>
            {/* COLLAPSE ALL FINISHED TASKS */}
            <>
              {(user.isAdmin) ? (
                <div class="card mb-4">
                  <div class="card-header p-0 z-depth-1 collapseTitleBackground" style={{ textDecoration: "none" }} role="tab" id="heading30">
                    <a onClick={clearState} data-toggle="collapse" data-parent="#accordionEx5" href="#allFinishTasks" aria-expanded="true"
                      aria-controls="collapse30">
                      <i class="far fa-list-alt collapseLogo fa-2x p-3 mr-4 float-left black-text" aria-hidden="true"></i>
                      <h4 class="text-uppercase mb-0 py-3 mt-1 collapseTitle" style={{ textDecoration: "none" }}>
                        TEAM FINISHED TASKS
                    </h4>
                    </a>
                  </div>
                  <div id="allFinishTasks" class="collapse" role="tabpanel" aria-labelledby="heading30"
                    data-parent="#accordionEx5">
                    <div class="card-body rgba-black-light white-text z-depth-1">
                      <div>
                        <div className="container box_container2 margen">
                          <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 ">
                            <input class="form-control form-control-sm mr-3 ancho" type="text" placeholder="Search for New Hires" onChange={handleSearchAllFinishedInputS}
                              aria-label="Search" />
                            <i class="fas fa-search searchColor" aria-hidden="true"></i>
                          </form>
                          <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 ">
                            <input class="form-control form-control-sm mr-3 ancho" type="text" placeholder="Search for Task Owners" onChange={handleSearchAllFinishedInputT}
                              aria-label="Search" />
                            <i class="fas fa-search searchColor" aria-hidden="true"></i>
                          </form>
                        </div>
                        <div className="container box_container2">
                          <table className="table table-striped">
                            <thead>
                              <tr className="table1">
                                <th scope="col">#</th>
                                <th scope="col">Task</th>
                                <th scope="col">New Hire</th>
                                <th scope="col">Task owner</th>
                                <th scope="col">Due Date</th>
                                <th scope="col">End date</th>
                                <th scope="col">Comments</th>
                              </tr>
                            </thead>
                            <tbody>
                              {allTasks.map((task) => {
                                return (
                                  <>
                                    {(task.state == "finished") ? (
                                      <>
                                        <tr key={task.id}>
                                          <th scope="row" className="align-middle">{++indice5}</th>
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
                  </div>
                </div>
              ) : (
                  null
                )
              }
            </>
            {/* COLLAPSE ADD TASK */}
            <>
              {(user.isAdmin) ? (
                <div class="card mb-4">
                  <div class="card-header p-0 z-depth-1 collapseTitleBackground" style={{ textDecoration: "none" }} role="tab" id="heading30">
                    <a data-toggle="collapse" data-parent="#accordionEx5" href="#addTasks" aria-expanded="true"
                      aria-controls="collapse30">
                      <i class="far fa-plus-square collapseLogo fa-2x p-3 mr-4 float-left black-text" aria-hidden="true"></i>
                      <h4 class="text-uppercase mb-0 py-3 mt-1 collapseTitle" style={{ textDecoration: "none" }}>
                        ADD AND EDIT AVAILABLE TASKS
                  </h4>
                    </a>
                  </div>
                  <div id="addTasks" class="collapse" role="tabpanel" aria-labelledby="heading30" data-parent="#accordionEx5">
                    <div class="card-body rgba-black-light white-text z-depth-1">
                      <p>As as ADMIN, in this section,you can add or delete task to the list of available tasks.
                        <button type="button" className=" btn btn-link " data-toggle="modal" data-target="#tasksList">
                          See or modify available tasks.
                        </button>
                      </p>
                      {/* -- Modal task form -- */}
                      <div className="modal fade" id="tasksList" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 ">
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
                                        <th scope="row" className="align-middle">{++indice3}</th>
                                        <td className="align-middle">{task.description} </td>
                                        {/* <td className="align-middle"><button type="button" class="btn btn-outline-danger" onClick={() => handleClick2(task.id)}><i className="far fa-trash-alt"></i></button></td> */}
                                        <td className="align-middle"><button type="button" class="btn btn-outline-success" data-dismiss="modal" onClick={() => handleClick2(task.id)}><i className="fas fa-pencil-alt"></i></button></td>

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
                      <div className="container box_container2">
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Description</label>
                            <textarea onChange={handleChange} value={state.description} name="description" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                          </div>
                          <button className="btn btn-info btn-block mb-2" style={{ backgroundColor: "#1d57a8", borderColor: "#1d57a8" }}>Create Task</button>

                        </form>
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
              ) : (
                  null
                )
              }
            </>
          </div>
        </div>
      ) : (
          null
        )
      }
    </Fragment >
  )
}
