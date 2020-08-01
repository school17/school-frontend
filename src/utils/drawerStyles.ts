import { ThemeProvider, createMuiTheme, makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const drawerTheme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#FFF',
        color: '#EAE2B7'
      }
    },
    MuiFormLabel : {
      root: {
        color: 'coral' 
      }
    },
    MuiSelect:{
      root:{
        textAlign: "left"
      }
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: "#F5F6F8",
        fontSize: 14,
        fontWeight: 500,
        "& $notchedOutline": {
          borderColor: "#F5F6F8"
        },
        "&:hover $notchedOutline": {
          borderColor: "#F5F6F8"
        },
        "&$focused $notchedOutline": {
          borderColor: "#F5F6F8"
        }
      }
    },
    MuiChip: {
      root: {
        backgroundColor: '#FFF',
        border: 'solid 1px orange'
      },
      label: {
        fontSize: 10,
        fontWeight: 500
      }
    },
    MuiButton: {
      containedPrimary: {
        color: '#EAE2B7',
        backgroundColor: "#00425E",
        "&:hover": {
          backgroundColor: "#003248"
        }
      }
    },
    MuiList:{
      root: {
        maxHeight: 150
      }
    }
  }
})

export const useDrawerStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    maxWidth: '75%',
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  drawer: {
    maxWidth: 400,
    backgroundColor: '#0F1727'
  },
  header: {
    marginLeft: '30px'
  },
  form: {
    backgroundColor: "#FFF",
    paddingTop: 20,
    maxHeight: 'calc(100vh - 50px)',
    //overflowY: 'scroll'
  },
  buttonContainer: {
    position:'fixed',
    bottom: '0',
    padding: '15px 0px 10px 0px' ,
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingRight: '30px',
    width: '400px',
    backgroundColor: '#FFF',
    boxShadow: "9px 4px 4px 4px rgba(0, 0, 0, 0.1)"
  },
  button: {
    fontSize: 10
  },
  searchButton : {
    fontSize: 15,
    padding: "12px 0px"
  },
  customButton: {
    marginRight: 15,
    fontSize: 10
  },
  pincode: {
    paddingBottom: 70
  }
}),
);
