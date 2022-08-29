import React, {useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>("")
    const taskItems = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
    })
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={() => props.addTask(title)}>+</button>
        </div>
        <ul>
            {taskItems}
        </ul>
        <div>
            <button onClick={() => props.changeFilter('all')}>All</button>
            <button onClick={() => props.changeFilter('active')}>Active</button>
            <button onClick={() => props.changeFilter('completed')}>Completed</button>
        </div>
    </div>
}
