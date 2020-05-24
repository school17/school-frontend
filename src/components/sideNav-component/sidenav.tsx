import React from 'react';
import clsx from 'clsx';
import Base from "../support-agent/base";
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import HelpIcon from '@material-ui/icons/Help';
import { Omit } from '@material-ui/types';
import Tooltip from '@material-ui/core/Tooltip';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import {useSelector} from "react-redux";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Button from "@material-ui/core/Button";
import FaceIcon from '@material-ui/icons/Face';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    customButton: {
      marginLeft: "auto",
      marginRight: "5%",
    },
    customDims: {
      marginLeft: 15,
      padding: 0,
      height: 35,
      width: 35,
    },
    customArrow: {
      padding: 0,
    },
  }),
);

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps}/>
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default function SideNav() {
  const {role, institution} = useSelector((store:any) => {
    return store.loginReducer
  })
  const {onboardingComplete, name} = useSelector((store:any) => {
    return store.addressFormStore
  })
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openProfile = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const listMenusAfterOnbaordingCompleted = () => {
    if(onboardingComplete) {
      return(
        <div>
      <ListItemLink to="/teachers" primary="Teachers" icon={<Tooltip title="Teachers" aria-label="teachers" placement="right"><LocalLibraryIcon /></Tooltip>}></ListItemLink>
      <ListItemLink to="/class" primary="Class Room" icon={<Tooltip title="Manage Class Room" aria-label="Class Room" placement="right"><MeetingRoomIcon /></Tooltip>}></ListItemLink>
      <ListItemLink to="/students-management" primary="Manage Students" icon={<Tooltip title="Manage Students" aria-label="Manage Students" placement="right"><FaceIcon /></Tooltip>}></ListItemLink>
        </div>
      )
      
    }
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const logout = () => {
    handleClose();
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {name}
          </Typography>
          {/* <Button variant="outlined" color="secondary" size="medium" 
            endIcon={<ExitToAppIcon/>} 
            className = {classes.customButton} 
            onClick={logout}>
            LOGOUT
          </Button> */}
          <div className = {classes.customButton}>
            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  edge="start"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle className = {classes.customDims}/>
                  <ArrowDropDownIcon className = {classes.customArrow}/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  open={openProfile}
                  onClose={handleClose}
                >
                  <MenuItem onClick={logout}>Logout</MenuItem>
                  {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                </Menu>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItemLink to="/support" primary="Support" icon={<Tooltip title="Support" aria-label="support" placement="right"><LibraryBooksIcon /></Tooltip>}></ListItemLink>
          <ListItemLink to="/syllabus" primary="Syllabus" icon={<Tooltip title="Syllabus" aria-label="syllabus" placement="right"><HelpIcon /></Tooltip>}></ListItemLink>
          <ListItemLink to={`/institution/${institution}/school-onboarding`} primary="School Details" icon={<Tooltip title="School-onbarding" aria-label="School-onbarding" placement="right"><HelpIcon /></Tooltip>}></ListItemLink>
          {
            listMenusAfterOnbaordingCompleted()
          }
          
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Base></Base>
      </main>
    </div>
  );
}