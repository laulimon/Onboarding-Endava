import React, { Fragment, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connet, connect } from "react-redux";
import UsersAdmin from "../components/UsersAdmin";
import { fetchUsers, changeProfile } from "../redux/actions/users"
import SidebarContainer from "../containers/SidebarContainer";


class UsersAdminContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            busqueda: "",
            sortCol: "name",
            sortTypes: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
            currentSort: 'down',
        }
        this.handleProfile = this.handleProfile.bind(this)
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.redirection = this.redirection.bind(this)
        this.onSortChange = this.onSortChange.bind(this)


    }
    componentDidMount() {
        this.props.fetchUsers()
    }

    handleProfile(idUser, profile) {
        this.props.changeProfile(idUser, profile)

    }

    handleSearchInput(e) {
        this.setState({ busqueda: e.target.value })
        const busqueda = e.target.value
        busqueda.length >= 2 ? this.props.fetchUsers(busqueda)
            : this.props.fetchUsers()

    }

    redirection(userId) {
        this.props.history.push(`/deleteUser/${userId}`)
    }
    onSortChange(columna) {
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
                        <UsersAdmin users={this.props.users} state={this.state} onSortChange={this.onSortChange} redirection={this.redirection} handleProfile={this.handleProfile} handleSearchInput={this.handleSearchInput} />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.user.users,
        user: state.login.user
    }

};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchUsers: (busqueda) => dispatch(fetchUsers(busqueda)),
        changeProfile: (idUser, profile) => dispatch(changeProfile(idUser, profile))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersAdminContainer))
