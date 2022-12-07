import React, {memo, useCallback, useEffect} from 'react';
import {Button, ButtonGroup, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import EditableSpan from '../../../components/EditableSpan/EditableSpan';
import {useAppDispatch} from '../../../app/store';
import {getTasksTC} from '../tasks-reducer';
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {AddItemForm} from '../../../components/AddItemFrom/AddItemForm';


type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}


export const Todolist = memo((props: PropsType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(props.todolist.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.todolist.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.todolist.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.todolist.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.todolist.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3>
            <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}
                          disabled={props.todolist.entityStatus === 'loading'} />
            <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'} />
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                                                changeTaskStatus={props.changeTaskStatus}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <ButtonGroup size='small' variant='contained' disableElevation color={'inherit'}>
                <Button
                    color={props.todolist.filter === 'all' ? 'primary' : 'inherit'}
                    onClick={onAllClickHandler}
                >All
                </Button>
                <Button
                    color={props.todolist.filter === 'active' ? 'primary' : 'inherit'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={props.todolist.filter === 'completed' ? 'primary' : 'inherit'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
})


