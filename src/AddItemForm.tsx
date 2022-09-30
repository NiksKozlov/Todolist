import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {IconButton, TextField} from '@material-ui/core';

type AddItemFormPropsType = {
    addItem: (title: string)=>void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItem()
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    return (
        <div>
            <TextField
                size={'small'}
                variant={'outlined'}
                value={title}
                onChange={changeTitle}
                onKeyDown={onKeyDownAddTask}
                error={error}
                label={'Title'}
                helperText={error && 'Title is required!'}
            />
                <IconButton onClick={addItem}>
                    <AddBoxIcon style={ {color: 'hotpink'} }/>
                </IconButton>

        </div>
    )
}

export default AddItemForm;