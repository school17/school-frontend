import { ThemeProvider, createMuiTheme, makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const paginationTheme = createMuiTheme({
  overrides: {
    MuiFormLabel : {
      root: {
        color: 'coral'
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
    MuiButton: {
      containedPrimary: {
        marginLeft: 15,
        fontSize: 10,
        letterSpacing: 3,
        color: '#EAE2B7',
        backgroundColor: "black",
        "&:hover": {
          backgroundColor: "#003248"
        }
      }
    }
  }
});