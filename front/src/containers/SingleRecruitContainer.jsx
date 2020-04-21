import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import SingleRecruit from "../components/SingleRecruit";
import { searchTasksRecruits, deleteTaskRecruit } from "../redux/actions/tasks"
import { searchSingleRecruit, deleteRecruit } from "../redux/actions/recruits"
import SidebarContainer from "../containers/SidebarContainer";

class SingleRecruitContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            sortCol: "task.description",
            sortTypes: (a, b) => a.task.description.toLowerCase().localeCompare(b.task.description.toLowerCase()),
            currentSort: 'down',
        }
        this.handlerClick = this.handlerClick.bind(this)
        this.onSortChange = this.onSortChange.bind(this);
        this.handleDeleteRecruit = this.handleDeleteRecruit.bind(this)
    }

    componentDidMount() {
        const recruitId = this.props.match.params.recruitId
        this.props.searchSingleRecruit(recruitId)
        this.props.searchTasksRecruits(recruitId)
    }

    handlerClick(taskRecruitId) {
        let recruitId = this.props.match.params.recruitId
        this.props.deleteTaskRecruit(taskRecruitId, recruitId)
    }

    handleDeleteRecruit(recruitId) {
        this.props.deleteRecruit(recruitId)
            .then(this.props.history.push("/recruits"))

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
            <div>
                <div class="parent">
                    <div class="div1">
                        <SidebarContainer path={this.props.match} />
                    </div>
                    <div class="div2">
                        <SingleRecruit state={this.state} onSortChange={this.onSortChange} recruit={this.props.recruit} tasks={this.props.tasks} handlerClick={this.handlerClick} handleDeleteRecruit={this.handleDeleteRecruit} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.login.user,
        recruit: state.recruit.selectedRecruit,
        tasks: state.task.tasksRecruit
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        searchSingleRecruit: (recruit) => dispatch(searchSingleRecruit(recruit)),
        searchTasksRecruits: (recruitId) => dispatch(searchTasksRecruits(recruitId)),
        deleteTaskRecruit: (taskRecruitId, recruitId) => dispatch(deleteTaskRecruit(taskRecruitId, recruitId)),
        deleteRecruit: (recruitId) => dispatch(deleteRecruit(recruitId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleRecruitContainer))