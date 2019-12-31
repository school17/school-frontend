import React, { ReactElement, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);

interface Props {
  
}


function LoginComponent({}: Props): ReactElement {
  let location = useLocation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const [userName] = useState(localStorage.getItem('userName'));
  const updateName = (event:any) =>{
    setName(event.target.value);
  }
  const updatePassword = (event:any) =>{
    setPassword(event.target.value);
  }
  const submitHandler = () =>{
    localStorage.setItem("userName", name);
  }
  if(userName){
    return (
      <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
        />
    )
  }
  return (
    <div className={classes.root}>
    <form onSubmit={submitHandler}>
      <TextField
            id="standard-full-width"
            label="Label"
            style={{ margin: 50 }}
            placeholder="User Name "
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value = {name}
            onChange = {updateName}
        />

        <TextField
            id="standard-full-width"
            label="Password"
            style={{ margin: 50 }}
            type="password"
            autoComplete="current-password"
            value = {password}
            onChange = {updatePassword}
        />
        <Button variant="contained" style={{ margin: 50 }} type="submit">Login</Button>  
    </form>
      
    </div>
  )
}

export default LoginComponent
