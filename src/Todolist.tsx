import React, {ChangeEvent, memo, useCallback} from 'react';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
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

    console.log('Todolist rendering')

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

    const removeTask = useCallback((taskId: string) => dispatch(removeTaskAC(taskId, todolistId)),[todolistId])

    const changeTaskStatus = useCallback((taskId: string, status: boolean) => {
        dispatch(changeTaskStatusAC(taskId, status, todolistId))
    },[todolistId])

    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    },[todolistId])

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
                        return <Task
                            key={t.id}
                            task={t}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                        />
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
})
