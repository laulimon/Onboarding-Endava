import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import BannerLogin from "../components/BannerLogin";


class BannerLoginContainer extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <BannerLogin/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.login.user,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BannerLoginContainer))