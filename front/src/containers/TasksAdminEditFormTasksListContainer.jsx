import React, { Fragment } from "react"
import { connect } from "react-redux"
import { withRouter, Redirect } from "react-router-dom"
import TasksAdminEditFormTasksList from "../components/TasksAdminEditFormTasksList"
import { deleteTask, changeTask } from "../redux/actions/tasks"
import SidebarContainer from "../containers/SidebarContainer";
import { searchAllTasks } from "../redux/actions/tasks"



class TasksAdminEditFormTasksListContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            description: "",
            errorDescription: false,

        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        this.props.searchAllTasks()
    }

    handleDelete() {
        this.props.deleteTask(this.props.match.params.taskId)
            .then(
                this.props.history.push(`/AddOrEditAvailableTasks`)
            )
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault()
        let flagDescription = false;
        this.setState({ errorDescription: false });
        (this.state.description.length >= 2) ? flagDescription = true : null;
        if (flagDescription) {
            let newDescription = this.state.description
            let obj = { taskId: this.props.match.params.taskId, description: newDescription }
            this.props.changeTask(obj)
                .then(this.props.history.push(`/AddOrEditAvailableTasks`))
        } else {
            this.setState({ errorDescription: true })
        }
    }

    render() {
        if (!this.props.user.isAdmin && this.props.user.name) {
            return <Redirect to={{ pathname: `/dashboard/${this.props.user.id}` }} />
        } else if (!this.props.user.name) {
            return <Redirect to={{ pathname: "/login" }} />
        }
        return (
            <Fragment>
                <div class="parent">
                    <div class="div1">
                        <SidebarContainer path={this.props.match} />
                    </div>
                    <div class="div2">
                        <TasksAdminEditFormTasksList handleSubmit={this.handleSubmit} state={this.state} handleChange={this.handleChange} handleDelete={this.handleDelete} taskListId={this.props.match.params.taskId} tasksList={this.props.tasksList} allTasks={this.props.allTasks} />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        tasksList: state.task.tasksList,
        allTasks: state.task.allTasks,
        user: state.login.user
    }

}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteTask: (taskId) => dispatch(deleteTask(taskId)),
        changeTask: (obj) => dispatch(changeTask(obj)),
        searchAllTasks: () => dispatch(searchAllTasks()),

    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TasksAdminEditFormTasksListContainer))