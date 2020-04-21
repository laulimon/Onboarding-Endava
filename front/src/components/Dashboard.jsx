import React from "react";
import "../css/style.css"
import "../css/style2.scss"

export default ({ allTasks, user, usersTasks }) => {

  if (allTasks.length && user.id && usersTasks) {

    if (user.isAdmin === true) {

      let arrBlocked = [];
      let arrExpired = [];
      let arrOngoing = [];
      let arrPending = [];

      allTasks.map((task) => {
        (task.state === "pending") ? arrPending.push(task) : null;
        (task.state === "started") ? arrOngoing.push(task) : null;
        (task.state === "blocked out") ? arrBlocked.push(task) : null;
        if (task.state !== "finished") {
          if (new Date(task.dueDate) < new Date) arrExpired.push(task)
        }
      })

      return (

        <div class="parentDash">


          <div class="div1Dash shrink">

            <a href="#home-tab">
              <div className=" dashCard2 card ">
                <div className="card-img-top HeaderCard EndavaDash3-5-hex">
                  <i className="fas fa-ban text-center"></i><span className="bodyCardTitle">BLOCKED</span>
                </div>
                <div className="card-body bodyCard">
                  <p className="card-text text-center">{arrBlocked.length}</p>
                </div>
              </div>
            </a>

          </div>

          <div class="div2Dash shrink">

            <a href="#profile-tab">
              <div className=" dashCard2 card">
                <div className="card-img-top HeaderCard EndavaDash3-5-hex">
                  <i class="far fa-calendar-times"></i><span className="bodyCardTitle">EXPIRED</span>
                </div>
                <div className="card-body bodyCard">
                  <p className="card-text text-center">{arrExpired.length}</p>
                </div>
              </div>
            </a>

          </div>

          <div class="div3Dash shrink">

            <div className=" dashCard2 card">
              <div className="card-img-top HeaderCard EndavaDash3-5-hex">
                <i class="fas fa-list-ul"></i><span className="bodyCardTitle">ONGOING</span>
              </div>
              <div className="card-body bodyCard">
                <p className="card-text text-center">{arrOngoing.length}</p>
              </div>
            </div>

          </div>

          <div class="div4Dash shrink">

            <a href="#contact-tab ">
              <div className=" dashCard2 card">
                <div className="card-img-top HeaderCard EndavaDash3-5-hex">
                  <i class="far fa-clock"></i><span className="bodyCardTitle">PENDING</span>
                </div>
                <div className="card-body bodyCard">
                  <p className="card-text text-center">{arrPending.length}</p>
                </div>
              </div>
            </a>

          </div>

        </div>

      )
    } else {

      let arrBlocked = [];
      let arrExpired = [];
      let arrOngoing = [];
      let arrPending = [];

      usersTasks.map((task) => {
        (task.state === "pending") ? arrPending.push(task) : null;
        (task.state === "started") ? arrOngoing.push(task) : null;
        (task.state === "blocked out") ? arrBlocked.push(task) : null;
        if (task.state !== "finished") {
          if (new Date(task.dueDate) < new Date) arrExpired.push(task)
        }
      })

      return (

        <div class="parentDash">


          <div class="div1Dash shrink">

            <a href="#home-tab">
              <div className=" dashCard2 card ">
                <div className="card-img-top HeaderCard EndavaDash3-5-hex">
                  <i className="fas fa-ban text-center"></i><span className="bodyCardTitle">BLOCKED</span>
                </div>
                <div className="card-body bodyCard">
                  <p className="card-text text-center">{arrBlocked.length}</p>
                </div>
              </div>
            </a>

          </div>


          <div class="div2Dash shrink">

            <a href="#profile-tab">
              <div className=" dashCard2 card">
                <div className="card-img-top HeaderCard EndavaDash3-5-hex">
                  <i class="far fa-calendar-times"></i><span className="bodyCardTitle">EXPIRED</span>
                </div>
                <div className="card-body bodyCard">
                  <p className="card-text text-center">{arrExpired.length}</p>
                </div>
              </div>
            </a>

          </div>


          <div class="div3Dash shrink">

            <div className=" dashCard2 card">
              <div className="card-img-top HeaderCard EndavaDash3-5-hex">
                <i class="fas fa-list-ul"></i><span className="bodyCardTitle">ONGOING</span>
              </div>
              <div className="card-body bodyCard">
                <p className="card-text text-center">{arrOngoing.length}</p>
              </div>
            </div>

          </div>


          <div class="div4Dash shrink">

            <a href="#contact-tab ">
              <div className=" dashCard2 card">
                <div className="card-img-top HeaderCard EndavaDash3-5-hex">
                  <i class="far fa-clock"></i><span className="bodyCardTitle">PENDING</span>
                </div>
                <div className="card-body bodyCard">
                  <p className="card-text text-center">{arrPending.length}</p>
                </div>
              </div>
            </a>

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
