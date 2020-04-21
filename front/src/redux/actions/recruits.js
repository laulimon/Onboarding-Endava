import Axios from "axios";
import { SEARCH_RECRUITS_DASH_REGULAR, SEARCH_RECRUITS, CREATE_RECRUIT, SINGLE_RECRUIT, SEARCH_RECRUITS_DASH } from "../constants";

export const setRecruit = (recruit) => ({
    type: CREATE_RECRUIT,
    recruit
})

export const findRecruits = (recruits) => ({
    type: SEARCH_RECRUITS,
    recruits
})

export const findRecruits2 = (recruits) => ({
    type: SEARCH_RECRUITS_DASH,
    recruits
})

export const findRecruits2Regular = (recruits) => ({
    type: SEARCH_RECRUITS_DASH_REGULAR,
    recruits
})

export const singleRecruit = (recruit) => ({
    type: SINGLE_RECRUIT,
    recruit
})

export const searchRecruits = (busqueda) => dispatch => {
    if (busqueda === undefined) {
        return Axios.get("/api/recruit/")
            .then(res => res.data)
            .then(recruits => dispatch(findRecruits(recruits)))
    } else {
        return Axios.get(`/api/recruit/?s=${busqueda}`)
            .then(res => res.data)
            .then(recruits => dispatch(findRecruits(recruits)))
    }
}

export const searchRecruits2 = () => dispatch => {
    return Axios.get("/api/recruit/")
        .then(res => res.data)
        .then(recruits => dispatch(findRecruits2(recruits)))
}

export const searchRecruits2Regular = () => dispatch => {
    return Axios.get("/api/recruit/")
        .then(res => res.data)
        .then(recruits => dispatch(findRecruits2Regular(recruits)))
}

export const createRecruit = (recruit) => dispatch => {
    return Axios.post("/api/recruit/", recruit)
        .then(res => res.data)
        .then(newRecruit => dispatch(setRecruit(newRecruit)))
}

export const searchSingleRecruit = (recruitId) => dispatch => {
    return Axios.get(`/api/recruit/${recruitId}`)
        .then(res => res.data)
        .then(task => dispatch(singleRecruit(task)))
}

export const updateRecruit = (objRecruit) => dispatch => {
    return Axios.put(`/api/recruit/edit/${objRecruit.recruitId}`, objRecruit)
        .then(res => res.data)
        .then(recruit => dispatch(setRecruit(recruit)))
}

export const deleteRecruit = (recruitId) => dispatch => {
    return Axios.delete(`/api/recruit/delete/${recruitId}`)
        .then(res => res.data)
        .then(recruits => dispatch(findRecruits(recruits)))

} 
