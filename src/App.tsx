import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    //BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Meat', isDone: false}
        ],
    })



    const removeTask = (taskID: string, todoListId: string) => {
        // const todoListsTasks = tasks[todoListId]
        // const updatedTasks = todoListsTasks.filter(t => t.id !== todoListId)
        // const copyTask = {...tasks}
        // copyTask[todoListId] = updatedTasks
        // setTasks(copyTask)
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== todoListId)})
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        // const todoListsTasks = tasks[todoListId]
        // const updatedTasks = [newTask, ...todoListsTasks]
        // const copyTask = {...tasks}
        // copyTask[todoListId] = updatedTasks
        // setTasks(copyTask)
        //
        setTasks({...tasks,
            [todoListId]: [newTask, ...tasks[todoListId]]
        })
    }

    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        // const todoListsTasks = tasks[todoListId]
        // const updatedTasks = todoListsTasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        // const copyTask = {...tasks}
        // copyTask[todoListId] = updatedTasks
        // setTasks(copyTask)

        setTasks({...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        })
    }

    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
    }

    //UI:
    const getTasksForTodolist = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Todolist
                filter={filter}
                title={todoListTitle}
                tasks={getTasksForTodolist()}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
            />
        )
    })

    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
