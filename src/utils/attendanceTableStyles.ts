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
        maxWidth: "200px",
        padding: "15px 0px",
        backgroundColor: "#FFFFFF",
        "&:nth-child(2n)":{
          backgroundColor: "#F5F6F8"
        },
        "&:nth-child(1)": {
          padding: "15px 15px"
        }
      },
      head: {
        fontWeight: 900,
        fontSize: 10,
        textAlign: 'center',
        position: 'sticky',
        backgroundColor: "#FFFFFF",
        padding: "12px 5px"
      },
      stickyHeader :{
        backgroundColor: "#FFFFFF",
        "&:nth-child(2n)":{
          backgroundColor: "#F5F6F8"
        }
      }
    }
  }
});