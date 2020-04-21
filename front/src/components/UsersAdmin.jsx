import React, { Fragment } from "react"
import { Link } from "react-router-dom"

export default ({ users, handleProfile, handleSearchInput, redirection, onSortChange, state }) => {
  let indice = 0
  let orden = state.currentSort === "down" ? [...users].sort(state.sortTypes) : [...users].sort(state.sortTypes).reverse()
  return (
    <Fragment>
      <div className="parentUsers" >
        {(users.length) ?
          (
            <div className="div1Users" >
              <h1 className="titleSection componentTitle">MANAGE USERS PROFILE</h1>
              <br />
              <div className="container box_container5 margen" >
                <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 ">
                  <input class="form-control form-control-sm mr-3 ancho" type="text" placeholder="Search for Name" onChange={handleSearchInput}
                    aria-label="Search" />
                  <i class="fas fa-search searchColor" aria-hidden="true"></i>
                </form>
              </div>
              <div>
                <div className="container box_container5">
                  <table className="table table-striped">
                    <thead>
                      <tr className="table1">
                        <th scope="col">#</th>
                        <th scope="col"><div onClick={() => onSortChange("name")}>Name
                        {(state.sortCol === "name") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("discipline.description")}>Discipline
                        {(state.sortCol === "discipline.description") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i>
                            : ""}
                        </div></th>
                        <th scope="col"><div onClick={() => onSortChange("email")}>Email
                        {(state.sortCol === "email") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                            : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                        </div></th>
                        <th scope="col">Profile </th>
                        <th scope="col"> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orden.map((user) => {
                        indice = indice + 1
                        return (

                          <tr key={user.id}>
                            <th scope="row" className="align-middle">{indice}</th>
                            <td className="align-middle">{user.name} {user.lastName}</td>
                            <td className="align-middle">{user.discipline.description}</td>
                            <td className="align-middle">{user.email}</td>
                            <td className="align-middle">
                              <>
                                {(user.isAdmin) ? ("Admin") : ("Regular User")}
                              </>
                            </td>
                            <button type="button" className="align-middle btn btn-outline-danger" style={{ marginTop: "12px", marginBottom: "12px" }} data-toggle="modal" data-target={`#changeProfile${indice}`}>Change profile</button>
                            {/* <!-- Modal --> */}
                            <div className="modal fade" id={`changeProfile${indice}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                              <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">Profile change request</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <>
                                      {(user.isAdmin) ? ("Change this user's profile from ADMIN to REGULAR USER") : ("Change this user's profile from REGULAR USER to ADMIN")}
                                    </>
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                    <button onClick={() => handleProfile(user.id, user.isAdmin)} data-dismiss="modal" type="button" className="btn btn-primary">Yes</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button type="button" className="align-middle btn btn-outline-danger" style={{ marginLeft: "5px", marginTop: "12px", marginBottom: "12px" }} data-toggle="modal" data-target={`#deleteUser${indice}`}><i className="far fa-trash-alt"></i></button>
                            {/* <!-- Modal Delete User --> */}
                            <div className="modal fade" id={`deleteUser${indice}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                              <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">Delete user request</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <>
                                      {(user.isAdmin) ? (`Do you want to delete this ADMIN: ${user.name} ${user.lastName}?`) : (`Do you want to delete this REGULAR USER: ${user.name} ${user.lastName}?`)}
                                    </>
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                    <button data-dismiss="modal" type="button" className="btn btn-primary" onClick={() => redirection(user.id)}>Yes</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </tr>

                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}
      </div>
    </Fragment>

  )
}
