
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
export const useDashboardPrimaryStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
    fontWeight: 800,
    backgroundColor: "#F8F8F8",
    padding: 10,
    borderRadius: 8
  },
  action: {
    color: "#6DA0E6",
    cursor: "pointer"
  }
}));