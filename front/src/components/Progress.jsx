import React from "react";
import "../css/style.css"
import "../css/style2.scss"
import SingleRecruitDashboard from "./SingleRecruitDashboard"
import SingleRecruitDashboardRegularUser from "./SingleRecruitDashboardRegularUser"

export default ({allTasks,allRecruits, handleClickDash, tasksRecruit,user, usersTasks}) => {

  if(allTasks.length && allRecruits.length && user.id && usersTasks){
   if(user.isAdmin===true){
     return(
         <div className="parentProgress">
           <div className="div1Progress">
             <div className="box_container4" > 
               <h5 class="card-title2 card-title3">NEW HIRES ONBOARDING PROCESS</h5>
               
                {allRecruits.map((recruit)=>{
                  let recruitTasks=[];
                  let finishedTasks=[];
                  let porcentage=0;
                  let color;

                  {allTasks.map((task)=>{
                      if (task.recruitId==recruit.id) recruitTasks.push(task)
                      if (task.state==="finished" && task.recruitId==recruit.id) finishedTasks.push(task)
                      if (recruitTasks.length){
                        porcentage=finishedTasks.length*100/recruitTasks.length
                      }
                    })
                  }

                  {
                    if (porcentage <= 25) color= "#cc0000"
                    else if (porcentage <= 50) color= "#ff8800"
                    else if (porcentage <= 99) color= "#0099cc"
                    else if (porcentage = 100) color= "#007e33"
                  }

                    return(
                    <>
                      <div  data-toggle="modal" data-target=".uno" onClick={()=>handleClickDash(recruit.id)}>
                        <p>{recruit.name} {recruit.lastName}, {Math.floor(porcentage)}% completed </p>
                            <div className="progress">
                              <div className= "progress-bar" role="progressbar" style= {{width: `${porcentage}%` ,backgroundColor:`${color}`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                      </div>

                      <div class="modal fade uno" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                          <div class="modal-content">
                            <SingleRecruitDashboard tasksRecruit={tasksRecruit}/>
                          </div>
                        </div>
                      </div>
                    </>
                    )
                  })
                }
               </div>
            </div>
          </div>

    )}else{
      
      return(

        <div className="parentProgress">
          <div className="div1Progress">

            <div className="box_container4" > 
              <h5 class="card-title2 card-title3">NEW HIRES ONBOARDING PROCESS</h5>

              {allRecruits.map((recruit)=>{
                let recruitTasks=[];
                let finishedTasks=[];
                let porcentage=0;
                let color;

                {usersTasks.map((task)=>{
                    if (task.recruitId==recruit.id) recruitTasks.push(task)
                    if (task.state==="finished" && task.recruitId==recruit.id) finishedTasks.push(task)
                    if (recruitTasks.length){
                      porcentage=finishedTasks.length*100/recruitTasks.length
                    }
                  })
                }

                {
                 if (porcentage <= 25) color= "#cc0000"
                 else if (porcentage <= 50) color= "#ff8800"
                 else if (porcentage <= 99) color= "#0099cc"
                 else if (porcentage = 100) color= "#007e33"
               }

               if(recruitTasks.length){
                  return(
                    <>
                      <div  data-toggle="modal" data-target=".uno" onClick={()=>handleClickDash(recruit.id)}>
                        <p>{recruit.name} {recruit.lastName}, {Math.floor(porcentage)}% completed </p>
                            <div className="progress">
                              <div className= "progress-bar" role="progressbar" style= {{width: `${porcentage}%` ,backgroundColor:`${color}`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                      </div>

                      <div class="modal fade uno" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                          <div class="modal-content">
                            <SingleRecruitDashboardRegularUser tasksRecruit={tasksRecruit} user={user}/>
                          </div>
                      </div>
                      </div>
                    </>
                    )
                }
                })
              }

            </div>
          </div>
        </div>
      )}

 }else {
    return (
        <div class="spinner-border text-danger" role="status" style={{ marginTop: "20%", marginLeft: "50%" }}>
            <span class="sr-only">Loading...</span>
        </div>
    )
  }

}
