import React, { ReactElement, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { formUseStyles, textFieldTheme } from "../../utils/formStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import {roles} from '../../constants/roles';
import {divisions, gradesForDivision} from '../../constants/divisions';
import MenuItem from "@material-ui/core/MenuItem";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {setDivsionAndGrades} from '../../actions/address-form-actions'
interface Props {

  goToSummary: any
}

function AddAdmins({goToSummary  }: Props): ReactElement {
  const initialValues = {
    division: '',
    sections: '',
    grades: []
  }
  const classes = formUseStyles();
  const dispatch = useDispatch();
  const [divisionList, setDivisionList] = useState([{}]);

  const [divisionProvidedArray, setDivisionProvidedArray] = useState([]);

  const [constructAvailableGradesAndSections, setAvailableGradesAndSections] = useState([]);

  const [grades, setGrades] = useState([]);
  const formik = useFormik({
    initialValues,
    onSubmit: (values: any) => {
      addAdmin(values);
    }
  });
  const addAdmin = (values:any) => {
    setDivisionList([
      ...divisionList,
      {
        division: values.division,
        sections: values.sections,
        grades: values.grades
      }
    ]);
    const dividsionGradeArray = selectedGradesList.map((grade: any) =>  {
      const sectionObj = {
        grade: grade, numberOfSections: values.sections
      }
      return sectionObj;
    })
    const gradesAndSectionObject: any = {
      division : values.division,
      divisionGrade: dividsionGradeArray
    }
    setAvailableGradesAndSections(constructAvailableGradesAndSections.concat(gradesAndSectionObject));
    setDivisionProvidedArray(divisionProvidedArray.concat(values.division));
    formik.handleReset(initialValues);
    setselectedGradesList(
      []
    );
  }
  const divisionsDropDown = divisions.map((item: any, index: any) => {
    return (
      <MenuItem value={item} key={index}>
        {item}
      </MenuItem>
    );
  });

  const listAllDivisions = divisionList.map((item:any, index: any) => {
    return(
      <div key={index}>
        <span>{item.division}</span>: <span>{item.sections}</span>
      </div>
    )
  });

  const [selectedGradesList, setselectedGradesList] = useState([]);

  const setDivision = (event:any , division:any) => {
    const key:any = event.target.value.replace(" ", "_")
    const val = gradesForDivision[key];
    setGrades(val);
    setTimeout(() => {
      formik.setFieldValue('division', event.target.value, true);
    }, 1);
    setselectedGradesList(
      []
    )

  }
  
  const selectedGrades = () => {
    return selectedGradesList;
  }

  const setGradesOnChange = (grade:any) => {
    setselectedGradesList(
      grade
    )

  }

  useEffect(()=>{
    if(goToSummary){
      dispatch(setDivsionAndGrades({
        divisionsProvided :divisionProvidedArray,
        availableGradesAndSections :constructAvailableGradesAndSections
      }))
    }
  },[goToSummary]);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} md={3}>
        <FormControl className={classes.formControl}>
                  <InputLabel className={classes.label} shrink={false}>
                    Select A Division
                  </InputLabel>
                  <Select
                    name="division"
                    id="division"
                    variant="outlined"
                    defaultValue= "PRIMARY"
                    value={formik.values.division}
                    onChange={(event:any, value:any) => {setDivision(event, value)}}
                    onBlur={formik.handleBlur}
                  >
                    {divisionsDropDown}
                  </Select>
                </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
              <FormControl className={classes.drawerFormControl}>
                <InputLabel className={classes.drawerLabel}>Classes</InputLabel>
                <Autocomplete
                  multiple
                  id="grades-autocomplete"
                  options={grades}
                  //getOptionLabel={(option) => option}
                  ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
                  defaultValue={selectedGrades()}
                  value={selectedGrades()}
                  onChange = {(event:any, value:any) => {setGradesOnChange(value)}}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
                  </Grid>
        <Grid item xs={12} md={2}>
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.label}>Number of sections</InputLabel>
            <TextField
              variant="outlined"
              name="sections"
              id="sections"
              value={formik.values.sections}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={true}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant="contained" color="primary" type="submit" className={classes.addDivisionButton}>
            Add Divisions
          </Button>
        </Grid>
      </Grid>
      </form>
      {/* {listAllDivisions}

      {divisionProvidedArray.length} */}
    </div>
  );
}

export default AddAdmins;
