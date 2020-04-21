import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createRecruit } from "../redux/actions/recruits"
import CreateRecruit from "../components/CreateRecruit";
import { searchDisciplines } from "../redux/actions/disciplines"
import SidebarContainer from "../containers/SidebarContainer";


class CreateRecruitContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            lastName: "",
            email: "",
            phone: "",
            DNI: "",
            entryDate: "",
            discipline: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.searchDisciplines()
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.name && this.state.lastName && this.state.email && this.state.phone && this.state.DNI && this.state.entryDate && this.state.discipline) {
            let IdDiscipline;
            this.props.disciplinesOptions.map((discipline) => (this.state.discipline == discipline.description) ? (IdDiscipline = discipline.id) : null)
            let obj = { name: this.state.name, lastName: this.state.lastName, email: this.state.email, phone: this.state.phone, DNI: this.state.DNI, entryDate: this.state.entryDate, userId: this.props.user.id, disciplineId: IdDiscipline }
            this.props.createRecruit(obj)
                .then(() => this.props.history.push("/recruits"))
        } else {
            alert("You must complete all the fields")
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (!this.props.user.isAdmin && this.props.user.name) {
            return <Redirect to={{ pathname: `/dashboard/${this.props.user.id}` }} />
        } else if (!this.props.user.name) {
            return <Redirect to={{ pathname: "/login" }} />
        }
        return (
            <div>
                <div class="parent">
                    <div class="div1">
                        <SidebarContainer path={this.props.match} />
                    </div>
                    <div class="div2">
                        <section id="banner_white">
                            <div className="container box_container">
                                <div className="row">

                                    <div className="col-md-6 text-center">
                                        <img src="images/design/register12.svg" className="img-fluid" />
                                    </div>

                                    <div className="col-md-6" style={{ backgroundColor: "#f0f3f3" }}>
                                        <CreateRecruit handleChange={this.handleChange} handleSubmit={this.handleSubmit} disciplinesOptions={this.props.disciplinesOptions} />
                                    </div>



                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.login.user,
        disciplinesOptions: state.disciplines.disciplines
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createRecruit: (recruit) => dispatch(createRecruit(recruit)),
        searchDisciplines: () => dispatch(searchDisciplines())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateRecruitContainer))
