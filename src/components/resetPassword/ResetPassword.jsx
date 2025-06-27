import {Button, Card, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import tripWiseLogo from "../../assets/images/trip_wise_logo.png";
import {useState} from "react";
import {useAlert} from "../../hooks/useAlert.mjs";
import {useParams, useNavigate} from "react-router-dom";
import {useResetPasswordService} from "../../services/api/resetPassword/resetPasswordService.js";
export default function ResetPassword() {

    // State variables for new password and confirm new password
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // Extract the token from the URL parameters
    const { token } = useParams();

    // Use the reset password service to handle the password reset logic
    const { resetPassword } = useResetPasswordService()

    // Use the custom alert hook to show alerts
    const {showAlert, AlertComponent} = useAlert();

    const navigate = useNavigate();

    // Function to redirect to the login page after successful signup
    const redirectToLogin = () => {
        navigate("/login")
    }

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault()

        // Check if the new password and confirm new password fields are filled
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // Regex to validate password

        // Check if the new password meets the criteria
        if (!passwordRegex.test(newPassword)) {
            return showAlert('danger', 'The password must have at least 8 characters, a capital letter, a lowercase and a number.');
        }
        if (newPassword !== confirmNewPassword) {
            return showAlert('danger', 'Passwords do not match.');
        }

        try {
            await  resetPassword(token, newPassword); // Call the reset password service with the token and new password
            showAlert("success", "Your password has been successfully reset. Redirecting you to the main page to log in.");
            setTimeout(redirectToLogin, 6000) // Redirect to login page after 6 seconds
        }catch (e) {
            showAlert('danger', 'Something went wrong. Please try again.');
        }
    }


    return (
        <div
            className="flex-grow-1 d-flex align-items-center justify-content-center vh-100 "
            style={{backgroundColor: '#f0f2f5'}}
        >

            <Card style={{width: '29rem'}} className="rounded-3 bg-light shadow  py-4 px-3 ">
                <div className="  d-flex align-content-center justify-content-center">
                    <img style={{height:'2rem', width:'10rem', opacity:'90%'}} src={tripWiseLogo}  alt="tripwise logo"/></div>

                <Card.Body className="mt-4">
                    <Card.Title className="text-center fs-1 mb-4">Reset  Password</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2" controlId="formBasicPasswordLogin">
                            <Form.Control
                                required
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Text id="passwordHelpBlock" muted >
                            Password must have at least 8 characters, a capital letter, a lowercase and a number.
                        </Form.Text>
                        <Form.Group className="mb-3 mt-3" controlId="formBasicConfirmPasswordLogin">
                            <Form.Control
                                required
                                type="password"
                                placeholder="Confirm New Password"
                                 value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <AlertComponent />
                        <div className="d-grid mt-4">
                            <Button variant="primary" type="submit">
                                Save New Password
                            </Button>
                            <div className=" d-flex d-flex align-content-center justify-content-center mt-4">
                                <Link to="/auth/login" className="text-decoration-none">
                                Return to login
                            </Link>
                            </div>

                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}