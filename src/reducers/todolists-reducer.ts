import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    title: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE=TODOLIST-FILTER',
    filter: FilterValuesType,
    todoListId: string
}
type ChangeTodoListTitleAT= {
        type: 'CHANGE-TODOLIST-TITLE',
        title: string,
        todoListId: string
    };

type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT


export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            const newTodoListId: string = v1()
            return [...todoLists, {id: newTodoListId, title: action.title, filter: 'all'}]
        case 'CHANGE=TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        default:
            return todoLists
    }
}

export const removeTodoListAC = (id: string): RemoveTodoListAT => ({
    type: 'REMOVE-TODOLIST',
    todolistId: id
})

export const addTodoListAC = (title: string): AddTodoListAT => ({
    type: 'ADD-TODOLIST',
    title: title
})

export const changeTodoListFilterAC = (filter: FilterValuesType, todoListId: string): ChangeTodoListFilterAT => ({
    type: 'CHANGE=TODOLIST-FILTER',
    filter: filter,
    todoListId: todoListId
})

export const changeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title: title,
    todoListId: todoListId
})