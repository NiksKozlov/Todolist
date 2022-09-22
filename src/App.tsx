import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';

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

    //tasks CRUD
    const removeTask = (taskId: string, todoListId: string) => {
        // const todoListsTasks = tasks[todoListId]
        // const updatedTasks = todoListsTasks.filter(t => t.id !== todoListId)
        // const copyTask = {...tasks}
        // copyTask[todoListId] = updatedTasks
        // setTasks(copyTask)
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }
    const addTask = (title: string, todoListId: string) => {
        // const todoListsTasks = tasks[todoListId]
        // const updatedTasks = [newTask, ...todoListsTasks]
        // const copyTask = {...tasks}
        // copyTask[todoListId] = updatedTasks
        // setTasks(copyTask)
        //
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks,
            [todoListId]: [newTask, ...tasks[todoListId]]
        })
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        // const todoListsTasks = tasks[todoListId]
        // const updatedTasks = todoListsTasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        // const copyTask = {...tasks}
        // copyTask[todoListId] = updatedTasks
        // setTasks(copyTask)
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        })
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        setTasks({...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)
        })
    }


    //todoLists CRUD
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
    }
    const addTodolist = (title: string) => {
        const newTodoListId: string = v1()
        setTodoLists([...todoLists, {id: newTodoListId, title, filter: 'all'}])
        setTasks({...tasks, [newTodoListId]: []})
    }


    //UI:
    const getTasksForTodolist = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(t => !t.isDone)
            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        const tasks = getTasksForTodolist(tl)
        return (
            <Todolist
                key={tl.id}
                todoListId={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasks}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeTodoListFilter}
                changeStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todoListsComponents}
        </div>
    );
}

export default App;
