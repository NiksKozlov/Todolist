import {v1} from 'uuid';
import {
    addTodolistAC, changeTodolistEntityStatusAC, changeTodolistFilterAC, changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from '../features/TodolistsList/todolists-reducer';
import {TodolistType} from '../api/api';
import {RequestStatusType} from '../app/app-reducer';


let todolistId1: string
let todolistId2: string

let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to learn', filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''},
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC({id: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolist: TodolistType = {
        id: todolistId1,
        title: 'What to learn',
        order: 0,
        addedDate: '',
    }

    const endState = todolistsReducer(startState, addTodolistAC({todolist: newTodolist}))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolist.title);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed';

    const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, filter: newFilter}));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId2, title: newTodolistTitle}));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('todolists should be added', () => {
    const endState = todolistsReducer([], setTodolistsAC({todolists: startState}))

    expect(endState.length).toBe(2)
})

test('correct entity status should be changed', () => {
    let newStatus: RequestStatusType = 'loading'

    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC({id: todolistId2, entityStatus: newStatus}))

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe('loading')
})


