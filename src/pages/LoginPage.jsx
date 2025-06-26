import { Navbar, Container } from "react-bootstrap";
import tripWiseLogo from "../assets/images/trip_wise_logo.png";
import { Outlet } from "react-router-dom";
import "../styles/LoginPage.css";

export default function LoginPage() {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="p-2">
        <Container>
          <Navbar.Brand href="/">
            <img className="navbar-logo" src={tripWiseLogo} alt="TripWise" />
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Login Form */}
      <Outlet />

      {/* Footer */}
      <footer className="bg-primary text-light mt-auto">
        <div className="container py-2">
          <div className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Julian Jiménez.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
