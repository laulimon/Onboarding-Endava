import React, { Fragment } from "react";
import "../css/style.css"
import {Bar, Line, Pie, HorizontalBar} from "react-chartjs-2";

export default ({ usersTasks, state, allUsers, idUser }) => {

    if(!usersTasks.length){

        return (
            <div class="spinner-border text-danger" role="status" style={{ marginTop: "20%", marginLeft: "50%" }}>
                <span class="sr-only">Loading...</span>
            </div>
        )

    }else if(usersTasks.length && allUsers.length){

        let arrBlocked=[];
        let arrExpired=[];
        let arrOngoing=[];
        let arrPending=[];
        let arrFinished=[];
        let userName;

        if(state.responsable){
            let fin = state.responsable.indexOf("(") - 1
            userName = state.responsable.slice(0, fin);
        }else{
            allUsers.map((user) => {
                (user.id == idUser) ? (userName = user.name + " " + user.lastName) : (null)
            })
        }

        usersTasks.map((task)=>{
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
            data:[arrBlocked.length, arrExpired.length, arrOngoing.length, arrPending.length, arrFinished.length],
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

        let options = {
        legend: {
            position: "right",
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: `State of ${userName}'s Tasks`
        }
        }

        return (
            <Fragment>
            <div className="chart">
                <Bar
                data={data}
                options={options}
                />
            </div>
            </Fragment>
        )
    }
}
