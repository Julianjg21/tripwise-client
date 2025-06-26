import axios from "axios";
export function useAuthService(){

    const login = async (email, password) =>{
        const response = await axios.post('http://localhost:8080/api/auth/login', {email, password}, { withCredentials: true });
        return response;
    }
    
    const signup = async (fullName, email, password, confirmPassword) =>{
        const response = await axios.post('http://localhost:8080/api/auth/signup', {fullName, email, password}, { withCredentials: true });
        return response;
    }
    return {login, signup}
}