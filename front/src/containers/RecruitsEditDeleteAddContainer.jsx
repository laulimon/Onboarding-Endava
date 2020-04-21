import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { searchRecruits } from "../redux/actions/recruits"
import SidebarContainer from "../containers/SidebarContainer";
import { searchTasksRecruits, deleteTaskRecruit } from "../redux/actions/tasks";
import { searchSingleRecruit, deleteRecruit, singleRecruit } from "../redux/actions/recruits"
import RecruitsEditDeleteAdd from "../components/RecruitsEditDeleteAdd";
import { searchAllTasks } from "../redux/actions/tasks";


class RecruitsEditDeleteAddContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            busqueda: "",
            sortCol: "name",
            sortTypes: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
            currentSort: 'down',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.handleDeleteRecruit = this.handleDeleteRecruit.bind(this)
        this.handlerClick = this.handlerClick.bind(this)


    }

    componentDidMount() {
        this.props.searchRecruits()
        this.props.searchAllTasks()
        this.props.singleRecruit({})

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSearchInput(e) {
        this.setState({ busqueda: e.target.value })
        const busqueda = e.target.value
        busqueda.length >= 2 ? this.props.searchRecruits(busqueda)
            : this.props.searchRecruits()

    }
    handlerClick(recruitId, taskRecruitId) {
        this.props.deleteTaskRecruit(taskRecruitId, recruitId)
    }

    handleDeleteRecruit(recruitId) {
        this.props.deleteRecruit(recruitId)
            .then(this.props.history.push("/manageRecruits"))

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
        if (this.state.isLoading) {
            return (
                <div>
                    <div class="parent">
                        <div class="div1">
                            <SidebarContainer path={this.props.match} />
                        </div>
                    </div>
                </div>
            )
        }
        if (!this.props.user.isAdmin && this.props.user.name) {
            return <Redirect to={{ pathname: `/dashboard/${this.props.user.id}` }} />
        } else if (!this.props.user.name) {
            return <Redirect to={{ pathname: "/login" }} />
        }
        return (
            <div>
                <div class="parent">
                    <div class="div1">
                        <SidebarContainer path={this.props.match} />
                    </div>
                    <div class="div2">
                        <RecruitsEditDeleteAdd allTasks={this.props.allTasks} handleDeleteRecruit={this.handleDeleteRecruit} handlerClick={this.handlerClick} state={this.state} recruits={this.props.recruits} onSortChange={this.onSortChange} handleSearchInput={this.handleSearchInput} handleChange={this.handleChange} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.login.user,
        recruits: state.recruit.recruits,
        allTasks: state.task.allTasks,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        singleRecruit: (recruit) => dispatch(singleRecruit(recruit)),
        searchRecruits: (busqueda) => dispatch(searchRecruits(busqueda)),
        deleteTaskRecruit: (taskRecruitId, recruitId) => dispatch(deleteTaskRecruit(taskRecruitId, recruitId)),
        deleteRecruit: (recruitId) => dispatch(deleteRecruit(recruitId)),
        searchAllTasks: () => dispatch(searchAllTasks()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecruitsEditDeleteAddContainer))