import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import EditableSpan from './EditableSpan';
import {DeleteOutlined} from '@mui/icons-material';
import {TaskType} from './Todolist';
import {useDispatch, useSelector} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './store/tasks-reducer';
import {AppRootStateType} from './store/store';




export type TaskPropsType = {
    taskId: string
    todolistId: string
}

export const Task = memo(({taskId, todolistId}: TaskPropsType) => {

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId]
        .find(task => task.id === taskId) as TaskType)

    const dispatch = useDispatch()

    const removeTask = () => dispatch(removeTaskAC(taskId, todolistId))
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(taskId, newIsDoneValue, todolistId))
    }
    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    },[taskId, todolistId])

    return (
        <ListItem
            key={taskId}
            className={task.isDone ? 'isDone' : ''}
            style={{padding: '0px'}}
        >
            <Checkbox
                style={{color: 'hotpink'}}
                onChange={changeTaskStatus}
                checked={task.isDone}
            />
            <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
            <IconButton
                color="primary"
                size="small"
                onClick={removeTask}>
                <DeleteOutlined />
            </IconButton>
        </ListItem>
    );
})
