import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "../components/Sidebar";
import { logout } from "../redux/actions/login"


class sidebarContainer extends React.Component {
    constructor() {
        super()
        this.onLogout = this.onLogout.bind(this)
    }

    onLogout() {
        this.props.logout()
            .then(() => this.props.history.push("/"))
    }

    render() {
        return (
            <>
                <Sidebar user={this.props.user} onLogout={this.onLogout} path={this.props.path} />
            </>

        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.login.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => dispatch(logout()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(sidebarContainer))