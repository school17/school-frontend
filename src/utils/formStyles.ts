
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core/styles";

export const textFieldTheme  = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        backgroundColor: "#F5F6F8",
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
    MuiButton: {
      containedPrimary: {
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
});
export const formUseStyles = makeStyles((theme: Theme) =>
createStyles({
  root:{
    flexGrow: 1,
  },
  formControl: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    width: "75%"
  },
  drawerFormControl: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: '0 20px',
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(5),
  },
  MuiPaperRoot: {
    maxHeight: 300
  },
  button: {
    marginTop: theme.spacing(6) + 10
  },
  Grid: {
    marginLeft: "auto"
  },
  label: {
    top: '-50px',
    color: 'black',
    left: '10px',
    fontWeight: 500,
    fontSize: '15px'
  },
  drawerLabel: {
    top: '-50px',
    color: 'black',
    left: '25px',
    fontWeight: 500,
    fontSize: '12px', 
  },
  error: {
    textAlign: "start",
    margin: '10px 0 0 10px',
    fontWeight: 400,
    color: '#cc0000'
  },
  formFields: {
    paddingTop: 20,
    maxHeight: '500px',
    overflowY: 'scroll'
  }
}),
);  