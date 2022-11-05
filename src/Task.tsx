import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import EditableSpan from './EditableSpan';
import {DeleteOutlined} from '@mui/icons-material';
import {TaskType} from './Todolist';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './store/tasks-reducer';




export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo(({task, todolistId}: TaskPropsType) => {

    const dispatch = useDispatch()

    const removeTask = () => dispatch(removeTaskAC(task.id, todolistId))
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
    }
    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(task.id, title, todolistId))
    }

    return (
        <ListItem
            key={task.id}
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
