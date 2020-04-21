import { SEARCH_RECRUITS_DASH_REGULAR, SEARCH_RECRUITS, CREATE_RECRUIT, SINGLE_RECRUIT, SEARCH_RECRUITS_DASH } from "../constants/index";

const initialRecruitState = {
    recruits: [],
    recruitsDash: [],
    recruitsDashRegular: [],
    newRecruit: [],
    selectedRecruit: {}
}
export default function (state = initialRecruitState, action) {
    switch (action.type) {
        case SEARCH_RECRUITS:
            return Object.assign({}, state, { recruits: action.recruits })
        case SEARCH_RECRUITS_DASH:
            return Object.assign({}, state, { recruitsDash: action.recruits })
        case SEARCH_RECRUITS_DASH_REGULAR:
            return Object.assign({}, state, { recruitsDashRegular: action.recruits })
        case CREATE_RECRUIT:
            return Object.assign({}, state, { newRecruit: action.recruit })
        case SINGLE_RECRUIT:
            return Object.assign({}, state, { selectedRecruit: action.recruit })
        default:
            return state;
    }
}

