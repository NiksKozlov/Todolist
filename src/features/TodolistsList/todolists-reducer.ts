import {ResultStatuses, todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux';
import {RequestStatusType, setStatusAC, SetStatusType} from '../../app/app-reducer';
import {handleServerAppError} from '../../utils/error-utils';
import {AppThunkDispatch} from '../../app/store';


const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [
                {
                    id: action.todolist.id,
                    title: action.todolist.title,
                    filter: 'all',
                    addedDate: action.todolist.addedDate,
                    order: action.todolist.order,
                    entityStatus: 'idle'
                },
                ...state
                ]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'SET-TODOS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'SET-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOS', todolists} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
    ({type: 'SET-ENTITY-STATUS', id, entityStatus} as const)

// thunks
export const getTodolistsTC = () => (dispatch: AppThunkDispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setStatusAC('succeeded'))
            })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: AppThunkDispatch) => {
        dispatch(setStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(setStatusAC('succeeded'))
            })
            .catch(e => {
                dispatch(setStatusAC('failed'))
                dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
            })
}

export const addTodolistTC = (title: string) => (dispatch: AppThunkDispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === ResultStatuses.OK) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    handleServerAppError<{ item: TodolistType }>(res.data, dispatch)
                }
            })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: AppThunkDispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, title))
                dispatch(setStatusAC('succeeded'))
            })
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | SetStatusType
    | ReturnType<typeof changeTodolistEntityStatusAC>