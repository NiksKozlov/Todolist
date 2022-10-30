import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import EditableSpan from './EditableSpan';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {TaskType} from './Todolist';



export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, status: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task = memo(({task, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {

    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue)
    }
    const onTitleChangeHandler = (title: string) => {
        changeTaskTitle(task.id, title)
    }

    return (
        <ListItem
            key={task.id}
            className={task.isDone ? 'isDone' : ''}
            style={{padding: '0px'}}
        >
            <Checkbox
                style={{color: 'hotpink'}}
                onChange={onChangeHandler}
                checked={task.isDone}
            />
            <EditableSpan title={task.title} changeTitle={onTitleChangeHandler} />
            <IconButton
                color="primary"
                size="small"
                onClick={onClickHandler}>
                <DeleteOutlineIcon />
            </IconButton>
        </ListItem>
    );
})
