import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './AppWithoutReducerAndRedux';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from '@mui/material';
import {DeleteOutlined} from '@mui/icons-material';



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}


export function TodolistWithoutRedux(props: PropsType) {
    const taskItems = props.tasks.length
        ? props.tasks.map(task => {
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todolistId)
            }
            return (
                <ListItem
                    key={task.id}
                    className={task.isDone ? 'isDone' : ''}
                    style={{padding: '0px'}}
                >
                    <Checkbox
                        style={{color: 'hotpink'}}
                        onChange={(e) => props.changeStatus(task.id, e.currentTarget.checked, props.todolistId)}
                        checked={task.isDone}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
                    <IconButton
                        color='primary'
                        size="small"
                        onClick={() => props.removeTask(task.id, props.todolistId)}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItem>
            )
        })
        : <span>Tasks list is empty</span>

    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    const changeTodolIstTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }
    const handlerCreator = (filter: FilterValuesType, todoListId: string) => {
        return () => props.changeFilter(filter, todoListId)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolIstTitle} />
                <IconButton
                    size="small"
                    onClick={() => props.removeTodolist(props.todolistId)}
                    color='primary'
                >
                    <DeleteOutlined />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <List>
                {taskItems}
            </List>
            <div>
                <ButtonGroup size='small' variant='contained' disableElevation>
                    <Button
                        color={props.filter === 'all' ? 'secondary' : 'primary'}
                        onClick={handlerCreator('all', props.todolistId)}>All
                    </Button>
                    <Button
                        color={props.filter === 'active' ? 'secondary' : 'primary'}
                        onClick={handlerCreator('active', props.todolistId)}>Active
                    </Button>
                    <Button
                        color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={handlerCreator('completed', props.todolistId)}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}
