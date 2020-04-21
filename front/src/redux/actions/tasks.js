import Axios from "axios";
import { SEARCH_TASKS_DASH_3_REGULAR, SEARCH_TASKS_DASH_3, SEARCH_TASKS_DASH, SEARCH_ALL_TASKS_DASH, SEARCH_TASKS, SINGLE_TASK_RECRUIT, SEARCH_TASKS_RECRUIT, SEARCH_ALL_TASKS, SEARCH_TASKS_LIST, SET_ERROR, } from "../constants";

export const findTasks = (tasks) => ({
    type: SEARCH_TASKS,
    tasks
})

export const findAllTasks = (allTasks) => ({
    type: SEARCH_ALL_TASKS,
    allTasks
})

export const findAllTasksDash = (allTasks) => ({
    type: SEARCH_ALL_TASKS_DASH,
    allTasks
})

export const findTasksDash = (tasks) => ({
    type: SEARCH_TASKS_DASH,
    tasks
})

export const findTasksDash3 = (tasks) => ({
    type: SEARCH_TASKS_DASH_3_REGULAR,
    tasks
})

export const findAllTasksDash3 = (allTasks) => ({
    type: SEARCH_TASKS_DASH_3,
    allTasks
})

export const findTasksList = (tasksList) => ({
    type: SEARCH_TASKS_LIST,
    tasksList
})

export const setError = () => ({
    type: SET_ERROR,
})

export const singleTaskRecruit = (task) => ({
    type: SINGLE_TASK_RECRUIT,
    task
})

export const findTasksRecruits = (tasksRecruits) => ({
    type: SEARCH_TASKS_RECRUIT,
    tasksRecruits
})



export const createTask = (task) => dispatch => {
    return Axios.post("/api/task/newTask", task)
        .then(res => res.data)
        .then(tasksList => dispatch(findTasksList(tasksList)))
}

export const deleteTask = (taskId) => dispatch => {
    return Axios.delete(`/api/task/${taskId}`)
        .then(() => dispatch(searchTasksList()))
}

export const updateTaskState = (objTaskState) => dispatch => {
    return Axios.put(`/api/task/edit/${objTaskState.taskId}`, objTaskState)
        .then(res => res.data)
        .then(task => {
            dispatch(findTasksRecruits(task))
            dispatch(searchTasks(objTaskState.userId))
            dispatch(searchAllTasks())
        })
}

export const searchTasks = (userId, busqueda) => dispatch => {
    {
        if (busqueda === undefined) {
            return Axios.get(`/api/task/myTasks/${userId}`)
                .then(res => res.data)
                .then(tasks => dispatch(findTasks(tasks)))
        } else {
            return Axios.get(`/api/task/myTasks/${userId}?s=${busqueda}`)
                .then(res => res.data)
                .then(tasks => dispatch(findTasks(tasks)))
        }
    }
}

export const searchTasksDash = (userId) => dispatch => {
    return Axios.get(`/api/task/myTasks/${userId}`)
        .then(res => res.data)
        .then(tasks => dispatch(findTasksDash(tasks)))
}

export const searchTasksDash3 = (userId) => dispatch => {
    return Axios.get(`/api/task/myTasks/${userId}`)
        .then(res => res.data)
        .then(tasks => dispatch(findTasksDash3(tasks)))
}

export const searchFinishedTasks = (userId, busqueda) => dispatch => {
    {
        if (busqueda === undefined) {
            return Axios.get(`/api/task/myFinishedTasks/${userId}`)
                .then(res => res.data)
                .then(tasks => dispatch(findTasks(tasks)))
        } else {
            return Axios.get(`/api/task/myFinishedTasks/${userId}?s=${busqueda}`)
                .then(res => res.data)
                .then(tasks => dispatch(findTasks(tasks)))
        }
    }
}

export const searchAllTasks = (busqueda, valor) => dispatch => {
    if (valor === undefined) {
        return Axios.get("/api/task/allTasks")
            .then(res => res.data)
            .then(allTasks => dispatch(findAllTasks(allTasks)))
    } else if (valor === 1) {
        return Axios.get(`/api/task/allTasks?s=${busqueda}`)
            .then(res => res.data)
            .then(allTasks => dispatch(findAllTasks(allTasks)))
    } else if (valor === 2) {
        return Axios.get(`/api/task/allTasks?t=${busqueda}`)
            .then(res => res.data)
            .then(allTasks => dispatch(findAllTasks(allTasks)))
    }
}

export const searchAllFinishedTasks = (busqueda, valor) => dispatch => {
    if (valor === undefined) {
        return Axios.get("/api/task/allFinishedTasks")
            .then(res => res.data)
            .then(allTasks => dispatch(findAllTasks(allTasks)))
    } else if (valor === 1) {
        return Axios.get(`/api/task/allFinishedTasks?s=${busqueda}`)
            .then(res => res.data)
            .then(allTasks => dispatch(findAllTasks(allTasks)))
    } else if (valor === 2) {
        return Axios.get(`/api/task/allFinishedTasks?t=${busqueda}`)
            .then(res => res.data)
            .then(allTasks => dispatch(findAllTasks(allTasks)))
    }
}

export const searchAllTasksDash = () => dispatch => {
    return Axios.get("/api/task/allTasks")
        .then(res => res.data)
        .then(allTasks => dispatch(findAllTasksDash(allTasks)))
}

export const searchAllTasksDash3 = () => dispatch => {
    return Axios.get("/api/task/allTasks")
        .then(res => res.data)
        .then(allTasks => dispatch(findAllTasksDash3(allTasks)))
}

export const searchTasksList = (busqueda) => dispatch => {
        if (busqueda === undefined) {
        return Axios.get("/api/task/tasksList")
        .then(res => res.data)
        .then(tasksList => dispatch(findTasksList(tasksList)))
    } else {
        return Axios.get(`/api/task/tasksList?s=${busqueda}`)
        .then(res => res.data)
        .then(tasksList => dispatch(findTasksList(tasksList)))
    }
}

export const searchSingleTaskRecruit = (taskId) => dispatch => {
    return Axios.get(`/api/task/${taskId}`)
        .then(res => res.data)
        .then(task => dispatch(singleTaskRecruit(task)))
}

export const searchTasksRecruits = (recruitId) => dispatch => {
    return Axios.get(`/api/task/recruit/${recruitId}`)
        .then(res => res.data)
        .then(tasks => dispatch(findTasksRecruits(tasks)))
}

export const createTaskRecruit = (obj) => dispatch => {
    return Axios.post("/api/taskRecruit", obj)
        .then(res => res.data)
        .then(nuevaTaskRec => dispatch(searchTasksRecruits(nuevaTaskRec.recruitId)))
}

export const deleteTaskRecruit = (taskRecruitId, recruitId) => dispatch => {
    return Axios.delete(`/api/taskRecruit/${taskRecruitId}`)
        .then(() => dispatch(searchTasksRecruits(recruitId)))
}

export const updateTaskRecruit = (obj) => dispatch => {
    return Axios.put(`/api/taskRecruit/${obj.taskId}`, obj)
        .then(res => res.data)
        .then(task => {
            dispatch(findTasksRecruits(task))
            dispatch(searchTasks(obj.oldUserId))
        })
}

export const setErrorFields = () => dispatch => {
    dispatch(setError())
}

export const changeTask = (obj) => dispatch => {
    return Axios.put(`/api/task/editAvailableTask/${obj.taskId}`, obj)
        .then(res => res.data)
        .then(tasksList => dispatch(findTasksList(tasksList)))
}