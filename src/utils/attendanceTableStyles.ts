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
        padding: '28px 8px',
        fontSize: '14px',
        fontWeight: 500,
        textAlign: 'center',
        borderRight: '1px solid lightgrey'
      },
      head: {
        fontWeight: 900,
        padding: 8,
        fontSize: 15,
        textAlign: 'center',
        position: 'sticky',
        borderRight: '1px solid lightgrey'
      },
      stickyHeader :{
        backgroundColor: 'rgb(230, 230, 230)'
      }
    }
  }
});