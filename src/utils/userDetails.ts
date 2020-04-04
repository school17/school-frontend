
import jwt_decode from 'jwt-decode';

export const userDetails = () => {
  const token: any  = localStorage.getItem("token");
  const decodedToken:any = jwt_decode(token);
  const parsedDetails = {
    role: decodedToken.role,
    institution: decodedToken.institution,
    email: decodedToken.sub
  }

  return parsedDetails;
}