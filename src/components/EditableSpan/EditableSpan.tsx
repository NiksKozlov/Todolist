import React, {ChangeEvent, useState, KeyboardEvent, memo} from 'react';
import {TextField} from '@mui/material';


type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
    disabled: boolean
}

const EditableSpan = memo((props: EditableSpanPropsType) => {
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)
    const onEditMode = () => {
        if (props.disabled) {
            return
        }
        setEditMode(true)
        setTitle(props.title)
    }
    const offEditMode = () => {
        props.onChange(title)
        setEditMode(false)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const enterChangeTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            offEditMode()
        }
    }
    return (
        editMode
            ? <TextField
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={changeTitle}
                onKeyDown={enterChangeTitle}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
})

export default EditableSpan;