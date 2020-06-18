
const DOMAIN = 'http://localhost:8081/api/institution';
//const DOMAIN = 'http://ec2-13-58-111-197.us-east-2.compute.amazonaws.com/api/institution';

export const SAVE_TEACHER_URL = `${DOMAIN}/institutionId/create_teacher`;

export const UPDATE_TEACHER_URL = `${DOMAIN}/institutionId/teachers/teacherId`;

export const SEARCH_TEACHER_URL = `${DOMAIN}/institutionId/teachers/search`;

export const GET_INSTITUTION = `${DOMAIN}/institutionId/get_institution`;

export const GET_USER_DETAILS = `${DOMAIN}/institutionId/users/userName`;

export const UPDATE_PASSWORD = `${DOMAIN.replace('/institution',"")}/users/updatePassword`;

export const GET_AVAILABLE_TEACHERS = `${DOMAIN}/institutionId/teachers/available_teachers`;

export const SAVE_GRADE_URL = `${DOMAIN}/institutionId/create_grade`;

export const UPDATE_GRADE_URL = `${DOMAIN}/institutionId/grades/gradeId`;

export const SEARCH_GRADES_URL = `${DOMAIN}/institutionId/grades/search`;

export const GET_TEACHER_BY_GRADE = `${DOMAIN}/institutionId/teachers/name/grade/grades_teacher`;

export const DELETE_TEACHER_URL = `${DOMAIN}/institutionId/teachers/teacherId`;

export const UPDATE_INSTITUTION = `${DOMAIN}/institutionId/update_institution`;

export const SEARCH_STUDENTS_URL = `${DOMAIN}/institutionId/students/search_students`;

export const CREATE_STUDENT_URL = `${DOMAIN}/institutionId/students/create_student`;

export const UPDATE_STUDENT_URL = `${DOMAIN}/institutionId/students/studentId`;

export const GET_ATTENDANCE_NAMES_URL = `${DOMAIN}/institutionId/students/grade/section`;

export const GET_MONTH_ATTENDANCE_URL = `${DOMAIN}/institutionId/attendance/grade/section/month/year`;

export const GET_NOTIFICATIONS_URL = `${DOMAIN}/institutionId/notification`;

export const GET_TEACHER_DETAILS_URL = `${DOMAIN}/institutionId/teachers/email`;

export const GET_STUDENT_DETAILS_URL = `${DOMAIN}/institutionId/students/email`;



const TOKEN: any  = localStorage.getItem("token");

export const HEADERS = {
    'Authorization': localStorage.getItem("token"),
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'

}