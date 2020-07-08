import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getSubjectTeacherAssociation} from "../../actions/grade-dashboard-actions";
import ListSubjectTeacherAssociation from "./listSubjectTeacherAssociation";
import { ThemeProvider } from '@material-ui/core/styles';
import { drawerTheme, useDrawerStyles } from '../../utils/drawerStyles';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AddSubjectTeacherAssociationDrawer from "./addSubjectTeacherAssociationDrawer";
import {fetchTeacher} from '../../actions/teacher-action';
interface Props {
  institution:any,
  grade:any,
  section: any
}
const useStyles = makeStyles({
  disclaimer: {
    fontWeight: 800,
    padding: 30
  }
});
function SubjectTeacherAssociationComponent({institution, grade, section}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const drawerClass = useDrawerStyles();
  const [openDrawer, toggleOpenDrawer] = useState(false);

  const {subjectTeacherAssociation} = useSelector((store:any) => {
    return store.gradeDashboardReducer;
  });

  const searchQuery = {
    pageNumber: 0,
    pageSize: 100
  }

  useEffect(() => {
    dispatch(fetchTeacher(institution, searchQuery, {}));
    dispatch(getSubjectTeacherAssociation(institution,  grade, section))

  }, [])

  const clicked = () => {
    if(openDrawer) toggleOpenDrawer(false);
    else toggleOpenDrawer(true);
  }

  const renderView = () => {
    if(Object.keys(subjectTeacherAssociation).length < 1) {
      return (
        <div className={classes.disclaimer}>
          <p>This Class doesn't have the faculty memebers added to subjects</p>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={drawerClass.button}
            onClick={clicked}
            >
              Add
            </Button>
            <AddSubjectTeacherAssociationDrawer openDrawer = {openDrawer} callBack={clicked} drawerClass={drawerClass}></AddSubjectTeacherAssociationDrawer>
        </div>
      )
    } else {
      /*return (
        <div>
          <ListSubjectTeacherAssociation association={subjectTeacherAssociation.subjectTeachers} showEdit={true} callBack={clicked}></ListSubjectTeacherAssociation>
          <AddSubjectTeacherAssociationDrawer openDrawer = {openDrawer} callBack={clicked} drawerClass={drawerClass} addedAssociation={subjectTeacherAssociation.subjectTeachers}></AddSubjectTeacherAssociationDrawer>
        </div>
        
        
      )*/
    }
  }
  return (
    <ThemeProvider theme={drawerTheme}>
      {renderView()}
      
    </ThemeProvider>
  )
}

export default SubjectTeacherAssociationComponent

