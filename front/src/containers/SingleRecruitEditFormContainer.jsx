import React, { Fragment } from "react";
import { connect } from "react-redux"
import { withRouter, Redirect } from "react-router-dom"
import { searchSingleRecruit, updateRecruit } from "../redux/actions/recruits"
import { searchDisciplines } from "../redux/actions/disciplines"

import SingleRecruitEditForm from "../components/SingleRecruitEditForm"
import SidebarContainer from "../containers/SidebarContainer";

class SingleRecruitEditFormContainer extends React.Component {
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
        const recruitId = this.props.match.params.recruitId
        this.props.searchSingleRecruit(recruitId)
        this.props.searchDisciplines()

    }

    handleSubmit(e) {
        e.preventDefault();
        let viejoIdDiscipline = this.props.recruit.disciplineId
        let IdDiscipline;
        let newName;
        let newLastName;
        let newEmail;
        let newPhone;
        let newDNI;
        let newEntryDate;
        const recruitId = this.props.match.params.recruitId

        this.state.name ? (newName = this.state.name) : (newName = this.props.recruit.name)
        this.state.lastName ? (newLastName = this.state.lastName) : (newLastName = this.props.recruit.lastName)
        this.state.email ? (newEmail = this.state.email) : (newEmail = this.props.recruit.email)
        this.state.phone ? (newPhone = this.state.phone) : (newPhone = this.props.recruit.phone)
        this.state.DNI ? (newDNI = this.state.DNI) : (newDNI = this.props.recruit.DNI)
        this.state.entryDate ? (newEntryDate = this.state.entryDate) : (newEntryDate = this.props.recruit.entryDate)

        this.props.disciplinesOptions.map((discipline) => (this.state.discipline == discipline.description) ? (IdDiscipline = discipline.id) : null)
        // if(this.state.discipline === "Development") IdDiscipline=1
        // if(this.state.discipline === "Project Manager") IdDiscipline=2
        // if(this.state.discipline === "Testing") IdDiscipline=3
        // if(this.state.discipline === "Pdrc") IdDiscipline=4
        if (!this.state.discipline) IdDiscipline = viejoIdDiscipline

        let obj = { name: newName, lastName: newLastName, email: newEmail, phone: newPhone, DNI: newDNI, entryDate: newEntryDate, userId: this.props.user.id, disciplineId: IdDiscipline, recruitId: recruitId }
        this.props.updateRecruit(obj)
            .then(() => this.props.history.push(`/manageRecruits`))
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
            <Fragment>

                <div class="parent">
                    <div class="div1">
                        <SidebarContainer path={this.props.match} />
                    </div>
                    <div class="div2">
                        <SingleRecruitEditForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} disciplinesOptions={this.props.disciplinesOptions} recruit={this.props.recruit} />
                    </div>
                </div>
            </Fragment>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        recruit: state.recruit.selectedRecruit,
        user: state.login.user,
        disciplinesOptions: state.disciplines.disciplines
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        searchSingleRecruit: (recruit) => dispatch(searchSingleRecruit(recruit)),
        updateRecruit: (recruit) => dispatch(updateRecruit(recruit)),
        searchDisciplines: () => dispatch(searchDisciplines())
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleRecruitEditFormContainer))
