import React, {useCallback} from 'react';
import './App.css';
import {TaskType} from './TodolistRedux';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTodolistAC} from './store/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {TodolistRedux} from './TodolistRedux';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function AppWithRedux() {
    //BLL:

    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const dispatch = useDispatch()

    //tasks CRUD
    // const removeTask = (taskId: string, todoListId: string) => {
    //     dispatch(removeTaskAC(taskId, todoListId))
    // }
    // const addTask = (title: string, todoListId: string) => {
    //     dispatch(addTaskAC(title, todoListId))
    // }
    // const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
    //     dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    // }
    // const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
    //     dispatch(changeTaskTitleAC(taskId, title, todoListId))
    // }


    //todoLists CRUD
    // const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
    //     dispatch(changeTodolistFilterAC(filter, todoListId))
    // }
    // const changeTodoListTitle = (title: string, todoListId: string) => {
    //     dispatch(changeTodolistTitleAC(title, todoListId))
    // }
    // const removeTodoList = (todoListId: string) => {
    //     dispatch(removeTodolistAC(todoListId))
    // }
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant="outlined">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0px'}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={5} justifyContent={'center'}>
                    {
                        todoLists.map(tl => {
                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={10} style={{padding: '20px'}}>
                                        <TodolistRedux
                                            todolistId={tl.id}
                                            filter={tl.filter}
                                            title={tl.title} />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
