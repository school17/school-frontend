import React, { ReactElement } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AdminListComponent from "../admin-component/adminListComponent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
    },
    ExamImgSize: {
      position: "absolute",
      height: "50px",
      width: "50px",
      left: "0px",
    },
    TeacherImgSize: {
      position: "absolute",
      height: "50px",
      width: "50px",
      left: "80px",
    },
    ImgDiv: {
      position: "relative",
      boxShadow: "1px 0px 15px -1px rgba(100,100,100,0.08)",
    },
  })
);

interface Props {}
export default function AdminComponent({}: Props): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AdminListComponent>
      </AdminListComponent>
    </div>
  );
}