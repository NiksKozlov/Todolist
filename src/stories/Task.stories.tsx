import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import AddItemForm from '../AddItemForm';
import {action} from '@storybook/addon-actions';
import {IconButton, TextField} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {Task} from '../Task';
import {TaskType} from '../Todolist';
import {Provider, useSelector} from 'react-redux';
import {AppRootStateType, store} from '../store/store';
import {ReduxStoreProviderDecorator} from '../store/ReduxStoreProviderDecorator';

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;



const TaskWrapper = () => {

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])

    return <Task task={task} todolistId={'todolistId1'} />
}

const Template: ComponentStory<typeof TaskWrapper> = (args) => <TaskWrapper />

export const TaskStory = Template.bind({})


/*export const TaskIsDoneStory = Template.bind({})
TaskIsDoneStory.args = {
    task: {id: '1', title: 'CSS', isDone: true},
}

export const TaskIsNotDoneStory = Template.bind({})
TaskIsNotDoneStory.args = {
    task: {id: '1', title: 'JS', isDone: false},
}*/
