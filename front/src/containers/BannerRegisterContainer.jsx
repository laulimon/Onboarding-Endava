import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import BannerRegister from "../components/BannerRegister";


class BannerRegisterContainer extends React.Component {
    constructor() {
        super()
    }

    render() {
        if (this.props.user.name) {
            return <Redirect to={{ pathname: `/dashboard/${this.props.user.id}` }} />
        }
        return (
            <div>
                <BannerRegister/>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BannerRegisterContainer))
