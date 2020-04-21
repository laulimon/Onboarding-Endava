import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "../components/Footer";


class FooterContainer extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <Footer/>
            </div>
        )
    }
}


export default FooterContainer
