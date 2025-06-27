import {Form, Button, Card} from 'react-bootstrap';
import { useState} from "react";
import {Link} from "react-router-dom";
import {useAuthService} from "../../services/api/auth/authService.mjs";
import {useAlert} from "../../hooks/useAlert.mjs";
import {useNavigate} from "react-router-dom";


export default function SignupForm() {

    // State variables for form fields
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Custom hooks for authentication service and alert management
    const {signup} = useAuthService();
    const {showAlert, AlertComponent} = useAlert();

    // Function to redirect to the login page after successful signup
    const redirectToLogin = () => {
        navigate("/login")
    }


    const handleSubmit = async (e) => {
        e.preventDefault();// Prevent default form submission behavior
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // Regex to validate password
        if (!passwordRegex.test(password)) {
            return showAlert('danger', 'The password must have at least 8 characters, a capital letter, a lowercase and a number.');
        }
        if (password !== confirmPassword) {
            return showAlert('danger', 'Passwords do not match.');
        }

        try {
            await signup(fullName, email, password, confirmPassword);
            showAlert("success", "You’ve been registered successfully. Redirecting you to the main page to log in.\n")
            setTimeout(redirectToLogin, 6000) // Redirect to login page after 6 seconds
        } catch (e) {
            if(e.status === 409){
                showAlert("danger", "This email is already in use. Try a different one.\n")
            }else{
                showAlert("danger", "Please make sure all form fields are correctly filled out and try again.\n")
            }

        }
    }


    return (
        <div className="flex-grow-1 d-flex align-items-center justify-content-center"
             style={{backgroundColor: '#f0f2f5'}}>
            <Card style={{width: '29rem'}} className="rounded-3 bg-light shadow  py-4 px-3">
                <Card.Body>
                    <Card.Title className="text-center fs-1 mb-4">Create Account</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicFullNameLogin">
                            <Form.Control
                                required
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmailLogin">
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicPasswordLogin">
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Text id="passwordHelpBlock" muted className="">
                            Password must have at least 8 characters, a capital letter, a lowercase and a number.
                        </Form.Text>
                        <Form.Group className="mb-3 mt-2" controlId="formBasicConfirmPasswordLogin">
                            <Form.Control
                                required
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <AlertComponent />
                        <div className="d-grid">
                            <Button variant="primary" type="submit">
                                Create Account
                            </Button>
                        </div>
                    </Form>
                    <div className="text-center mb-4 mt-1 d-flex justify-content-center align-items-center gap-2">
                        <p className="mb-0">Already have an account?</p>
                        <Link to="/auth/login" className="text-decoration-none">
                            Login
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

