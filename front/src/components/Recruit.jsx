import React, { Fragment } from "react";
import "../css/style.css"
import { Link } from "react-router-dom"


export default ({ state, recruits, handleSearchInput, onSortChange }) => {
  let indice = 0
  let orden = state.currentSort === "down" ? [...recruits].sort(state.sortTypes) : [...recruits].sort(state.sortTypes).reverse()
  return (
    <div >
      <div style={{ textAlign: "center", marginTop: "3%" }} >
        <h1 className="componentTitle">ALL NEW HIRES</h1>
      </div>
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
                <th scope="col"><div onClick={() => onSortChange("email")}>Email
                        {(state.sortCol === "email") ? state.currentSort === "down" ? <i class="far fa-arrow-alt-circle-down"></i>
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
                <th scope="col">Phone</th>
                <th scope="col">DNI</th>
              </tr>
            </thead>
            <tbody>
              {orden.map((recruit) => {
                let fechaArray = recruit.entryDate.split("-")
                let fechaOrdenada = fechaArray.reverse()
                let dateOfEntry = fechaOrdenada.join("/")
                indice = indice + 1
                return (
                  <tr key={recruit.id}>
                    <th scope="row" className="align-middle">{indice}</th>
                    <td className="align-middle">{recruit.name}</td>
                    <td className="align-middle">{recruit.lastName}</td>
                    <td className="align-middle">{recruit.email}</td>
                    <td className="align-middle">{recruit.discipline.description}</td>
                    <td className="align-middle">{dateOfEntry}</td>
                    <td className="align-middle">{recruit.phone}</td>
                    <td className="align-middle">{recruit.DNI}</td>
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