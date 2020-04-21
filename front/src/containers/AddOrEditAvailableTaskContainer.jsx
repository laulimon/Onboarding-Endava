import React, { Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AddorEditAvailableTask from "../components/AddOrEditAvailableTask"
import SidebarContainer from "./SidebarContainer"

import { searchTasksList, createTask } from "../redux/actions/tasks"

class AddOrEditAvailableTaskContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            description: "",
            toastAlert: false,
            busqueda: "",
            errorDescription: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSearchTaskList = this.handleSearchTaskList.bind(this)
    }

    componentDidMount() {
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
                .then(() => this.setState({ toastAlert: true, description: '' }))
        } else {
            this.setState({ errorDescription: true })
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClick(taskId) {
        this.props.history.push(`/editAvailableTasks/${taskId}`)
    }

    handleSearchTaskList(e) {
        this.setState({ busquedaTask: e.target.value })
        const busqueda = e.target.value;
        (busqueda.length >= 2) ? this.props.searchTasksList(busqueda) : this.props.searchTasksList()
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
                        <AddorEditAvailableTask tasksList={this.props.tasksList} handleClick={this.handleClick} handleSubmit={this.handleSubmit} handleChange={this.handleChange} state={this.state} handleSearchTaskList={this.handleSearchTaskList} />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, owsProps) => {
    return {
        user: state.login.user,
        tasksList: state.task.tasksList
    }
}

const mapDispatchToProps = (dispatch, owsProps) => {
    return {
        searchTasksList: (busqueda) => dispatch(searchTasksList(busqueda)),
        createTask: (task) => dispatch(createTask(task))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditAvailableTaskContainer))