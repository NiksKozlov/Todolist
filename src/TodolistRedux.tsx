import React, {ChangeEvent, useCallback} from 'react';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {FilterValuesType} from './AppWithRedux';
import EditableSpan from './EditableSpan';
import AddItemForm from './AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './store/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './store/todolists-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistReduxPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
}


export function TodolistRedux({todolistId, title, filter}: TodolistReduxPropsType) {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolistId])
    const dispatch = useDispatch()

    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolistId))
    }

    const changeTodoLIstTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(title, todolistId))
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [todolistId])

    const handlerCreator = (filter: FilterValuesType, todoListId: string) => {
        return () => dispatch(changeTodolistFilterAC(filter, todoListId))
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
                        const onClickHandler = () => dispatch(removeTaskAC(t.id, todolistId))
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, todolistId))
                        }
                        const onTitleChangeHandler = (title: string) => {
                            dispatch(changeTaskTitleAC(t.id, title, todolistId))
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
                        onClick={handlerCreator('all', todolistId)}>All
                    </Button>
                    <Button
                        color={filter === 'active' ? 'secondary' : 'primary'}
                        onClick={handlerCreator('active', todolistId)}>Active
                    </Button>
                    <Button
                        color={filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={handlerCreator('completed', todolistId)}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}
