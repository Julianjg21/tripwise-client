import axios from "axios";

export function useAuthService(){

    // Function to handle user login
    const login = async (email, password) =>{
        return await axios.post('http://localhost:8080/api/auth/login', {email, password}, {withCredentials: true});
    }

    // Function to handle user signup
    const signup = async (fullName, email, password) =>{
        return await axios.post('http://localhost:8080/api/auth/signup', {
            fullName,
            email,
            password
        }, { withCredentials: true });
    }



    return {login, signup}
}