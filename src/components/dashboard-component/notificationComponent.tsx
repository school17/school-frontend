import React, { ReactElement, useEffect } from 'react';
import {
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import {getNotifications} from "../../actions/notification-actions";
import { useDispatch, useSelector } from "react-redux";
import ReactTimeAgo from 'react-time-ago';

interface Props {
  
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
      borderRadius: 10,
      overflow: "auto",
      maxHeight: 280,
      minHeight: 200,
      textAlign: "initial",
      padding: 5,
      fontWeight: 900,
      /*"&::-webkit-scrollbar" : {
        width: "10px"
      },
      "&::-webkit-scrollbar-track" : {
        background : "#555999",
        borderRadius: 10
      },
      "&::-webkit-scrollbar-thumb" :{
        background : "rgba(255,255,255,0.5)",
        borderRadius: 10,
        boxShadow:  "0 0 6px rgba(0, 0, 0, 0.5)"
      }*/
    },
    header : {
      color: "#868686",
      margin: 10,
    },
    notifcation: {
      marginBottom: 8,
      padding: 10,
      "&:hover" : {
        backgroundColor: "#F2F1EF",
        borderRadius: 10,
       
      }
    },
    actions: {
      display: "flex",
      color: "#868686",
      marginTop: 5,
      justifyContent: "space-between"
    },
    join: {
      marginRight: 15,
      color: "#5993E9",
      cursor: "pointer",
    },
    notFound: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 150,
    fontWeight: 900
    }
  })
);

function NotificationComponent({}: Props): ReactElement {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {institution, email, role} = useSelector((store:any) => {
    return store.loginReducer
  });

  const {user} = useSelector((store:any) => {
    return store.userDetailsReducer
  });

  const {notifications} = useSelector((store:any) => {
    return store.notificationReducer;
  });

  const {loggedInUser} = useSelector((store:any) => {
    return store.loggedinUserReducer;
  });

  const listNotifications = notifications.map((notification:any, index:any)=> {
    return(<div key={index} className={classes.notifcation}>
      <span>{notification.message}</span>
      <div  className={classes.actions}>
      <ReactTimeAgo date={notification.lastModified}/>
      {notification.hasFeedback ?  <span  className={classes.join}>JOIN</span> : ''}
      </div>
    </div>
    )
  });

  useEffect(()=> {
    if(institution && Object.keys(user).length > 1){
      if(role === "STUDENT" && Object.keys(loggedInUser).length > 1) {
        dispatch(getNotifications(institution, user.email, role, loggedInUser.division, loggedInUser.grade, loggedInUser.section));
      }else {
        dispatch(getNotifications(institution, user.email, role, user.division, user.grade, user.section));
      }
    }
  },[institution, user, loggedInUser])


  return (
    <div className={classes.root}>
      <div className={classes.header}>NOTIFICATIONS</div>
      <div className={`${notifications.length < 1 ? classes.notFound : ""}`}>
      {notifications.length > 0 ? listNotifications : <span>No Notification found</span>}
      </div>
      
    </div>
  )
}

export default NotificationComponent
