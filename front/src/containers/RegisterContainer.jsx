import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Register from "../components/Register";
import { createUser } from "../redux/actions/users"
import { searchDisciplines } from "../redux/actions/disciplines"

class RegisterContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            lastName: "",
            email: "",
            discipline: "",
            password1: "",
            password2: "",
            errorMail: false,
            errorPass: false,
            errorInc: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.searchDisciplines()
    }

    handleSubmit(e) {
        e.preventDefault();
        let flagMail = false
        let flagPassword = false
        let IdDiscipline;
        this.setState({ errorMail: false })
        this.setState({ errorPass: false })
        this.setState({ errorInc: false })

        this.props.disciplinesOptions.map((discipline) => (this.state.discipline == discipline.description) ? (IdDiscipline = discipline.id) : null)

        if (e.target[0].value && e.target[1].value && e.target[2].value && e.target[3].value && e.target[4].value && e.target[5].value) {
            if (e.target[2].value.includes("@endava.com")) flagMail = true
            else this.setState({ errorMail: true })
            if (e.target[4].value === e.target[5].value) flagPassword = true
            else this.setState({ errorPass: true })
            if (flagMail === true && flagPassword === true) {
                let obj = { name: e.target[0].value, lastName: e.target[1].value, email: e.target[2].value, disciplineId: IdDiscipline, password: e.target[4].value }
                this.props.createUser(obj)
                    .then(() => this.props.history.push("/login"))
            }
        } else {
            this.setState({ errorInc: true })
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }

    render() {
        return (
            <div>
                <Register handleSubmit={this.handleSubmit} handleChange={this.handleChange} state={this.state} disciplinesOptions={this.props.disciplinesOptions} />
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    disciplinesOptions: state.disciplines.disciplines
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createUser: (usuario) => dispatch(createUser(usuario)),
        searchDisciplines: () => dispatch(searchDisciplines())
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterContainer))
