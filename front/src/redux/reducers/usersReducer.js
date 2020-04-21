import { CREATE_USER, SEARCH_USERS, USER_LOGOUT } from "../constants/index"

const initialUserState = {
    user: {},
    users: []
}

export default function (state = initialUserState, action) {
    switch (action.type) {
        case CREATE_USER:
            return Object.assign({}, state, {user: action.user})
        case USER_LOGOUT:
            return { ...state, user: {} }
        case SEARCH_USERS:
            return Object.assign({}, state, { users: action.users })
        default:
            return state;
    }
}