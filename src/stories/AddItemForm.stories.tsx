import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import AddItemForm from '../AddItemForm';
import {action} from '@storybook/addon-actions';
import {IconButton, TextField} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />

const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | boolean>('Title is required')

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
            args.addItem(trimmedTitle)
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
                error={!!error}
                label={'Title'}
                helperText={error && 'Title is required!'}
            />
            <IconButton onClick={addItem}>
                <AddBoxIcon style={ {color: 'hotpink'} }/>
            </IconButton>

        </div>
    )
}

export const AddItemFormStory = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
    addItem: action('Button clicked inside form')
}

export const AddItemFormWithErrorStory = TemplateWithError.bind({})
AddItemFormWithErrorStory.args = {
    addItem: action('Button clicked inside form')
}