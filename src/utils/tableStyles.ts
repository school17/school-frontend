import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core/styles";

export const tableRowTheme = createMuiTheme({
  overrides: {
    MuiTable: {
      root: {
       
      }
    },
    MuiTableRow: {
      root: {
        "&:hover": {
          backgroundColor: "rgb(247, 247, 247)"
        }
      }
    },
    MuiTableCell: {
      body: {
        padding: '20px 10px',
        fontSize: '14px',
        fontWeight: 500,
        textAlign: 'center'
      },
      head: {
        fontWeight: 900,
        paddingTop: 30,
        fontSize: 15,
        textAlign: 'center',
        position: 'sticky',
      },
      stickyHeader :{
        backgroundColor: 'rgb(230, 230, 230)'
      }
    }
  }
});

//86, 188, 191