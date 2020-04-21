import React from "react";
import "../css/style.css";
import "../css/style2.scss";

import Chart1Component from "./Chart1Component";
import Chart2Component from "./Chart2Component";
import Chart3Component from "./Chart3Component";
import Chart4Component from "./Chart4Component";

import Chart1ComponentRegularUser from "./Chart1ComponentRegularUser";
import Chart2ComponentRegularUser from "./Chart2ComponentRegularUser"
import Chart3ComponentRegularUser from "./Chart3ComponentRegularUser";
import Chart4ComponentRegularUser from "./Chart4ComponentRegularUser";


export default ({ allTasks, handleSubmit3, handleSubmitChart2, allRecruitsDash, recruitsDashRegular, allTasksDash, allRecruits, allTaskDash3, allDisciplines, allUsers, handleChange, state, handleSubmit, handleSubmit2, usersTasks, idUser, user, tasksDash, taskDash3 }) => {

  if (allTasks.length && allDisciplines.length && allUsers.length && usersTasks.length) {

    return (

      <div class="parentGraph">

        <div class="div1Graph">
          <div class="card dashCardGraphic">
            <div data-toggle="modal" data-target=".bd-example-modal-lg">
              {(user.isAdmin) ? <Chart1Component allTasks={allTasks} state={state} allTasksDash={allTasksDash} user={user} /> : <Chart1ComponentRegularUser tasksDash={tasksDash} allTasks={allTasks} state={state} allTasksDash={allTasksDash} user={user} usersTasks={usersTasks} />}
            </div>
            <div class="card-body bodyCard2">
              <form onSubmit={handleSubmit2}>
                <div class="container">
                  <div class="row">
                    <div class="col-5">From Date</div>
                    <div class="col-5">To Date</div>
                  </div>
                </div>

                <div class="container ">
                  <div class="row form-group input-group">
                    <input type="date" name="fromDate" className="form-control" placeholder="Select Date" onChange={handleChange} />
                    <input type="date" name="toDate" className="form-control" placeholder="Select Date" onChange={handleChange} />
                    <button type="submit" class="btn btn-light"><i class="fas fa-search"></i></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                {(user.isAdmin) ? <Chart1Component allTasks={allTasks} state={state} allTasksDash={allTasksDash} user={user} /> : <Chart1ComponentRegularUser tasksDash={tasksDash} allTasks={allTasks} state={state} allTasksDash={allTasksDash} user={user} usersTasks={usersTasks} />}
              </div>
            </div>
          </div>
        </div>

        <div class="div2Graph">

          <div class="dashCardGraphic card" >
            <div data-toggle="modal" data-target=".bd-example3-modal-lg">
              {(user.isAdmin) ? <Chart4Component allUsers={allUsers} allTasks={allTasks} usersTasks={usersTasks} state={state} idUser={idUser} user={user} /> : <Chart4ComponentRegularUser allUsers={allUsers} allTasks={allTasks} usersTasks={usersTasks} state={state} idUser={idUser} user={user} />}
            </div>
            <div class="card-body bodyCard2">
              <h5 class="card-title">Task Stats</h5>
              <form onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col-sm">
                    <select selected="" name="responsable" className="form-control border1" onChange={handleChange} value={state.responsable}>
                      <option className="border1">Select Responsable</option>
                      {(user.isAdmin) ? (
                        allUsers.map((userOption) => (
                          <option key={userOption.id} className="border1">{userOption.name} {userOption.lastName} ({userOption.id})</option>
                        )
                        )
                      ) : (
                          allUsers.map((userOption) => {
                            if (userOption.id == idUser) {
                              return (
                                <option key={userOption.id} className="border1">{userOption.name} {userOption.lastName} ({userOption.id})</option>
                              )
                            }
                          })
                        )}
                    </select>
                  </div>
                  <div class="col-sm">
                    <button type="submit" class="btn btn-light"><i class="fas fa-search"></i></button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="modal fade bd-example3-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                {(user.isAdmin) ? <Chart4Component allUsers={allUsers} allTasks={allTasks} usersTasks={usersTasks} state={state} idUser={idUser} user={user} /> : <Chart4ComponentRegularUser allUsers={allUsers} allTasks={allTasks} usersTasks={usersTasks} state={state} idUser={idUser} user={user} />}
              </div>
            </div>
          </div>
        </div>



        <div class="div4Graph">

          <div class="dashCardGraphic card" >
            <div data-toggle="modal" data-target=".bd-example1-modal-lg">
              {(user.isAdmin) ? (<Chart2Component allRecruits={allRecruits} state={state} allRecruitsDash={allRecruitsDash} allDisciplines={allDisciplines} user={user} />) : (<Chart2ComponentRegularUser allRecruits={allRecruits} state={state} allRecruitsDash={allRecruitsDash} recruitsDashRegular={recruitsDashRegular} allDisciplines={allDisciplines} user={user} />)}
            </div>
            <div class="card-body bodyCard2">
              <form onSubmit={handleSubmitChart2}>
                <div class="container">
                  <div class="row">
                    <div class="col-5">From Date</div>
                    <div class="col-5">To Date</div>
                  </div>
                </div>

                <div class="container ">
                  <div class="row form-group input-group">
                    <input type="date" name="fromDate2" className="form-control" placeholder="Select Date" onChange={handleChange} />
                    <input type="date" name="toDate2" className="form-control" placeholder="Select Date" onChange={handleChange} />
                    <button type="submit" class="btn btn-light"><i class="fas fa-search"></i></button>
                  </div>
                </div>

              </form>
            </div>
          </div>

          <div class="modal fade bd-example1-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                {(user.isAdmin) ? (<Chart2Component allRecruits={allRecruits} state={state} allRecruitsDash={allRecruitsDash} allDisciplines={allDisciplines} user={user} />) : (<Chart2ComponentRegularUser allRecruits={allRecruits} state={state} allRecruitsDash={allRecruitsDash} recruitsDashRegular={recruitsDashRegular} allDisciplines={allDisciplines} user={user} />)}
              </div>
            </div>
          </div>

        </div>


        <div class="div3Graph">

          <div class="dashCardGraphic card">
            <div data-toggle="modal" data-target=".bd-example2-modal-lg">
              {(user.isAdmin) ? <Chart3Component allUsers={allUsers} allTasksDash={allTasksDash} allTaskDash3={allTaskDash3} state={state} allTasks={allTasks} user={user} /> : <Chart3ComponentRegularUser state={state} taskDash3={taskDash3} allUsers={allUsers} usersTasks={usersTasks} allTasks={allTasks} user={user} />}
            </div>
            <div class="card-body bodyCard2">
              <form onSubmit={handleSubmit3}>
                <div class="container">
                  <div class="row">
                    <div class="col-5">From Date</div>
                    <div class="col-5">To Date</div>
                  </div>
                </div>

                <div class="container ">
                  <div class="row form-group input-group">
                    <input type="date" name="fromDate3" className="form-control" placeholder="Select Date" onChange={handleChange} />
                    <input type="date" name="toDate3" className="form-control" placeholder="Select Date" onChange={handleChange} />
                    <button type="submit" class="btn btn-light"><i class="fas fa-search"></i></button>
                  </div>
                </div>

              </form>
            </div>
          </div>

          <div class="modal fade bd-example2-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                {(user.isAdmin) ? <Chart3Component allUsers={allUsers} allTaskDash3={allTaskDash3} allTasksDash={allTasksDash} allTasks={allTasks} state={state} user={user} /> : <Chart3ComponentRegularUser taskDash3={taskDash3} state={state} usersTasks={usersTasks} allUsers={allUsers} allTasks={allTasks} user={user} />}
              </div>
            </div>
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
