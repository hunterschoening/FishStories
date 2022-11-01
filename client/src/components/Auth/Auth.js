import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useHistory } from "react-router-dom";

import Input from "./Input";
import useStyles from './styles';
import { signin, signup } from '../../actions/auth';

const initialFormData = { 
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const createOrGetUser = async (res) => {
        const token = res.credential;
        const result = jwt_decode(res.credential);
        result.token = token;
        
        try {
            dispatch({ type: 'AUTH', payload: { result }});
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignUp) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item>
                            <GoogleLogin text={isSignUp ? "signup_with" : "signin_with"}
                                onSuccess={(res) => createOrGetUser(res)}
                                onError={() => { console.log('Login Failed'); }}
                            />
                        </Grid>
                        <Grid item>
                            <Button color="default" variant="contained" onClick={switchMode}>{isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;