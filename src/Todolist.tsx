import React, {memo, useCallback} from 'react';
import {Button, ButtonGroup, IconButton, List} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {FilterValuesType} from './App';
import EditableSpan from './EditableSpan';
import AddItemForm from './AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './store/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './store/todolists-reducer';
import {Task} from './Task';

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


export const Todolist = memo(({todolistId, title, filter}: TodolistReduxPropsType) => {

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

    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC('all', todolistId)), [todolistId])
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC('active', todolistId)), [todolistId])
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC('completed', todolistId)), [todolistId])


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
                    onClick={removeTodolist}
                    size="small"
                    color="primary">
                    <DeleteOutlineIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <List>
                {
                    tasks.map(t => {
                        return <Task
                            key={t.id}
                            task={t}
                            todolistId={todolistId}
                        />
                    })
                }
            </List>
            <div>
                <ButtonGroup size="small" variant="contained" disableElevation>
                    <ButtonWrapper
                        titleButton="all"
                        variant={filter === 'active' ? 'outlined' : 'text'}
                        color="inherit"
                        onClickHandler={onAllClickHandler}
                    />
                    <ButtonWrapper
                        titleButton="active"
                        variant={filter === 'active' ? 'outlined' : 'text'}
                        color="primary"
                        onClickHandler={onActiveClickHandler}
                    />
                    <ButtonWrapper
                        titleButton="completed"
                        variant={filter === 'completed' ? 'outlined' : 'text'}
                        color="secondary"
                        onClickHandler={onCompletedClickHandler}
                    />
                </ButtonGroup>
            </div>
        </div>
    )
})

type ButtonWrapperPropsType = {
    titleButton: FilterValuesType
    color: 'inherit' | 'primary' | 'secondary'
    variant: 'outlined' | 'text'
    onClickHandler: () => void
}

const ButtonWrapper = memo((props: ButtonWrapperPropsType) => {
    return (
        <Button
            variant={props.variant}
            color={props.color}
            onClick={props.onClickHandler}>{props.titleButton}
        </Button>
    )
})

//     <ButtonGroup size="small" variant="contained" disableElevation>
//          <Button
//              color={filter === 'all' ? 'secondary' : 'primary'}
//              onClick={onAllClickHandler}>All
//          </Button>
//          <Button
//              color={filter === 'active' ? 'secondary' : 'primary'}
//              onClick={onActiveClickHandler}>Active
//          </Button>
//          <Button
//              color={filter === 'completed' ? 'secondary' : 'primary'}
//              onClick={onCompletedClickHandler}>Completed
//          </Button>
//     </ButtonGroup>
