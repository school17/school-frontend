
import { createMuiTheme } from '@material-ui/core/styles';

const pirmary = '#3a3a3a'
const color = 'rgb(86, 188, 191)'
export const Theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paper:{
        backgroundColor: pirmary
      }
    },
    MuiTypography: {
      root:{
        color: color
      }
    },
    MuiListItemIcon: {
      root: {
        color: color
      }
    },
    MuiSvgIcon: {
      root: {
        color: color
      }
    }
  },
  palette: {
    primary: {
      main: pirmary
    },
  },
});