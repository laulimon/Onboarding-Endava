import { SEARCH_TASKS_DASH_3_REGULAR, SEARCH_TASKS_DASH_3, SEARCH_TASKS_DASH, SEARCH_ALL_TASKS_DASH, SEARCH_TASKS, SINGLE_TASK_RECRUIT, SEARCH_ALL_TASKS, SEARCH_TASKS_LIST, SEARCH_TASKS_RECRUIT, SET_ERROR } from "../constants/index";

const initialTaskState = {
    tasks: [],
    taskDash: [],
    taskDash3: [],
    tasksRecruit: [],
    allTasks: [],
    allTasksDash: [],
    allTasksDash3: [],
    tasksList: [],
    selectedTask: {},
    errorFields: false
}
export default function (state = initialTaskState, action) {
    switch (action.type) {
        case SEARCH_TASKS:
            return Object.assign({}, state, { tasks: action.tasks })
        case SEARCH_TASKS_DASH_3_REGULAR:
            return Object.assign({}, state, { taskDash3: action.tasks })
        case SEARCH_TASKS_DASH:
            return Object.assign({}, state, { taskDash: action.tasks })
        case SEARCH_TASKS_DASH_3:
            return Object.assign({}, state, { allTasksDash3: action.allTasks })
        case SEARCH_ALL_TASKS:
            return Object.assign({}, state, { allTasks: action.allTasks })
        case SEARCH_ALL_TASKS_DASH:
            return Object.assign({}, state, { allTasksDash: action.allTasks })
        case SEARCH_TASKS_LIST:
            return Object.assign({}, state, { tasksList: action.tasksList })
        case SINGLE_TASK_RECRUIT:
            return Object.assign({}, state, { selectedTask: action.task })
        case SET_ERROR:
            state.errorFields = !state.errorFields
        case SEARCH_TASKS_RECRUIT:
            return Object.assign({}, state, { tasksRecruit: action.tasksRecruits })
        default:
            return state;
    }
}