
import { createMuiTheme } from '@material-ui/core/styles';

const pirmary = '#0F1727'
const color = '#EAE2B7'
export const Theme = createMuiTheme({
  typography: {
    fontFamily: "Nunito Sans, Roboto, sans-serif",
  },
  overrides: {
    MuiDrawer: {
      paper:{
        backgroundColor: pirmary
      }
    },
    MuiAppBar: {
      colorPrimary:{
        color: 'black',
        backgroundColor: '#FAFAFA'
      }
    },
    MuiPaper: {
      elevation4: {
        boxShadow: "0px 7px 4px -1px rgba(0,0,0,0.08)"
      }
    },
    MuiListItemIcon: {
      root: {
        color: color
      }
    },
    MuiListItemText: {
      root: {
        color: color
      }
    },
    MuiList: {
      padding: {
        padding: '8px 0px 8px 5px'
      }
    },

    MuiIconButton: {
      label:{
        color: '#0F1727'
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
  }
});