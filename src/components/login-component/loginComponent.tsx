import React, { ReactElement, useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {useDispatch} from "react-redux";
import {setLoginDetails} from '../../actions/login-actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    }
  })
);

interface Props {}

function LoginComponent({  }: Props): ReactElement {
  let location = useLocation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const [userName, setUserName] = useState(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const updateName = (event: any) => {
    setName(event.target.value);
  };
  const updatePassword = (event: any) => {
    setPassword(event.target.value);
  };
  const submitHandler = (event:any) => {
   fetchToken();
   event.preventDefault();
  };

  useEffect(() =>{
    if(userName){
      const token: any = jwt_decode(userName.replace("Bearer ", ""));
      console.log("DISPATCHING EVENT", token.role, token.institution)
      dispatch(setLoginDetails(token.role, token.institution));
    }
  }, [userName])
 

  const fetchToken =  () => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/login',
      data: {
        email: name,
        password: password
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      const token: any = jwt_decode(response.data.Authorization.replace("Bearer ", ""));
      localStorage.setItem("token", response.data.Authorization);
      localStorage.setItem("role", token.role);
      localStorage.setItem("institution", token.institution);
      localStorage.setItem("expiry", token.expiry);
      setUserName(response.data.Authorization);

    }).catch(error => {
      console.log("ERROR", error);
    })
  }

  if (userName) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: location }
        }}
      />
    );
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
          value={name}
          onChange={updateName}
        />

        <TextField
          id="standard-full-width"
          label="Password"
          style={{ margin: 50 }}
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={updatePassword}
        />
        <Button variant="contained" style={{ margin: 50 }} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginComponent;
