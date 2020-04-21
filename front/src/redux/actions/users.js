import axios from "axios"
import { CREATE_USER, SEARCH_USERS } from "../constants/index"

export const setUser = (user) => ({
    type: CREATE_USER,
    user
});

export const allUsers = (users) => ({
    type: SEARCH_USERS,
    users
})

export const createUser = (user) => dispatch => {
    return axios.post(`/api/user/register`, user)
        .then(data => data.data)
        .then(user => dispatch(setUser(user)))
}

export const deleteUser = (userId) => dispatch => {
    return axios.delete(`/api/user/${userId}`)
        .then(() => console.log("Se elimino el usuario"))
}

export const changeTaskOwner = (obj) => dispatch => {
    return axios.put(`/api/user/${obj.userId}`, obj)
        .then(data => data.data)
        .then(user => console.log(user))
}

export const fetchUsers = (busqueda) => dispatch => {
    if (busqueda === undefined) {
        return axios.get("/api/user/allUsers")
        .then(res => res.data)
        .then(users => dispatch(allUsers(users)))
    } else {
        return axios.get(`/api/user/allUsers?s=${busqueda}`)
        .then(res => res.data)
        .then(users => dispatch(allUsers(users)))
    }
}

export const changeProfile = (idUser, profile) => dispatch => {
    return axios.put(`/api/user/changeProfile/${idUser}`, { profile })
        .then(res => res.data)
        .then(users => dispatch(allUsers(users)))

}