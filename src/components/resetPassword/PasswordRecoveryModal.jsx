import { Button, Form, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { useState } from "react";
import { useResetPasswordService } from "../../services/api/resetPassword/resetPasswordService.js";
import { useAlert } from "../../hooks/useAlert.mjs";
import Spinner from "react-bootstrap/Spinner";

// PasswordRecoveryModal.jsx
export default function PasswordRecoveryModal({ show, hide }) {
  // State to manage the email input
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false); //loading state for the modal
  const closeLoadingModal = () => setLoading(false); //close the loading modal

  // Importing the reset password service
  const { passwordRecovery } = useResetPasswordService();

  // Custom hook to show alerts
  const { showAlert, AlertComponent } = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading state to true to show the loading modal

    try {
      await passwordRecovery(email); // Call the reset password service with the email
      showAlert(
        "success",
        "If the email exists, a recovery message has been sent. Please check your inbox and spam folder."
      );
    } catch (err) {
      showAlert("danger", "Unexpect error, please try again.");
      console.log("Error", err);
    } finally {
      setLoading(false); // Set loading state to false after the operation is complete
    }
  };

  return (
    <Modal show={show} onHide={hide} centered>
      <ModalHeader closeButton className="text-center">
        <Modal.Title className="fs-5 text-secondary">
          Reset Password
        </Modal.Title>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formpasswordRecovery">
            <Form.Label column="lg">Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              value={email}
              placeholder="Enter your registered email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <AlertComponent />
          </Form.Group>
          <Button className="w-100 mt-3" type="submit">
            Send Reset Link
          </Button>
        </Form>
      </ModalBody>

      <div>
        <Modal
          className="shadow "
          show={loading}
          centered
          backdrop="static"
          keyboard={false}
          onHide={closeLoadingModal}
          size="sm"
        >
          <Modal.Body className="text-center bg-secondary rounded border  border-light">
            <div className="text-center">
              <Spinner animation="grow" variant="danger" />
              <Spinner animation="grow" variant="warning" role="status" />
              <Spinner animation="grow" variant="success" role="status" />
              <p className="fw-bolder text-light mt-3">Wait a moment...</p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <Modal.Body></Modal.Body>
    </Modal>
  );
}
