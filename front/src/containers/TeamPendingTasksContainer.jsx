import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom"

import TeamPendingTasks from "../components/TeamPendingTasks"
import SidebarContainer from "./SidebarContainer"

import { searchAllTasks } from "../redux/actions/tasks"


class TeamPendingTasksContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            busquedaS: "",
            busquedaT: "",
            sortCol: "task.description",
            sortTypes: (a, b) => a.task.description.toLowerCase().localeCompare(b.task.description.toLowerCase()),
            currentSort: 'down',
        }
        this.handleSearchInputS = this.handleSearchInputS.bind(this);
        this.handleSearchInputT = this.handleSearchInputT.bind(this);
        this.onSortChange = this.onSortChange.bind(this);

    }
    componentDidMount() {
        this.props.searchAllTasks()
    }

    handleSearchInputS(e) {
        this.setState({ busquedaS: e.target.value })
        const busqueda = e.target.value;
        (busqueda.length >= 2) ? this.props.searchAllTasks(busqueda, 1) : this.props.searchAllTasks()
    }

    handleSearchInputT(e) {
        this.setState({ busquedaT: e.target.value })
        const busqueda = e.target.value;
        (busqueda.length >= 2) ? this.props.searchAllTasks(busqueda, 2) : this.props.searchAllTasks()
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
                        <TeamPendingTasks state={this.state} onSortChange={this.onSortChange} user={this.props.user} allTasks={this.props.allTasks} handleSearchInputS={this.handleSearchInputS} handleSearchInputT={this.handleSearchInputT} />
                    </div>
                </div>
            </Fragment>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.login.user,
        allTasks: state.task.allTasks,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        searchAllTasks: (busqueda, valor) => dispatch(searchAllTasks(busqueda, valor)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamPendingTasksContainer))

