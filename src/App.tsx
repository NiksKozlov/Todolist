import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //BLL:
    const todoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    const addTask = (title: string) => {
        setTasks([{
            id: v1(), title: title, isDone: false
        }, ...tasks])
    }

    const changeStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t=>t.id !== taskID ? t : {...t, isDone: !t.isDone}))
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getTasksForTodolist = () => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    //UI:
    return (
        <div className="App">
            <Todolist
                filter={filter}
                title={todoListTitle}
                tasks={getTasksForTodolist()}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
