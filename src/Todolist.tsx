import React from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValuesType)=>void
}

export function Todolist(props: PropsType) {
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
            <input />
            <button>+</button>
        </div>
        <ul>
            {taskItems}
        </ul>
        <div>
            <button onClick={()=>props.changeFilter('all')}>All</button>
            <button onClick={()=>props.changeFilter('active')}>Active</button>
            <button onClick={()=>props.changeFilter('completed')}>Completed</button>
        </div>
    </div>
}
