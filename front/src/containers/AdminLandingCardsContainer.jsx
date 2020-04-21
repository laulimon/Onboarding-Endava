import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AdminLandingCards from "../components/AdminLandingCards";

class AdminLandingCardsContainer extends React.Component {
    constructor() {
        super()
        
    }

    render() {
        if (!this.props.user.name) {
            return <Redirect to={{pathname: "/login"}}/>
        }
        return (
            <div>
                <AdminLandingCards user={this.props.user}/> 
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.login.user
    };
};

export default connect(mapStateToProps, null)(AdminLandingCardsContainer)
