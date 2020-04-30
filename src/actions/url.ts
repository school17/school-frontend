
const DOMAIN = 'http://localhost:80/api/institution';

export const SAVE_TEACHER_URL = `${DOMAIN}/institutionId/create_teacher`;

export const UPDATE_TEACHER_URL = `${DOMAIN}/institutionId/teachers/teacherId`;

export const SEARCH_TEACHER_URL = `${DOMAIN}/institutionId/teachers/search`;

export const GET_INSTITUTION = `${DOMAIN}/institutionId/get_institution`;

export const GET_USER_DETAILS = `${DOMAIN}/institutionId/users/userName`;

export const UPDATE_PASSWORD = `${DOMAIN}/users/updatePassword`;


const TOKEN: any  = localStorage.getItem("token");

export const HEADERS = {
    'Authorization': TOKEN,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'

}