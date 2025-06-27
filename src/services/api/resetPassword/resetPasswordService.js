import axios from "axios";

export function useResetPasswordService() {

    // Function to request a password reset
    const passwordRecovery = async (email) => {
        return await axios.post("http://localhost:8080/api/password-reset/request", {email});
    };
    // Function to reset the password using the token and new password
    const resetPassword = async ( token, newPassword) => {
        return await axios.post("http://localhost:8080/api/password-reset/reset", { token,newPassword});
    };

    return {passwordRecovery, resetPassword};
}