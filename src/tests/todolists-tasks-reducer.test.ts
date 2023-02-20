import {addTodolistAC, TodolistDomainType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {tasksReducer, TasksStateType} from '../features/TodolistsList/tasks-reducer';


test('id should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const todolist: TodolistDomainType = {
        id: 'any',
        title: 'new todolist',
        filter: 'all',
        entityStatus: 'idle',
        addedDate: '',
        order: 0
    }

    const action = addTodolistAC({todolist: todolist})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})

