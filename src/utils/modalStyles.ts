
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
export const modalStyles = makeStyles((theme: Theme) => (
  createStyles(
    {
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '800'
      },
      paper: {
        border: '2px solid #000',
      },
      parent: {
        backgroundColor:"#fff",
        paddingLeft: '6rem',
        paddingTop: 30,
        paddingBottom: 30,
        borderRadius: 10,
        maxWidth: 800,
        minWidth: 800
      },
      card: {
        minWidth: 800,
        maxWidth: 800,
        minHeight: 350
      },
      formControl: {
        width: "100%",
        padding: 30,
      },
      inputLabel: {
        padding: 38,
        top: "-8px"
      },
      buttomGroup: {
        display: "flex",
      },
      button: {
        margin: 5
      }
    }
  )
))

export const filterModalStyles = makeStyles((theme: Theme)=>(
  createStyles({
    parent: {
      minWidth: 700,
      backgroundColor: '#FFF',
      padding: '30px 0px 30px 30px',
      borderRadius: 8
    }
  })
))