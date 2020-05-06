export const InitialState = {
  isImageSet: false,
  imageUrl: "/assest/upload.png",
  isValidAddressForm: false,
  isValidSchoolInfoForm: false,
  activeStep: 0,
  submitAddressForm: false,
  submitSchoolInfoForm: false,
  name: "",
  branch: "",
  mode: "",
  grades: "",
  phoneNumber: "",
  adminUser: "",
  email: "",
  onboardingComplete: false,
  address: {
    address1: "",
    address2: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: ""
  },
  divisionProvided: [],
  availableGradesAndSections:[]
};

export default (state = InitialState, action: any = {}) => {
  switch (action.type) {
    case "VALID_ADDRESS_FORM":
      return {
        ...state,
        isValidAddressForm: true,

        address: action.payload,
        name: action.payload.name,
        branch: action.payload.branch

      };
    case "VALID_SCHOOL_INFO_FORM":
      return {
        ...state,
        isValidSchoolInfoForm: true,
        mode:  action.payload.mode,
        grades: action.payload.grades,
        phoneNumber: action.payload.phoneNumber,
        email: action.payload.email,
        adminUser: action.payload.adminUser
      };
    case "RESET_STEPPER":
      return {
        ...state,
        activeStep: 0,
        isValidAddressForm: false,
        isValidSchoolInfoForm: false,
      };
    case "PREVIOUS_STEPPER":
      return {
        ...state,
        activeStep: action.currentStepper - 1,
        isValidAddressForm: false,
        submitAddressForm: false,
        submitSchoolInfoForm: false,
        isValidSchoolInfoForm: false
      };

    case "NEXT_STEPPER":
      return {
        ...state,
        activeStep: action.currentStepper + 1
      };

    case "SUBMIT_ADDRESS_FORM":
      return {
        ...state,
        submitAddressForm: true
      };
    case "RESET_ADDRESS_FORM":
      return {
        ...state,
        submitAddressForm: false
      };

    case "RESET_SCHOOL_INFO_FORM":
      return {
        ...state,
        submitSchoolInfoForm: false
      };

    case "SUBMIT_SCHOOL_INFO_FORM": {
      return {
        ...state,
        submitSchoolInfoForm: true
      };
    }
    case "SET_IMAGE": {
      return {
        ...state,
        isImageSet: true
      };
    }
    case "SET_PREVIEW_IMAGE": {
      return {
        ...state,
        imagePreview: action.payload
      };
    }
    case "RESET_IMAGE": {
      return {
        ...state,
        imageUrl: ''
      }
    }
    case 'SET_IMAGE_URL' : {
      return {
        ...state,
        imageUrl: action.image
      }
    }

    case 'GET_SCHOOL_DETAILS': {
      return {
        ...state,
        branch: action.payload.branch,
        name: action.payload.schoolName,
        address: action.payload.address,
        mode:action.payload.mode,
        grades:action.payload.grades,
        phoneNumber: action.payload.phoneNumber,
        email: action.payload.email,
        state: action.payload.state,
        divisionProvided: action.payload.divisionProvided,
        availableGradesAndSections: action.payload.availableGradesAndSections

      }
    }
    case 'ADD_GRADES_AND_DIVISION':{
      return {
        ...state,
        divisionProvided: action.payload.divisionsProvided,
        availableGradesAndSections: action.payload.availableGradesAndSections
      }
    }
    default:
      return {
        ...state,
        isValidAddressForm: false,
        activeStep: 0
      };
  }
};
