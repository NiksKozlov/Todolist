import {
    addTaskAC,
    removeTaskAC, setTasksAC,
    tasksReducer,
    TasksStateType,
    updateTaskAC
} from '../features/TodolistsList/tasks-reducer';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from '../features/TodolistsList/todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/api';

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                todoListId: 'todolistId1',
                title: 'CSS',
                addedDate: '',
                entityStatus: 'idle',
                status: TaskStatuses.New,
                deadline: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
            },
            {
                id: '2',
                todoListId: 'todolistId1',
                title: 'JS',
                addedDate: '',
                entityStatus: 'idle',
                status: TaskStatuses.Completed,
                deadline: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
            },
            {
                id: '3',
                todoListId: 'todolistId1',
                title: 'React',
                addedDate: '',
                entityStatus: 'idle',
                status: TaskStatuses.New,
                deadline: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
            },
        ],
        'todolistId2': [
            {
                id: '1',
                todoListId: 'todolistId2',
                title: 'bread',
                addedDate: '',
                entityStatus: 'idle',
                status: TaskStatuses.New,
                deadline: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
            },
            {
                id: '2',
                todoListId: 'todolistId2',
                title: 'milk',
                addedDate: '',
                entityStatus: 'idle',
                status: TaskStatuses.Completed,
                deadline: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
            },
            {
                id: '3',
                todoListId: 'todolistId2',
                title: 'tea',
                addedDate: '',
                entityStatus: 'idle',
                status: TaskStatuses.New,
                deadline: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
            },
        ]
    }
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC({taskId: '2', todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'.length]).toBe(3)
    expect(endState['todolistId2'.length]).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        task: {
            id: 'id exists',
            todoListId: 'todolistId2',
            title: 'juice',
            addedDate: '',
            entityStatus: 'idle',
            status: TaskStatuses.New,
            deadline: '',
            order: 0,
            description: '',
            priority: 0,
            startDate: '',
        },
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC({taskId: '2', model: {status: TaskStatuses.New}, todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})

test('Title of specified task should be changed', () => {

    const action = updateTaskAC({taskId: '2', model: {title: 'meat'}, todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe('meat')
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({todolist: {id: 'id1', title: 'new todolist', addedDate: '', order: 0}})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC({id: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistsAC({todolists: [
            {id: '1', title: 'title1', order: 0, addedDate: ''},
            {id: '2', title: 'title2', order: 0, addedDate: ''},
        ]})

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
})

test('tasks should be added for todolists', () => {

    const action = setTasksAC({tasks: startState['todolistId1'], todolistId: 'todolistId1'})

    const endState = tasksReducer({
        'todolistId1': [],
        'todolistId2': [],
    }, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})
