import React, { Fragment } from "react";
import "../css/style.css"
import {Bar, Line, Pie, Doughnut} from "react-chartjs-2";

export default ({ allRecruits, allDisciplines, allRecruitsDash, state }) => {
  
    if(allRecruits.length && allDisciplines.length){

      if(!allRecruitsDash.length){

          let disciplines={}

          allDisciplines.map((discipline)=>{
                  disciplines[discipline.description] =0
          })

          allRecruits.map((recruit)=>{
            disciplines[recruit.discipline.description] += 1
          })


          let disciplinesKeyValueArray=Object.entries(disciplines)
          let arrDis=[]
          let arrVal=[]

          disciplinesKeyValueArray.map((arr)=>{
            arrDis.push(arr[0]);
            arrVal.push(arr[1])
          })


          let data = {
            labels: arrDis,
            datasets:[
              {
                data:arrVal,
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
              title: {
                display: true,
                text: "New Hires by Discipline"
            },
              cutoutPercentage:50
          }


          return (
              <Fragment>
                <div className="chart">
                  <Doughnut
                    data={data}
                    options={options}
                  />
                </div>
              </Fragment>
          )
      }else{

        let disciplines={}

          allDisciplines.map((discipline)=>{
            disciplines[discipline.description] =0
          })

          allRecruitsDash.map((recruit)=>{
            let fromDate = new Date(state.fromDate2);
            let toDate = new Date(state.toDate2);
            let createdDate = new Date(recruit.entryDate);
            if (createdDate>fromDate && createdDate<toDate){
              disciplines[recruit.discipline.description] += 1
            }
          })


          let disciplinesKeyValueArray=Object.entries(disciplines)
          let arrDis=[]
          let arrVal=[]

          disciplinesKeyValueArray.map((arr)=>{
            arrDis.push(arr[0]);
            arrVal.push(arr[1])
          })


          let data = {
            labels: arrDis,
            datasets:[
              {
                data:arrVal,
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

          let start1 = state.fromDate2.split("-")
          let split1 = start1.reverse()
          let firstDate = split1.join("/")
          let start2 = state.toDate2.split("-")
          let split2 = start2.reverse()
          let secondDate = split2.join("/")

          let options={
              legend:{
                position:"right",
              },
              title: {
                display: true,
                text: `New Hires by Discipline From ${firstDate} To ${secondDate}`
            },
              cutoutPercentage:50
          }


          return (
              <Fragment>
                <div className="chart">
                  <Doughnut
                    data={data}
                    options={options}
                  />
                </div>
              </Fragment>
          )
      } 

    }else{
      return(
        <div>Cargando</div>
      )
    }

}
