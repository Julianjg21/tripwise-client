import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import LoginForm from "./components/auth/LoginForm.jsx";
import SignupForm from "./components/auth/SignupForm.jsx";
import MyTripsPage from "./pages/MyTripsPage.jsx";
import ResetPassword from "./components/resetPassword/ResetPassword.jsx";
function App() {
  return (
      <BrowserRouter>
          <Routes>
              {/* Redirect root path to login page */}
          <Route path="/*" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth" element={<Navigate to="/auth/login" replace />} />

          <Route path="/auth" element={<LoginPage />}>
              <Route path="login" element={<LoginForm />} />
              <Route path="signup" element={<SignupForm />} />
          </Route>
              <Route path="/my-trips" element={<MyTripsPage />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
