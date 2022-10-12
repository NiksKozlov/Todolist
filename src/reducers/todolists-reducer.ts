import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE=TODOLIST-FILTER',
    filter: FilterValuesType,
    todoListId: string
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string,
    todoListId: string
};

type ActionsType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType


export const todoListsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
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

export const removeTodoListAC = (id: string): RemoveTodoListActionType => ({
    type: 'REMOVE-TODOLIST',
    todolistId: id
})

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}


export const changeTodoListFilterAC = (filter: FilterValuesType, todoListId: string): ChangeTodoListFilterActionType => ({
    type: 'CHANGE=TODOLIST-FILTER',
    filter: filter,
    todoListId: todoListId
})

export const changeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleActionType => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title: title,
    todoListId: todoListId
})