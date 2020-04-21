import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "../components/Dashboard";
import Graphics from "../components/Graphics";
import DashboardRows from "../components/DashboardRows";
import Progress from "../components/Progress";
import SidebarContainer from "../containers/SidebarContainer";

import "../css/style.css"

import { searchAllTasks, searchAllTasksDash, searchAllTasksDash3 } from "../redux/actions/tasks";
import { searchRecruits, searchRecruits2, searchRecruits2Regular } from "../redux/actions/recruits"
import { searchDisciplines } from "../redux/actions/disciplines"
import { fetchUsers } from "../redux/actions/users"
import { searchTasks, searchTasksRecruits, searchTasksDash, searchTasksDash3 } from "../redux/actions/tasks"



class DashboardContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      responsable: "",
      fromDate: "",
      toDate: "",
      fromDate3: "",
      toDate3: "",
      fromDate2: "",
      toDate2: "",
      sortColBlocked: "task.description",
      sortTypesBlocked: (a, b) => a.task.description.toLowerCase().localeCompare(b.task.description.toLowerCase()),
      currentSortBlocked: 'down',
      sortColExpired: "task.description",
      sortTypesExpired: (a, b) => a.task.description.toLowerCase().localeCompare(b.task.description.toLowerCase()),
      currentSortExpired: 'down',
      sortColPending: "task.description",
      sortTypesPending: (a, b) => a.task.description.toLowerCase().localeCompare(b.task.description.toLowerCase()),
      currentSortPending: 'down',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmit2 = this.handleSubmit2.bind(this)
    this.handleClickDash = this.handleClickDash.bind(this)
    this.onSortChange = this.onSortChange.bind(this);
    this.handleSubmit3 = this.handleSubmit3.bind(this);
    this.handleSubmitChart2 = this.handleSubmitChart2.bind(this);
  }

  componentDidMount() {
    this.props.searchAllTasks()
    this.props.searchRecruits()
    this.props.searchDisciplines()
    this.props.fetchUsers()
    const idUser = this.props.match.params.userId
    this.props.searchTasks(idUser)
    this.setState({
      fromDate: "",
      toDate: "",
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.responsable) {
      let idUser;
      this.props.allUsers.map((user) => {
        let inicio = this.state.responsable.indexOf("(") + 1
        let fin = this.state.responsable.length - 1
        let idSelected = this.state.responsable.slice(inicio, fin);
        (parseInt(idSelected) == user.id) ? (idUser = user.id) : null
      })
      this.props.searchTasks(idUser)
    } else {
      alert("You must complete the field")
    }
  }

  handleSubmit2(e) {
    e.preventDefault();
    if (this.state.fromDate && this.state.toDate) {
      (this.props.user.isAdmin) ? (this.props.searchAllTasksDash()) : (this.props.searchTasksDash(this.props.user.id))
    } else {
      alert("You must complete all fields")
    }
  }

  handleSubmit3(e) {
    e.preventDefault();
    if (this.state.fromDate3 && this.state.toDate3) {
      (this.props.user.isAdmin) ? (this.props.searchAllTasksDash3()) : (this.props.searchTasksDash3(this.props.user.id))
    } else {
      alert("You must complete all fields")
    }
  }

  handleSubmitChart2(e) {
    e.preventDefault();
    if (this.state.fromDate2 && this.state.toDate2) {
      (this.props.user.isAdmin) ? (this.props.searchRecruits2()) : (this.props.searchRecruits2Regular())
    } else {
      alert("You must complete all fields")
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClickDash(id) {
    this.props.searchTasksRecruits(id)
  }
  onSortChange(columna, tabla, isDate = false) {
    if (tabla === "blocked") {
      if (!isDate) {
        if (columna !== this.state.sortColBlocked) {
          if (columna.includes(".")) {
            this.setState({ sortColBlocked: columna });
            this.setState({ currentSortBlocked: "down" });
            let columnaSplit = columna.split(".")
            this.setState({ sortTypesBlocked: (a, b) => a[columnaSplit[0]][columnaSplit[1]].toLowerCase().localeCompare(b[columnaSplit[0]][columnaSplit[1]].toLowerCase()) });
          } else {
            let col = columna
            this.setState({ sortColBlocked: columna });
            this.setState({ currentSortBlocked: "down" });
            this.setState({ sortTypesBlocked: (a, b) => a[col].toLowerCase().localeCompare(b[col].toLowerCase()) });
          }
        }
        else {
          let nextSort;
          if (this.state.currentSortBlocked === 'down') nextSort = 'up';
          else if (this.state.currentSortBlocked === 'up') nextSort = 'down';
          this.setState({
            currentSortBlocked: nextSort
          });
        }
      } else {
        if (columna !== this.state.sortColBlocked) {
          let col = columna
          this.setState({ sortColBlocked: columna });
          this.setState({ currentSortBlocked: "down" });
          this.setState({
            sortTypesBlocked: (a, b) => {
              let aSpliteado = a[col].split("-")
              let bSpliteado = b[col].split("-")
              a = new Date(aSpliteado[0], aSpliteado[1], aSpliteado[2]);
              b = new Date(bSpliteado[0], bSpliteado[1], bSpliteado[2]);
              return a < b ? -1 : a > b ? 1 : 0;
            }
          })
        }
        else {
          let nextSort;
          if (this.state.currentSortBlocked === 'down') nextSort = 'up';
          else if (this.state.currentSortBlocked === 'up') nextSort = 'down';
          this.setState({
            currentSortBlocked: nextSort
          });
        }
      }
    } else if (tabla === "expired") {
      if (!isDate) {
        if (columna !== this.state.sortColExpired) {
          if (columna.includes(".")) {
            this.setState({ sortColExpired: columna });
            this.setState({ currentSortExpired: "down" });
            let columnaSplit = columna.split(".")
            this.setState({ sortTypesExpired: (a, b) => a[columnaSplit[0]][columnaSplit[1]].toLowerCase().localeCompare(b[columnaSplit[0]][columnaSplit[1]].toLowerCase()) });
          } else {
            let col = columna
            this.setState({ sortColExpired: columna });
            this.setState({ currentSortExpired: "down" });
            this.setState({ sortTypesExpired: (a, b) => a[col].toLowerCase().localeCompare(b[col].toLowerCase()) });
          }
        }
        else {
          let nextSort;
          if (this.state.currentSortExpired === 'down') nextSort = 'up';
          else if (this.state.currentSortExpired === 'up') nextSort = 'down';
          this.setState({
            currentSortExpired: nextSort
          });
        }
      } else {
        if (columna !== this.state.sortColExpired) {
          let col = columna
          this.setState({ sortColExpired: columna });
          this.setState({ tablaExpiredExpired, currentSort: "down" });
          this.setState({
            sortTypesExpired: (a, b) => {
              let aSpliteado = a[col].split("-")
              let bSpliteado = b[col].split("-")
              a = new Date(aSpliteado[0], aSpliteado[1], aSpliteado[2]);
              b = new Date(bSpliteado[0], bSpliteado[1], bSpliteado[2]);
              return a < b ? -1 : a > b ? 1 : 0;
            }
          })
        }
        else {
          let nextSort;
          if (this.state.currentSortExpired === 'down') nextSort = 'up';
          else if (this.state.currentSortExpired === 'up') nextSort = 'down';
          this.setState({
            currentSortExpired: nextSort
          });
        }
      }
    } else if (tabla === "pending") {
      if (!isDate) {
        if (columna !== this.state.sortColPending) {
          if (columna.includes(".")) {
            this.setState({ sortColPending: columna });
            this.setState({ currentSortPending: "down" });
            let columnaSplit = columna.split(".")
            this.setState({ sortTypesPending: (a, b) => a[columnaSplit[0]][columnaSplit[1]].toLowerCase().localeCompare(b[columnaSplit[0]][columnaSplit[1]].toLowerCase()) });
          } else {
            let col = columna
            this.setState({ sortColPending: columna });
            this.setState({ currentSortPending: "down" });
            this.setState({ sortTypesPending: (a, b) => a[col].toLowerCase().localeCompare(b[col].toLowerCase()) });
          }
        }
        else {
          let nextSort;
          if (this.state.currentSortPending === 'down') nextSort = 'up';
          else if (this.state.currentSortPending === 'up') nextSort = 'down';
          this.setState({
            currentSortPending: nextSort
          });
        }
      } else {
        if (columna !== this.state.sortColPending) {
          let col = columna
          this.setState({ sortColPending: columna });
          this.setState({ currentSortPending: "down" });
          this.setState({
            sortTypesPending: (a, b) => {
              let aSpliteado = a[col].split("-")
              let bSpliteado = b[col].split("-")
              a = new Date(aSpliteado[0], aSpliteado[1], aSpliteado[2]);
              b = new Date(bSpliteado[0], bSpliteado[1], bSpliteado[2]);
              return a < b ? -1 : a > b ? 1 : 0;
            }
          })
        }
        else {
          let nextSort;
          if (this.state.currentSortPending === 'down') nextSort = 'up';
          else if (this.state.currentSortPending === 'up') nextSort = 'down';
          this.setState({
            currentSortPending: nextSort
          });
        }
      }
    }
  };


  render() {
    const { allTasks, allRecruits, allDisciplines, allUsers, taskDash3, recruitsDashRegular, usersTasks, allTasksDash, allRecruitsDash, tasksRecruit, user, allTaskDash3, tasksDash } = this.props;
    if (!this.props.user.name) {
      return <Redirect to={{ pathname: "/login" }} />
    }
    return (
      <div class="parent">
        <div class="div1">
          <SidebarContainer path={this.props.match} />
        </div>
        <div class="div2">
          <Dashboard allTasks={allTasks} user={user} usersTasks={usersTasks} />
          <Graphics handleSubmitChart2={this.handleSubmitChart2} taskDash3={taskDash3} recruitsDashRegular={recruitsDashRegular} allRecruitsDash={allRecruitsDash} allTaskDash3={allTaskDash3} handleSubmit3={this.handleSubmit3} usersTasks={usersTasks} tasksDash={tasksDash} handleSubmit2={this.handleSubmit2} allTasksDash={allTasksDash} idUser={this.props.match.params.userId} allTasks={allTasks} allRecruits={allRecruits} handleSubmit={this.handleSubmit} allDisciplines={allDisciplines} allUsers={allUsers} handleChange={this.handleChange} state={this.state} user={user} />
          <DashboardRows allTasks={allTasks} user={user} usersTasks={usersTasks} state={this.state} onSortChange={this.onSortChange} />
          <Progress allTasks={allTasks} allRecruits={allRecruits} handleClickDash={this.handleClickDash} tasksRecruit={tasksRecruit} user={user} usersTasks={usersTasks} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  allTasks: state.task.allTasks,
  allRecruits: state.recruit.recruits,
  allRecruitsDash: state.recruit.recruitsDash,
  allDisciplines: state.disciplines.disciplines,
  allUsers: state.user.users,
  usersTasks: state.task.tasks,
  allTasksDash: state.task.allTasksDash,
  allTaskDash3: state.task.allTasksDash3,
  user: state.login.user,
  tasksRecruit: state.task.tasksRecruit,
  tasksDash: state.task.taskDash,
  taskDash3: state.task.taskDash3,
  recruitsDashRegular: state.recruit.recruitsDashRegular
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    searchAllTasks: () => dispatch(searchAllTasks()),
    searchRecruits: () => dispatch(searchRecruits()),
    searchRecruits2: () => dispatch(searchRecruits2()),
    searchDisciplines: () => dispatch(searchDisciplines()),
    fetchUsers: () => dispatch(fetchUsers()),
    searchTasks: (userId) => dispatch(searchTasks(userId)),
    searchAllTasksDash: () => dispatch(searchAllTasksDash()),
    searchTasksRecruits: (id) => dispatch(searchTasksRecruits(id)),
    searchTasksDash: (id) => dispatch(searchTasksDash(id)),
    searchTasksDash3: (id) => dispatch(searchTasksDash3(id)),
    searchAllTasksDash3: () => dispatch(searchAllTasksDash3()),
    searchRecruits2Regular: () => dispatch(searchRecruits2Regular())
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardContainer));
