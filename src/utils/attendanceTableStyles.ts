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
        fontSize: '12px',
        fontWeight: 500,
        textAlign: 'center',
        maxWidth: "200px"
      },
      head: {
        fontWeight: 900,
        padding: 8,
        fontSize: 10,
        textAlign: 'center',
        position: 'sticky',
      },
      stickyHeader :{
      }
    }
  }
});