import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../css/style.css"
import Chart4Component from "../components/Chart4Component"
import { searchTasks } from "../redux/actions/tasks"


class Chart4Container extends React.Component {
  constructor() {
    super()

  }

  handleSubmit() {
    const idUserLoged = this.props.user.id
    this.props.searchTasks(idUserLoged)
  }

  render() {
    const { } = this.props;
    return (
      <div>
        <Chart4Component />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.login.user
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    searchTasks: (userId) => dispatch(searchTasks(userId))
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chart4Container));