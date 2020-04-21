import React, { Fragment } from "react";
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { updateTaskState, searchSingleTaskRecruit } from "../redux/actions/tasks"


import SingleTaskEditForm from "../components/SingleTaskEditForm"

class SingleTaskEditFormContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            newTaskState: "",
            comment: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        if (!this.props.user.name) {
            this.props.history.push("/login")
        }
        const taskId = this.props.match.params.taskId
        this.props.searchSingleTaskRecruit(taskId)

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.newTaskState) {
            let obj = { taskState: this.state.newTaskState, comment: this.state.comment, taskId: this.props.task.id }
            this.props.updateTaskState(obj)
                .then(() => this.props.history.push(`/myPendingTasks/${this.props.user.id}`))

        }
    }

    render() {
        if (!this.props.user.name) {
            return <Redirect to={{ pathname: "/login" }} />
        }
        return (
            <Fragment>
                <SingleTaskEditForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
            </Fragment>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.login.user,
        task: state.task.selectedTask
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateTaskState: (taskState) => dispatch(updateTaskState(taskState)),
        searchSingleTaskRecruit: (taskId) => dispatch(searchSingleTaskRecruit(taskId))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleTaskEditFormContainer))
