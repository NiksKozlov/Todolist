import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const taskItems = props.tasks.length
        ? props.tasks.map(task => {
            return (
                <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={(e) => props.changeStatus(task.id, e.currentTarget.checked, props.todoListId)} />
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id, props.todoListId)}>x</button>
                </li>
            )
        })
        : <span>Tasks list is empty</span>

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
        }
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const handlerCreator = (filter: FilterValuesType, todoListId: string) => {
        return () => props.changeFilter(filter, todoListId)
    }
    const errorMessage = <div style={{color: 'hotpink'}}>Title is required!</div>


    return (
        <div>
            <h3>
                {props.title}
                <button onClick={() => props.removeTodoList(props.todoListId)}>x</button>
            </h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={changeTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={addTask}>+</button>
                {error && errorMessage}
            </div>
            <ul>
                {taskItems}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'btn-active' : ''}
                    onClick={handlerCreator('all', props.todoListId)}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'btn-active' : ''}
                    onClick={handlerCreator('active', props.todoListId)}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'btn-active' : ''}
                    onClick={handlerCreator('completed', props.todoListId)}>Completed
                </button>
            </div>
        </div>
    )
}
