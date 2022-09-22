import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './AddItemForm';

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

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const handlerCreator = (filter: FilterValuesType, todoListId: string) => {
        return () => props.changeFilter(filter, todoListId)
    }

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={() => props.removeTodoList(props.todoListId)}>x</button>
            </h3>
            <AddItemForm addItem={addTask} />
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
