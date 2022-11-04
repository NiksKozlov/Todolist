import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import AddItemForm from '../AddItemForm';
import {action} from '@storybook/addon-actions';
import {IconButton, TextField} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {Task} from '../Task';
import {TaskType} from '../Todolist';
import {Provider} from 'react-redux';
import {store} from '../store/store';
import App from '../App';
import {ReduxStoreProviderDecorator} from '../store/ReduxStoreProviderDecorator';

export default {
    title: 'TODOLISTS/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App />


export const AppStory = Template.bind({})


