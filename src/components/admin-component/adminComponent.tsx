import React, { ReactElement } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AdminActionsComponent from "./adminActionsComponent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
    },
  })
);

interface Props {}
export default function AdminComponent({}: Props): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AdminActionsComponent>
      </AdminActionsComponent>
    </div>
  );
}
