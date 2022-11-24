import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';


const App = () => {

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
                <TodolistsList />
            </Container>
        </div>
    );
};

export default App;
