import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loader from 'react-loader-spinner';
import { getLoggedUser } from "../redux/actions/login";

import AdminLandingCardsContainer from "../containers/AdminLandingCardsContainer"
import TasksAdminContainer from "../containers/TaskAdminContainer"
import NavbarContainer from "../containers/NavbarContainer"
import BannerLoginContainer from "../containers/BannerLoginContainer"
import BannerRegisterContainer from "../containers/BannerRegisterContainer"
import SingleTaskContainer from "../containers/SingleTaskContainer"
import RecruitsEditDeleteAddContainer from "../containers/RecruitsEditDeleteAddContainer"
import RecruitContainer from "../containers/RecruitContainer"
import CreateRecruitContainer from "../containers/CreateRecruitContainer"
import UsersAdminContainer from "../containers/UsersAdminContainer"
import SingleRecruitContainer from "../containers/SingleRecruitContainer"
import SingleRecruitEditFormContainer from "../containers/SingleRecruitEditFormContainer"
import DeleteUserContainer from "../containers/DeleteUserContainer"
import TasksAdminEditFormTasksListContainer from "../containers/TasksAdminEditFormTasksListContainer"
import BannerWelcomeContainer from "../containers/BannerWelcomeContainer"
import DashboardContainer from "../containers/DashboardContainer"
import SidebarContainer from "../containers/SidebarContainer";
import MyPendingTasksContainer from "../containers/MyPendingTasksContainer";
import MyFinishedTasksContainer from "../containers/MyFinishedTasksContainer";
import TeamPendingTasksContainer from "../containers/TeamPendingTasksContainer";
import TeamFinishedTasksContainer from "../containers/TeamFinishedTasksContainer";
import AddOrEditAvailableTasksContainer from "../containers/AddOrEditAvailableTaskContainer"


class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }
  componentDidMount() {
    this.props.getLoggedUser()
      .then(() => {
        this.setState({ isLoading: false })
      })
  }
  render() {
    if (this.state.isLoading) {
      return (
        <Fragment>
          <NavbarContainer />
        </Fragment>
      )
    }
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={BannerWelcomeContainer} />
          <Route exact path="/login" component={BannerLoginContainer} />
          <Route exact path="/register" component={BannerRegisterContainer} />
          <Route exact path="/home" component={AdminLandingCardsContainer} />
          {/* Tasks */}
          <Route exact path="/myPendingTasks/:userId" component={MyPendingTasksContainer} />
          <Route exact path="/myFinishedTasks/:userId" component={MyFinishedTasksContainer} />
          <Route exact path="/TeamPendingTasks/:userId" component={TeamPendingTasksContainer} />
          <Route exact path="/TeamFinishedTasks/:userId" component={TeamFinishedTasksContainer} />
          <Route exact path="/task/:taskId" component={SingleTaskContainer} />
          <Route exact path="/AddOrEditAvailableTasks" component={AddOrEditAvailableTasksContainer} />
          <Route exact path="/editAvailableTasks/:taskId" component={TasksAdminEditFormTasksListContainer} />
          {/* New hires */}
          <Route exact path="/recruits" component={RecruitContainer} />
          <Route exact path="/manageRecruits" component={RecruitsEditDeleteAddContainer} />
          <Route exact path="/manageRecruits/tasks/:recruitId" component={SingleRecruitContainer} />
          <Route exact path="/manageRecruits/edit/:recruitId" component={SingleRecruitEditFormContainer} />
          <Route exact path="/newRecruit" component={CreateRecruitContainer} />
          {/* User */}
          <Route exact path="/users" component={UsersAdminContainer} />
          <Route exact path="/deleteUser/:userId" component={DeleteUserContainer} />
          {/* Dashboar       */}
          <Route exact path="/dashboard/:userId" component={DashboardContainer} />

          <Redirect from="/" to="/" />
        </Switch>

      </Fragment>
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
    getLoggedUser: () => dispatch(getLoggedUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main)
