import React, { ReactElement, useEffect, useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles
} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from '@material-ui/core/StepConnector';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import ApartmentIcon from '@material-ui/icons/Apartment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { StepIconProps } from '@material-ui/core/StepIcon';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressFrom from "./addressFrom";
import AddAdmins from './addAdmins';
import { useDispatch, useSelector } from "react-redux";
import {
  PreviousStepper,
  ResetStepper,
  NextStepper,
  submitAddressForm,
  submitSchoolInfoFrom
} from "../../actions/address-form-actions";
import SchoolInfoForm from "./schoolInfoForm";
import {updateInstitution} from '../../actions/address-form-actions'

interface Props {}

interface addressForm {
  isValidAddressForm: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      boxShadow: "1px 0px 15px -1px rgba(0,0,0,0.08)"
    },
    buttonContainer: {
      paddingBottom: "25px"
    },
    button: {
      marginRight: theme.spacing(1),
    },
    nextFinishButton: {
      marginRight: theme.spacing(1),
      background: "#00425E",
      "&:hover": {
        backgroundColor: "#003248"
      },
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
);



const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      borderColor: '#00425E',
      backgroundColor: '#00425E',
    },
  },
  completed: {
      '& $line': {
        borderColor: 'green',
        backgroundColor: 'green',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    paddingLeft: '20%',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#00425E',
  },
  completed: {
    backgroundColor: 'green',
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <EditLocationIcon />,
    2: <ApartmentIcon />,
    3: <SupervisorAccountIcon />,
    4: <MenuBookIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}




function getSteps() {
  return ["Address of your School", "School Informations", "Add Admins", "Summary"];
}

function getStepContent(step: number, goToSummary: any): any {
  switch (step) {
    case 0:
      return <AddressFrom></AddressFrom>;
    case 1:
      return <SchoolInfoForm></SchoolInfoForm>;
    case 2:
      return <AddAdmins goToSummary={goToSummary}/>;
    case 3:
      return "Summary"
    default:
      return "ERROR";
  }
}

function OnboardingForm({  }: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [goToSummary, setGotoSummary] = useState(false);
  const { isValidAddressForm, submitSchoolInfoForm, activeStep, isValidSchoolInfoForm } = useSelector(
    (state: any) => {
      return state.addressFormStore;
    }
  );
  const onboardingDetails  =  useSelector((state:any) =>  state.addressFormStore);
  const {institution} = useSelector((store:any) => {
    return store.loginReducer
  })
  const steps = getSteps();
  const handleNext = () => {
    if (activeStep == 0) {
      dispatch(submitAddressForm());
    }
    if (activeStep == 1) {
      dispatch(submitSchoolInfoFrom());
    }
    if(activeStep == 2){
      setGotoSummary(true);
    }

    if(activeStep == 3) {
      console.log("PRINGTIN THE DEATAILS", onboardingDetails)
      dispatch(updateInstitution(onboardingDetails, institution));
    }
  };

  useEffect(() => {
    if (isValidAddressForm && activeStep == 0) {
      dispatch(NextStepper(activeStep));
    }
    if (isValidSchoolInfoForm && activeStep == 1) {
      dispatch(NextStepper(activeStep));
    }
    if(activeStep == 2 && goToSummary){
      dispatch(NextStepper(activeStep));
    }
  }, [isValidAddressForm, isValidSchoolInfoForm, activeStep, goToSummary]);

  const handleBack = () => {
    dispatch(PreviousStepper(activeStep));
    if(activeStep == 3) {
      setGotoSummary(false);
    }
  };

  const handleReset = () => {
    dispatch(ResetStepper());
  };
  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */}

      <div>
        {activeStep === steps.length ? (
          <div className={classes.buttonContainer}>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            {/*<Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>*/}
            {getStepContent(activeStep,goToSummary)}
            <div className={classes.buttonContainer}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.nextFinishButton}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnboardingForm;
