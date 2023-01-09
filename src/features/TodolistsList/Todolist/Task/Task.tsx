import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import EditableSpan from '../../../../components/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {TaskStatuses, TaskType} from '../../../../api/api';


export type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}

export const Task = memo((props: TaskPropsType) => {

    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    return (
        <ListItem
            key={props.task.id}
            className={props.task.status === TaskStatuses.Completed ? 'isDone' : ''}
            style={{padding: '0px'}}
        >
            <Checkbox
                onChange={onChangeHandler}
                checked={props.task.status === TaskStatuses.Completed}
                disabled={props.task.entityStatus === 'loading'}
            />
            <EditableSpan title={props.task.title} onChange={onTitleChangeHandler} disabled={props.task.entityStatus === 'loading'}/>
            <IconButton size="small" onClick={onClickHandler} disabled={props.task.entityStatus === 'loading'}>
                <Delete />
            </IconButton>
        </ListItem>
    );
})
