import React, {ChangeEvent} from 'react';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {FilterValuesType} from './AppWithRedux';
import EditableSpan from './EditableSpan';
import AddItemForm from './AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './store/tasks-reducer';
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from './store/todolists-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistReduxPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
}


export function TodolistRedux({todoListId, title, filter}: TodolistReduxPropsType) {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoListId])
    const dispatch = useDispatch()

    const removeTodolist = () => {
        dispatch(removeTodoListAC(todoListId))
    }

    const changeTodoLIstTitle = (title: string) => {
        dispatch(changeTodoListTitleAC(title, todoListId))
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, todoListId))
    }

    const handlerCreator = (filter: FilterValuesType, todoListId: string) => {
        return () => dispatch(changeTodoListFilterAC(filter, todoListId))
    }


    if (filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodoLIstTitle} />
                <IconButton
                    size="small"
                    onClick={removeTodolist}
                    color="primary">
                    <DeleteOutlineIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <List>
                {
                    tasks.map(t => {
                        const onClickHandler = () => dispatch(removeTaskAC(t.id, todoListId))
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, todoListId))
                        }
                        const onTitleChangeHandler = (title: string) => {
                            dispatch(changeTaskTitleAC(t.id, title, todoListId))
                        }
                        return (
                            <ListItem
                                key={t.id}
                                className={t.isDone ? 'isDone' : ''}
                                style={{padding: '0px'}}
                            >
                                <Checkbox
                                    style={{color: 'hotpink'}}
                                    onChange={onChangeHandler}
                                    checked={t.isDone}
                                />
                                <EditableSpan title={t.title} changeTitle={onTitleChangeHandler} />
                                <IconButton
                                    color="primary"
                                    size="small"
                                    onClick={onClickHandler}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </ListItem>
                        )
                    })
                }
            </List>
            <div>
                <ButtonGroup size="small" variant="contained" disableElevation>
                    <Button
                        color={filter === 'all' ? 'secondary' : 'primary'}
                        onClick={handlerCreator('all', todoListId)}>All
                    </Button>
                    <Button
                        color={filter === 'active' ? 'secondary' : 'primary'}
                        onClick={handlerCreator('active', todoListId)}>Active
                    </Button>
                    <Button
                        color={filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={handlerCreator('completed', todoListId)}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}
