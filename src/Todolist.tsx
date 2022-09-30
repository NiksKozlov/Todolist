import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}


export function Todolist(props: PropsType) {
    const taskItems = props.tasks.length
        ? props.tasks.map(task => {
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todoListId)
            }
            return (
                <ListItem
                    key={task.id}
                    className={task.isDone ? 'isDone' : ''}
                    style={{padding: '0px'}}
                >
                    <Checkbox
                        style={{color: 'hotpink'}}
                        onChange={(e) => props.changeStatus(task.id, e.currentTarget.checked, props.todoListId)}
                        checked={task.isDone}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
                    <IconButton
                        color='primary'
                        size="small"
                        onClick={() => props.removeTask(task.id, props.todoListId)}>
                        <DeleteOutlineIcon />
                    </IconButton>
                </ListItem>
            )
        })
        : <span>Tasks list is empty</span>

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const changeTodoLIstTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }
    const handlerCreator = (filter: FilterValuesType, todoListId: string) => {
        return () => props.changeFilter(filter, todoListId)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoLIstTitle} />
                <IconButton
                    size="small"
                    onClick={() => props.removeTodoList(props.todoListId)}
                    color='primary'
                >
                    <DeleteOutlineIcon />
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
                        onClick={handlerCreator('all', props.todoListId)}>All
                    </Button>
                    <Button
                        color={props.filter === 'active' ? 'secondary' : 'primary'}
                        onClick={handlerCreator('active', props.todoListId)}>Active
                    </Button>
                    <Button
                        color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={handlerCreator('completed', props.todoListId)}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}
