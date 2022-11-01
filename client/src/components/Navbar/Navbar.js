import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

import useStyles from './styles';
import memories from '../../images/memories.png';
import trout from '../../images/trout.png';
import flyfisherman from '../../images/flyfisherman.png';


const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logoutUser();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const logoutUser = () => {
        dispatch({ type: 'LOGOUT'});

        history.push('/');
        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <img sx={{marginRight: '15px'}} src={flyfisherman} alt='memories' height='100'/>
                <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Fish Stories</Typography>
                <img sx={{marginLeft: '15px'}} src={trout} alt='memories' height='60'/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logoutUser}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;