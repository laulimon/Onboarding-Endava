import React, { Fragment } from "react";
import "../css/style.css"
import { Link } from "react-router-dom"
import SingleRecruitAddTaskContainer from "../containers/SingleRecruitAddTaskContainer"



export default ({ state, recruits, handleSearchInput, onSortChange, handleDeleteRecruit, handlerClick, allTasks }) => {
  let indice = 0
  let orden = state.currentSort === "down" ? [...recruits].sort(state.sortTypes) : [...recruits].sort(state.sortTypes).reverse()
  return (
    <div style={{ padding: "3%" }}>

      <h1 className="componentTitle">Manage New Hires</h1>
      <br />
      <div className="container box_container2 margen">
        <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 ">
          <input class="form-control form-control-sm mr-3 ancho" type="text" placeholder="Search for Name" onChange={handleSearchInput}
            aria-label="Search" />
          <i class="fas fa-search searchColor" aria-hidden="true"></i>
        </form>
      </div>
      <div>
        <div className="container box_container2">
          <table className="table table-striped">
            <thead>
              <tr className="table1">
                <th scope="col">#</th>
                <th scope="col"><div onClick={() => onSortChange("name")}>Name
                        {(state.sortCol === "name") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                    : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                </div></th>
                <th scope="col"><div onClick={() => onSortChange("lastName")}>Last Name
                        {(state.sortCol === "lastName") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                    : <i class="far fa-arrow-alt-circle-up"></i> : ""}
                </div></th>
                <th scope="col"><div onClick={() => onSortChange("discipline.description")}>Discipline
                        {(state.sortCol === "discipline.description") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                    : <i class="far fa-arrow-alt-circle-up"></i>
                    : ""}
                </div></th>
                <th scope="col"><div onClick={() => onSortChange("entryDate", true)}>Entry Date
                        {(state.sortCol === "entryDate") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
                    : <i class="far fa-arrow-alt-circle-up"></i>
                    : ""}
                </div></th>
                <th scope="col" className="centerText">Edit</th>
                <th scope="col" className="centerText">Add Tasks</th>
                <th scope="col" className="centerText">Delete</th>
              </tr>
            </thead>
            <tbody>
              {orden.map((recruit) => {
                let allRecruitTasks = {}
                let tareas = false
                let fechaArray = recruit.entryDate.split("-")
                let fechaOrdenada = fechaArray.reverse()
                let dateOfEntry = fechaOrdenada.join("/")
                allRecruitTasks[`${recruit.id}`] = allTasks.map(task => { if (task.recruit.id === recruit.id) return task })
                indice = indice + 1
                return (
                  <tr key={recruit.id}>
                    <th scope="row" className="align-middle">{indice}</th>
                    <td className="align-middle">{recruit.name}</td>
                    <td className="align-middle">{recruit.lastName}</td>
                    <td className="align-middle">{recruit.discipline.description}</td>
                    <td className="align-middle">{dateOfEntry}</td>
                    <td className="align-middle centerText"><Link to={`/manageRecruits/edit/${recruit.id}`}><i class="fas fa-user-edit"></i></Link></td>
                    <td className="align-middle centerText"><Link to={`/manageRecruits/tasks/${recruit.id}`}><i class="fas fa-plus"></i></Link></td>
                    <td className="align-middle centerText"><button type="button" className=" btn btn-link " data-toggle="modal" data-target={`#delete${recruit.id}`}><i class="fas fa-trash"></i></button></td>
                    <div className="modal fade" id={`delete${recruit.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Delete new hire request</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <p>Do you want to delete {recruit.name} {recruit.lastName}?</p>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                            <button onClick={() => handleDeleteRecruit(recruit.id)} data-dismiss="modal" type="button" className="btn btn-primary">Yes</button>
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
  )
}