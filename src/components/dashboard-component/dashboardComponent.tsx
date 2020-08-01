import React, { ReactElement, useEffect } from "react";
import { Grid } from "@material-ui/core";
import NotificationComponent from "./notificationComponent";
import ListSubjectTeacherAssociation from "../grade-dashboard/listSubjectTeacherAssociation";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectTeacherAssociation } from "../../actions/grade-dashboard-actions";
import { useParams } from "react-router-dom";
import Timetablemin from "./../../common/dashboard-common-components/timetablemin";
import HomeworkComponent from "../../common/dashboard-common-components/homeworkComponent";
import ExamTimeTable from "./../../common/dashboard-common-components/examTimeTable";
import TeachersCard from "../grade-dashboard/teachersCard";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)",
      borderRadius: 10,
      overflow: "auto",
      textAlign: "initial",
      padding: 5,
      fontWeight: 900,
    },
  })
);

function DashboardComponent({}: Props): ReactElement {
  const dispatch = useDispatch();
  const classes = useStyles();
  let { grade, section, id, division } = useParams();
  const { subjectTeacherAssociation } = useSelector((store: any) => {
    return store.gradeDashboardReducer;
  });

  const { institution } = useSelector((store: any) => {
    return store.loginReducer;
  });
const { role } = useSelector((store: any) => {
  return store.loginReducer;
});
  useEffect(() => {
    if (Object.keys(subjectTeacherAssociation).length < 1) {
      dispatch(getSubjectTeacherAssociation(institution, grade, section));
    }
  }, [subjectTeacherAssociation]);

  const showFacultyMembers = () => {
    if (
      subjectTeacherAssociation &&
      subjectTeacherAssociation.subjectTeachers
    ) {
      return (
        <Grid item xs={12} md={3} className={classes.root}>
          <ListSubjectTeacherAssociation
            association={subjectTeacherAssociation.subjectTeachers}
            showEdit={false}
          ></ListSubjectTeacherAssociation>
        </Grid>
      );
    }
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Timetablemin
                institution={institution}
                grade={grade}
                section={section}
                role={role}
              ></Timetablemin>
            </Grid>
            <Grid item xs={12} md={12}>
              <HomeworkComponent
                institution={institution}
                grade={grade}
                section={section}
                role={role}
              ></HomeworkComponent>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              {institution && grade && section ? (
                <ExamTimeTable
                  institution={institution}
                  grade={grade}
                  section={section}
                  division={division}
                  role={role}
                ></ExamTimeTable>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12} md={12}>
              <TeachersCard
                institution={institution}
                grade={grade}
                section={section}
              ></TeachersCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <NotificationComponent />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardComponent;
