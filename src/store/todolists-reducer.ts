import {FilterValuesType, TodolistType} from '../AppWithRedux';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE=TODOLIST-FILTER',
    filter: FilterValuesType,
    todoListId: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string,
    todoListId: string
};

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType

const initialState: Array<TodolistType> = []

export const todoListsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            const newTodoListId: string = action.todolistId
            return [...state, {id: newTodoListId, title: action.title, filter: 'all'}]
        case 'CHANGE=TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        default:
            return state
    }
}

export const removeTodoListAC = (id: string): RemoveTodolistActionType => ({
    type: 'REMOVE-TODOLIST',
    todolistId: id
})

export const addTodoListAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}


export const changeTodoListFilterAC = (filter: FilterValuesType, todoListId: string): ChangeTodolistFilterActionType => ({
    type: 'CHANGE=TODOLIST-FILTER',
    filter: filter,
    todoListId: todoListId
})

export const changeTodoListTitleAC = (title: string, todoListId: string): ChangeTodolistTitleActionType => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title: title,
    todoListId: todoListId
})