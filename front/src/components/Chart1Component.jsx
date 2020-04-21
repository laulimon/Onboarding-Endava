import React, { Fragment } from "react";
import "../css/style.css"
import {Bar, Line, Pie, Doughnut, HorizontalBar} from "react-chartjs-2";

export default ({ allTasks, state, allTasksDash }) => {

  if(allTasksDash.length){

    let taskWanted=[];
    let arrBlocked=[];
    let arrExpired=[];
    let arrOngoing=[];
    let arrPending=[];
    let arrFinished=[];

          allTasksDash.map((task)=>{
            let fromDate = new Date(state.fromDate);
            let toDate = new Date(state.toDate);
            let createdDate = new Date(task.createdAt);

              if (createdDate>fromDate && createdDate<toDate) taskWanted.push(task)
          })

          taskWanted.map((task)=>{
            (task.state === "pending") ? arrPending.push(task) : null;
            (task.state === "started") ? arrOngoing.push(task) : null;
            (task.state === "blocked out") ? arrBlocked.push(task) : null;
            (task.state === "finished") ? arrFinished.push(task) : null;
            if (task.state !== "finished") {
              if (new Date(task.dueDate) < new Date) arrExpired.push(task)
            }
          })

          let data = {
            labels:["Blocked","Expired", "Ongoing", "Pending", "Finished" ],
            datasets:[
              {
                data:[arrBlocked.length, arrExpired.length,arrOngoing.length, arrPending.length, arrFinished.length],
                label:"Titulo",
                backgroundColor:[
                  "#C31900",
                  "#ed6861",
                  "#BFBFBF",
                  "#F2F2F2",
                  "#48545B"
                ]
              }
            ],
          }

          let start1 = state.fromDate.split("-")
          let split1 = start1.reverse()
          let firstDate = split1.join("/")
          let start2 = state.toDate.split("-")
          let split2 = start2.reverse()
          let secondDate = split2.join("/")

          let options={
              legend:{
                position:"right",
              },
              scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
              title: {
                display: true,
                text: `State of the Tasks Created From ${firstDate} To ${secondDate}`
            }
          }

          return (
              <Fragment>
                <div className="chart">
                  <HorizontalBar
                    data={data}
                    options={options}
                  />
                </div>
              </Fragment>
          )

  }else{
    let lastThirtyDays=[];
    let arrBlocked=[];
    let arrExpired=[];
    let arrOngoing=[];
    let arrPending=[];
    let arrFinished=[];

    allTasks.map((task)=>{
      var created = new Date(task.createdAt);
      var today = new Date();

      // To calculate the time difference of two dates
      var Difference_In_Time = today.getTime() - created.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);


        if (Math.round(Difference_In_Days) < 30) lastThirtyDays.push(task)
    })


          lastThirtyDays.map((task)=>{
            (task.state === "pending") ? arrPending.push(task) : null;
            (task.state === "started") ? arrOngoing.push(task) : null;
            (task.state === "blocked out") ? arrBlocked.push(task) : null;
            (task.state === "finished") ? arrFinished.push(task) : null;
            if (task.state !== "finished") {
              if (new Date(task.dueDate) < new Date) arrExpired.push(task)
            }
          })

          let data = {
            labels:["Blocked","Expired", "Ongoing", "Pending", "Finished" ],
            datasets:[
              {
                data:[arrBlocked.length, arrExpired.length,arrOngoing.length, arrPending.length, arrFinished.length],
                label:"Titulo",
                backgroundColor:[
                  "#C31900",
                  "#ed6861",
                  "#BFBFBF",
                  "#F2F2F2",
                  "#48545B"
                ]
              }
            ],
          }

          let options={
              legend:{
                position:"right",
              },
              scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
              title: {
                display: true,
                text: "Last 30 Days Tasks's State"
            }
          }

          return (
              <Fragment>
                <div className="chart">
                  <HorizontalBar
                    data={data}
                    options={options}
                  />
                </div>
              </Fragment>
          )
  }
}
