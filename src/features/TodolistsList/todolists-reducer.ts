import {ResultStatuses, todolistsAPI, TodolistType} from '../../api/api'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {AppThunkDispatch} from '../../app/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState: TodolistDomainType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state.splice(index, 1)
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift( {
                id: action.payload.todolist.id,
                title: action.payload.todolist.title,
                filter: 'all',
                addedDate: action.payload.todolist.addedDate,
                order: action.payload.todolist.order,
                entityStatus: 'idle'
            })
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state[index].entityStatus = action.payload.entityStatus
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
    }
})

export const todolistsReducer = slice.reducer

export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistsAC,
    changeTodolistEntityStatusAC
} = slice.actions

export const fetchTodolistsTC = () => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}))
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === ResultStatuses.OK) {
                dispatch(removeTodolistAC({id: todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'failed'}))
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
            dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'failed'}))
        })
}

export const addTodolistTC = (title: string) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === ResultStatuses.OK) {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError<{ item: TodolistType }>(res.data, dispatch)
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}))
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ResultStatuses.OK) {
                dispatch(changeTodolistTitleAC({id: todolistId, title}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'failed'}))
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
            dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'failed'}))
        })
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

