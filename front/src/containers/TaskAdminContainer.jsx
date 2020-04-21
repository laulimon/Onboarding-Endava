import React, { Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TaskAdmin from "../components/TasksAdmin";

import { createTask, searchTasks, searchAllTasks, searchTasksList, updateTaskState, deleteTask } from "../redux/actions/tasks"
import SidebarContainer from "../containers/SidebarContainer";


class TasksAdminContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            description: "",
            taskState: "",
            busqueda: "",
            busquedaS: "",
            busquedaT: "",
            busquedaTask: "",
            errorDescription: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearchAllPendingInputS = this.handleSearchAllPendingInputS.bind(this);
        this.handleSearchAllPendingInputT = this.handleSearchAllPendingInputT.bind(this);
        this.handleSearchAllFinishedInputS = this.handleSearchAllFinishedInputS.bind(this);
        this.handleSearchAllFinishedInputT = this.handleSearchAllFinishedInputT.bind(this);
        this.handleSearchTaskList = this.handleSearchTaskList.bind(this);
        this.clearState = this.clearState.bind(this)
        this.handleClick2 = this.handleClick2.bind(this);
    }

    componentDidMount() {
        const userId = this.props.match.params.userId
        this.props.searchTasks(userId)
        this.props.searchAllTasks()
        this.props.searchTasksList()
    }

    handleSubmit(e) {
        e.preventDefault();
        let flagDescription = false;
        this.setState({ errorDescription: false });
        (e.target[0].value.length >= 2) ? flagDescription = true : null;
        if (flagDescription) {
            let obj = { description: e.target[0].value }
            this.props.createTask(obj)
                .then(() => this.setState({ description: '' }))
        } else {
            this.setState({ errorDescription: true })
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSearchInput(e) {
        const userId = this.props.match.params.userId
        this.setState({ busqueda: e.target.value })
        const busqueda = e.target.value
        busqueda.length >= 2 ? this.props.searchTasks(userId, busqueda)
            : this.props.searchTasks(userId)

    }

    clearState(e) {
        this.setState({ busquedaS: "", busquedaT: "" })
        this.props.searchAllTasks()
    }

    handleSearchAllPendingInputS(e) {
        this.setState({ busquedaS: e.target.value })
        const busqueda = e.target.value
        busqueda.length >= 2 ? this.props.searchAllTasks(busqueda, 1)
            : this.props.searchAllTasks()
    }

    handleSearchAllPendingInputT(e) {
        this.setState({ busquedaT: e.target.value })
        const busqueda = e.target.value
        busqueda.length >= 2 ? this.props.searchAllTasks(busqueda, 2)
            : this.props.searchAllTasks()
    }

    handleSearchAllFinishedInputS(e) {
        this.setState({ busquedaS: e.target.value })
        const busqueda = e.target.value
        busqueda.length >= 2 ? this.props.searchAllTasks(busqueda, 1)
            : this.props.searchAllTasks()
    }

    handleSearchAllFinishedInputT(e) {
        this.setState({ busquedaT: e.target.value })
        const busqueda = e.target.value
        busqueda.length >= 2 ? this.props.searchAllTasks(busqueda, 2)
            : this.props.searchAllTasks()
    }
    handleSearchTaskList(e) {
        this.setState({ busquedaTask: e.target.value })
        const busqueda = e.target.value
        busqueda.length >= 2 ? this.props.searchTasksList(busqueda)
            : this.props.searchTasksList()
    }

    handleClick(taskId) {
        let obj = { taskState: this.state.taskState, taskId: taskId, userId: this.props.user.id }
        if (this.state.taskState) {
            this.props.updateTaskState(obj)
        }
        this.setState({ taskState: "" })
    }

    handleClick2(taskId) {
        this.props.history.push(`/editAvailableTasks/${taskId}`)
    }

    render() {
        if (!this.props.user.name) {
            return <Redirect to={{ pathname: "/login" }} />
        }
        return (
            <Fragment>
                <div class="parent">
                    <div class="div1">
                        <SidebarContainer path={this.props.match} />
                    </div>
                    <div class="div2">
                        <TaskAdmin clearState={this.clearState} handleSearchTaskList={this.handleSearchTaskList} user={this.props.user} handleSearchInput={this.handleSearchInput} handleSearchAllPendingInputS={this.handleSearchAllPendingInputS} handleSearchAllPendingInputT={this.handleSearchAllPendingInputT} handleSearchAllFinishedInputS={this.handleSearchAllFinishedInputS} handleSearchAllFinishedInputT={this.handleSearchAllFinishedInputT} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleClick={this.handleClick} state={this.state} handleClick2={this.handleClick2} tasks={this.props.tasks} allTasks={this.props.allTasks} tasksList={this.props.tasksList} />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.login.user,
        tasks: state.task.tasks,
        allTasks: state.task.allTasks,
        tasksList: state.task.tasksList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createTask: (task) => dispatch(createTask(task)),
        searchTasks: (userId, busqueda) => dispatch(searchTasks(userId, busqueda)),
        searchAllTasks: (busqueda, valor) => dispatch(searchAllTasks(busqueda, valor)),
        searchTasksList: (busqueda) => dispatch(searchTasksList(busqueda)),
        updateTaskState: (taskState) => dispatch(updateTaskState(taskState)),
        deleteTask: (taskId) => dispatch(deleteTask(taskId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TasksAdminContainer))


