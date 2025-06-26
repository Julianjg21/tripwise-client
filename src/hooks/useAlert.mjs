import { useState, useCallback } from "react";
import Alert from "react-bootstrap/esm/Alert.js"

// Custom hook to manage alert notifications
export const useAlert = () => {
    const [alert, setAlert] = useState(null);
    const [timer, setTimer] = useState(null);

    const showAlert = useCallback((type, message, options = {}) => {
        if (timer) clearTimeout(timer); // Clear any existing timer to prevent multiple alerts stacking

        setAlert({ type, message }); // Set the alert state with type and message

        // If autoClose is enabled, set a timer to automatically close the alert
        if (options.autoClose) {
            const timeout = setTimeout(() => setAlert(null), options.duration || 5000);
            setTimer(timeout);
        }
    }, [timer]);

    // Function to hide the alert manually
    const hideAlert = useCallback(() => {
        if (timer) clearTimeout(timer);
        setAlert(null);
    }, [timer]);

    // Component to render the alert
    const AlertComponent = () =>
        alert ? (
            <Alert variant={alert.type} dismissible onClose={hideAlert} className="mt-3">
                {alert.message}
            </Alert>
        ) : null;

    return { showAlert, hideAlert, AlertComponent };
};
