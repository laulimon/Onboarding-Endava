import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";
import {logout} from "../redux/actions/login"


class NavbarContainer extends React.Component {
    constructor() {
        super()
        this.onLogout = this.onLogout.bind(this)
    }

    onLogout() {
        this.props.logout()
        .then(() => this.props.history.push("/login"))
    }

    render() {
        return (
            <div>
                <Navbar user={this.props.user} onLogout={this.onLogout}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    user: state.login.user
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => dispatch(logout()),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarContainer));
