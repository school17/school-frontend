
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core/styles";
import {purple} from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';

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
    MuiSelect:{
      root:{
        textAlign: "left"
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
  secondaryInput: {
    backgroundColor: "#FFF",
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
  addDivisionButton: {
    background: "#00425E",
    "&:hover": {
      backgroundColor: "#003248",
    },
  },
  Grid: {
    marginLeft: "auto"
  },
  label: {
    top: '-50px',
    color: 'black',
    left: '10px',
    fontWeight: 500,
    fontSize: '15px',
    "& .DatePicker" :{
      width: "90%",
    },
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
    //overflowY: 'scroll'
  },
  datePicker: {
    border: 'none',
    backgroundColor: '#F5F6F8',
    borderRadius: '4px',
    minHeight: 60,
    paddingLeft: 12,
    color:"black"
  },
  textArea: {
    padding:"10px",
    borderRadius: 5,
    backgroundColor: "#F5F6F8",
    fontWeight: "bold"
  }
})
);
export const CustomSwitch = withStyles({
  switchBase: {
    color:'#0F1727',
    '&$checked': {
      color: '#0F1727',
    },
    '&$checked + $track': {
      backgroundColor: '#0F1927',
    },
  },
  checked: {},
  track: {},
})(Switch);
