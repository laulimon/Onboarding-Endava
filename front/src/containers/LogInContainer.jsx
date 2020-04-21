import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../redux/actions/login"

import LogIn from "../components/LogIn";

class LogInContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();

        let obj = { email: e.target[0].value, password: e.target[1].value }
        this.props.login(obj)
            .then(() => { this.setState({ error: false }) })
            .then(() => this.props.history.push(`/dashboard/${this.props.user.id}`))
            .catch(() => { this.setState({ error: true }) })

    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <LogIn handleSubmit={this.handleSubmit} handleChange={this.handleChange} state={this.state} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    user: state.login.user
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (usuario) => dispatch(login(usuario))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogInContainer));
