import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom"
import SidebarContainer from "./SidebarContainer"
import MyPendingTasks from "../components/MyPendingTasks";
import { searchTasks, updateTaskState, } from "../redux/actions/tasks";


class MyPendingTasksContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            taskState: "",
            busqueda: "",
            sortCol: "task.description",
            sortTypes: (a, b) => a.task.description.toLowerCase().localeCompare(b.task.description.toLowerCase()),
            currentSort: 'down',
        }
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.onSortChange = this.onSortChange.bind(this);

    }
    componentDidMount() {
        const userId = this.props.match.params.userId
        this.props.searchTasks(userId)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSearchInput(e) {
        const userId = this.props.match.params.userId
        this.setState({ busqueda: e.target.value })
        const busqueda = e.target.value;
        (busqueda.length >= 2) ? this.props.searchTasks(userId, busqueda) : this.props.searchTasks(userId)

    }
    handleClick(taskId) {
        let obj = { taskState: this.state.taskState, taskId: taskId, userId: this.props.user.id }
        if (this.state.taskState) {
            this.props.updateTaskState(obj)
        }
        this.setState({ taskState: "" })
    }
    onSortChange(columna, isDate = false) {
        if (!isDate) {
            if (columna !== this.state.sortCol) {
                if (columna.includes(".")) {
                    this.setState({ sortCol: columna })
                    this.setState({ currentSort: "down" })
                    let columnaSplit = columna.split(".")
                    this.setState({ sortTypes: (a, b) => a[columnaSplit[0]][columnaSplit[1]].toLowerCase().localeCompare(b[columnaSplit[0]][columnaSplit[1]].toLowerCase()) })
                } else {
                    let col = columna
                    this.setState({ sortCol: columna })
                    this.setState({ currentSort: "down" })
                    this.setState({ sortTypes: (a, b) => a[col].toLowerCase().localeCompare(b[col].toLowerCase()) })
                }
            }
            else {
                let nextSort;
                if (this.state.currentSort === 'down') nextSort = 'up';
                else if (this.state.currentSort === 'up') nextSort = 'down';
                this.setState({
                    currentSort: nextSort
                });
            }
        } else {
            if (columna !== this.state.sortCol) {
                let col = columna
                this.setState({ sortCol: columna })
                this.setState({ currentSort: "down" })
                this.setState({
                    sortTypes: (a, b) => {
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
                if (this.state.currentSort === 'down') nextSort = 'up';
                else if (this.state.currentSort === 'up') nextSort = 'down';
                this.setState({
                    currentSort: nextSort
                });
            }
        }
    };

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
                        <MyPendingTasks state={this.state} onSortChange={this.onSortChange} user={this.props.user} handleSearchInput={this.handleSearchInput} tasks={this.props.tasks} handleChange={this.handleChange} handleClick={this.handleClick} />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.login.user,
        tasks: state.task.tasks
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        searchTasks: (userId, busqueda) => dispatch(searchTasks(userId, busqueda)),
        updateTaskState: (taskState) => dispatch(updateTaskState(taskState)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyPendingTasksContainer));