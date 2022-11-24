import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

type AddItemFormPropsType = {
    addItem: (title: string)=>void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                size={'small'}
                error={!!error}
                variant={'outlined'}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownAddTask}
                label={'Title'}
                helperText={error}
            />
                <IconButton color='primary' onClick={addItem}>
                    <AddBox style={ {color: 'hotpink'} }/>
                </IconButton>

        </div>
    )
})
