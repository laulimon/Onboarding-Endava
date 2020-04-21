import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css"
import "../css/style2.scss"

export default ({ user, onLogout, path }) => {
  return (
    <>
      {(user.id && path.path) ? (
        <div className="wrapper">
          <div className="sidebar">
            <div style={{ marginBottom: "15%" }} >
              <a className="sidebar-brand" href={`/dashboard/${user.id}`}>
                <img src="/images/logo/Endava_Logo_GyR.svg" />
              </a>
            </div>
            <div>
              <center><h6 className="welcome"> Welcome {user.name}!</h6></center>
            </div>
            {/* BOTON LOGOUT */}
            <ul>
              <li>
                <button onClick={onLogout} className="linkSection btn btn-link" type="button">
                  <i className="fa fa-sign-out-alt"></i>  Log Out
                </button>
              </li>
              {/* DASHBOARD */}
              <li>
                <a className="linkSection" href={`/dashboard/${user.id}`} ><i className="fas fa-chart-line"></i> Dashboard</a>
              </li>
              {/* TASK */}
              <li>
                <button className="linkSection btn btn-link" type="button" data-toggle="collapse" data-target="#myTasks" aria-expanded="false" aria-controls="collapseExample">
                  <i className="fas fa-list-ol"></i>  &nbsp;Tasks
                </button>

                <> {(path.path === "/myTasks/:userId" || path.path === "/myPendingTasks/:userId" || path.path === "/myFinishedTasks/:userId" || path.path === "/TeamPendingTasks/:userId" || path.path === "/TeamFinishedTasks/:userId" || path.path === "/AddOrEditAvailableTasks" || path.path === "/editAvailableTasks/:taskId" || path.path === "/task/:taskId") ? (
                  <div className="collapse show" id="myTasks">
                    <div >
                      <a className="linkInternos" href={`/myPendingTasks/${user.id}`}  > My tasks</a>
                      <a className="linkInternos" href={`/myFinishedTasks/${user.id}`}  > My finished tasks</a>
                      <>
                        {(user.isAdmin) ? (
                          <>
                            <a className="linkInternos" href={`/TeamPendingTasks/${user.id}`}  > Team unfinished tasks</a>
                            <a className="linkInternos" href={`/TeamFinishedTasks/${user.id}`}  > Team finished tasks</a>
                            <a className="linkInternos" href={"/AddOrEditAvailableTasks"}  > Add or edit available tasks</a>

                          </>
                        ) :
                          null
                        }
                      </>
                    </div>
                  </div>
                ) : (
                    <div className="collapse" id="myTasks">
                      <div >
                        <a className="linkInternos" href={`/myPendingTasks/${user.id}`}  > My tasks</a>
                        <a className="linkInternos" href={`/myFinishedTasks/${user.id}`}  > My finished tasks</a>
                        <>
                          {(user.isAdmin) ? (
                            <>
                              <a className="linkInternos" href={`/TeamPendingTasks/${user.id}`}  > Team unfinished tasks</a>
                              <a className="linkInternos" href={`/TeamFinishedTasks/${user.id}`}  > Team finished tasks</a>
                              <a className="linkInternos" href={"/AddOrEditAvailableTasks"}  > Add or edit available tasks</a>

                            </>
                          ) :
                            null
                          }
                        </>
                      </div>
                    </div>
                  )}
                </>
              </li>
              <>
                {(user.isAdmin) ? (
                  <>
                    {/* NEW HIRES */}
                    <li>
                      <button className="linkSection btn btn-link" type="button" data-toggle="collapse" data-target="#newHires" aria-expanded="false" aria-controls="collapseExample">
                        <i className="fas fa-users"></i> &nbsp;New Hires
                      </button>

                      <> {(path.path === "/recruits" || path.path === "/manageRecruits" || path.path === "/manageRecruits/tasks/:recruitId" || path.path === "/manageRecruits/edit/:recruitId" || path.path === "/newRecruit") ? (
                        <div className="collapse show" id="newHires">
                          <div >
                            <a className="linkInternos" href="/newRecruit" > Register a new hire</a>
                            <a className="linkInternos" href="/recruits" > All new hires</a>
                            <a className="linkInternos" href="/manageRecruits" > Edit, delete or add tasks to new hires</a>
                          </div>
                        </div>
                      ) : (
                          <div className="collapse" id="newHires">
                            <div >
                              <a className="linkInternos" href="/newRecruit" > Register a new hire</a>
                              <a className="linkInternos" href="/recruits" > All new hires</a>
                              <a className="linkInternos" href="/manageRecruits" > Edit, delete or add tasks to new hires</a>
                            </div>
                          </div>
                        )
                      }
                      </>
                    </li>
                    {/* USERS */}
                    <li>
                      <button className="linkSection btn btn-link" type="button" data-toggle="collapse" data-target="#users" aria-expanded="false" aria-controls="collapseExample">
                        <i className="fas fa-user"></i> &nbsp;Users
                      </button>


                      <> {(path.path === "/users" || path.path === "/deleteUser/:userId") ? (
                        <div className="collapse show" id="users">
                          <div >
                            <a className="linkInternos" href="/users" >Manage users profile</a>
                           
                          </div>
                        </div>
                      ) : (
                          <div className="collapse" id="users">
                            <div >
                              <a className="linkInternos" href="/users" >Manage users profile</a>
                              
                            </div>
                          </div>
                        )
                      }
                      </>
                    </li>
                  </>
                ) :
                  null
                }
              </>
            </ul>

          </div>
        </div>
      ) : (
          null
        )
      }
    </>
  )
};
