import React, { Fragment } from "react";
import "../css/style.css"
import { Bar, Line, Pie } from "react-chartjs-2";

export default ({allTasks, taskDash3, state, usersTasks}) => {
  
  if(!taskDash3.length){
  let taskCategory = {}

  usersTasks.map((task) => {
    if(task.state==="blocked out"){
      taskCategory[task.task.description] =0
    }
  })

  usersTasks.map((task) => {
    if(task.state==="blocked out"){
      taskCategory[task.task.description] += 1
    }
  })

  let arrBloqueadasKeyyVal= Object.entries(taskCategory)
  let arrKey=[];
  let arrVal=[];

  arrBloqueadasKeyyVal.map ((arr)=>{
    arrKey.push(arr[0]);
    arrVal.push(arr[1])
  })

          let data = {
            labels:arrKey,
            datasets:[
              {
                data:arrVal,
                label:"Titulo",
                backgroundColor:[
                  "#48545B",,
                  "#9BB4BE",
                  "#F0F3F3",
                  "#404040",
                  "#C31900",
                  "#ed6861",
                  "#BFBFBF",
                  "#F2F2F2",
                ]
              }
            ],
          }

  let options = {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Distribution of Blocked Tasks by Categories"
  }
  }

  return (
    <Fragment>
      <div className="chart">
        <Pie
          data={data}
          options={options}
        />
      </div>
    </Fragment>
  )
  }else{
    let taskCategory = {}

    taskDash3.map((task) => {
      let fromDate = new Date(state.fromDate3);
      let toDate = new Date(state.toDate3);
      let createdDate = new Date(task.createdAt);

        if (createdDate>fromDate && createdDate<toDate){
          if(task.state==="blocked out"){
            taskCategory[task.task.description] =0
          }
        }
    })

    taskDash3.map((task) => {
      if(task.state==="blocked out"){
        taskCategory[task.task.description] += 1
      }
    })

  let arrBloqueadasKeyyVal= Object.entries(taskCategory)
  let arrKey=[];
  let arrVal=[];

  arrBloqueadasKeyyVal.map ((arr)=>{
    arrKey.push(arr[0]);
    arrVal.push(arr[1])
  })

          let data = {
            labels:arrKey,
            datasets:[
              {
                data:arrVal,
                label:"Titulo",
                backgroundColor:[
                  "#48545B",,
                  "#9BB4BE",
                  "#F0F3F3",
                  "#404040",
                  "#C31900",
                  "#ed6861",
                  "#BFBFBF",
                  "#F2F2F2",
                ]
              }
            ],
          }
          let start1 = state.fromDate3.split("-")
          let split1 = start1.reverse()
          let firstDate = split1.join("/")
          let start2 = state.toDate3.split("-")
          let split2 = start2.reverse()
          let secondDate = split2.join("/")

  let options = {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: `Distribution of Blocked Tasks by Categories From ${firstDate} To ${secondDate}`
  }
  }

  return (
    <Fragment>
      <div className="chart">
        <Pie
          data={data}
          options={options}
        />
      </div>
    </Fragment>
  )
  }
}
