import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import EditableSpan from './EditableSpan';
import {DeleteOutlined} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, removeTaskTC} from './store/tasks-reducer';
import {AppRootStateType, useAppDispatch} from './store/store';
import {TaskStatuses, TaskType} from './api/todolists-api';


export type TaskPropsType = {
    taskId: string
    todolistId: string
}

export const Task = memo(({taskId, todolistId}: TaskPropsType) => {

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId]
        .find(task => task.id === taskId) as TaskType)

    const dispatch = useAppDispatch()

    const removeTask = useCallback(() => dispatch(removeTaskTC(todolistId, taskId)),[])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(taskId, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId))
    },[])

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    },[taskId, todolistId])

    return (
        <ListItem
            key={taskId}
            className={task.status === TaskStatuses.Completed ? 'isDone' : ''}
            style={{padding: '0px'}}
        >
            <Checkbox
                style={{color: 'hotpink'}}
                onChange={changeTaskStatus}
                checked={task.status === TaskStatuses.Completed}
            />
            <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
            <IconButton color="primary" size="small" onClick={removeTask}>
                <DeleteOutlined />
            </IconButton>
        </ListItem>
    );
})
