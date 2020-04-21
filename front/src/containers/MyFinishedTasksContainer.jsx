import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import SidebarContainer from "../containers/SidebarContainer"
import MyFinishedTasks from "../components/MyFinishedTasks";
import { searchFinishedTasks } from "../redux/actions/tasks";



class MyFinishedTasksContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            busqueda: "",
            sortCol: "task.description",
            sortTypes: (a, b) => a.task.description.toLowerCase().localeCompare(b.task.description.toLowerCase()),
            currentSort: 'down',
        }
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.onSortChange = this.onSortChange.bind(this);

    }
    componentDidMount() {
        const userId = this.props.match.params.userId
        this.props.searchFinishedTasks(userId)
    }

    handleSearchInput(e) {
        const userId = this.props.match.params.userId
        this.setState({ busqueda: e.target.value })
        const busqueda = e.target.value;
        (busqueda.length >= 2) ? this.props.searchFinishedTasks(userId, busqueda) : this.props.searchFinishedTasks(userId)

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
                        <MyFinishedTasks state={this.state} onSortChange={this.onSortChange} user={this.props.user} tasks={this.props.tasks} handleSearchInput={this.handleSearchInput} />
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
        searchFinishedTasks: (userId, busqueda) => { dispatch(searchFinishedTasks(userId, busqueda)) }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyFinishedTasksContainer))