import { useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext.jsx';
import {useAuthService} from "../../services/api/auth/authService.mjs";
import {useAlert} from "../../hooks/useAlert.mjs";
import PasswordRecoveryModal from "../resetPassword/PasswordRecoveryModal.jsx";
import {useNavigate} from "react-router-dom";


export default function LoginForm() {
    // State variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    //State variables and function  for forget password modal
    const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);
    const hideForgetPasswordModal = () => setShowForgetPasswordModal(false);

    // Importing authentication context and service
    const {setAccessToken} = useAuth();// Custom hook for authentication context
    const {login} = useAuthService(); // Custom hook for authentication service
    const { showAlert, AlertComponent} = useAlert(); // Custom hook for alert notifications

    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await login(email, password);
            setAccessToken(response.data.accessToken); // Set the access token in the authentication context
            navigate("/my-trips");
        } catch (err) {
            showAlert("danger","Email or password incorrect.", {autoClose:true, duration:5000} )
        }finally{
            setPassword('');
        }
    }


    return (
        <div
            className="flex-grow-1 d-flex align-items-center justify-content-center"
            style={{backgroundColor: '#f0f2f5'}}
        >
            <Card style={{width: '29rem'}} className="rounded-3 bg-light shadow  py-4 px-3">
                <Card.Body>
                    <Card.Title className="text-center fs-1 mb-4">Login</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formLoginEmail">
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formLoginPassword">
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <AlertComponent />
                        <div className="d-grid">
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </div>
                    </Form>
                    <div className="text-center mb-4 mt-3 d-flex justify-content-center align-items-center gap-2">
                        <Button  onClick={() => setShowForgetPasswordModal(true)} className=" border-0 bg-light text-primary  mr-4">
                            ¿Forgot Password?
                        </Button>
                        <Link to="/auth/signup" className="text-decoration-none ms-4">
                            Sign Up
                        </Link>
                    </div>
                </Card.Body>
            </Card>
            <>
                <PasswordRecoveryModal show={showForgetPasswordModal} hide={hideForgetPasswordModal} />
         </>
        </div>
    );
}
