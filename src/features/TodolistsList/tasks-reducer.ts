import {addTodolistAC, removeTodolistAC, setTodolistsAC,} from './todolists-reducer';
import {ResultStatuses, TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/api'
import {AppRootStateType, AppThunkDispatch} from '../../app/store';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) tasks.splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string, model: UpdateDomainTaskModelType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) tasks[index] = {...tasks[index], ...action.payload.model}
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) tasks[index] = {...tasks[index], entityStatus: action.payload.entityStatus}
        },
        setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
    }
})

export const tasksReducer = slice.reducer

export const {removeTaskAC, addTaskAC, updateTaskAC, changeTaskEntityStatusAC, setTasksAC} = slice.actions

export const getTasksTC = (todolistId: string) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC({todolistId, tasks: res.data.items}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'loading'}))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === ResultStatuses.OK) {
                dispatch(removeTaskAC({taskId, todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'failed'}))
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
            dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'failed'}))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ResultStatuses.OK) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                status: task.status,
                ...domainModel
            }

            dispatch(setAppStatusAC({status: 'loading'}))
            dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'loading'}))

            todolistsAPI.updateTask(todolistId, taskId, model)
                .then(res => {
                    if (res.data.resultCode === ResultStatuses.OK) {
                        dispatch(updateTaskAC({taskId, todolistId, model}))
                        dispatch(setAppStatusAC({status: 'succeeded'}))
                        dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'succeeded'}))
                    } else {
                        handleServerAppError(res.data, dispatch)
                        dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'loading'}))
                    }
                })
                .catch(e => {
                    handleServerNetworkError(e, dispatch)
                    dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'failed'}))
                })
        }
    }

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

