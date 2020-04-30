
const DOMAIN = 'http://localhost:8081/api/institution';

export const SAVE_TEACHER_URL = `${DOMAIN}/institutionId/create_teacher`;

export const UPDATE_TEACHER_URL = `${DOMAIN}/institutionId/teachers/teacherId`

export const SEARCH_TEACHER_URL = `${DOMAIN}/institutionId/teachers/search`

const TOKEN: any  = localStorage.getItem("token");

export const HEADERS = {
    'Authorization': TOKEN,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'

}