// Utility functions for CSRF token handling
export function getCsrfTokenFromCookie() {
    const match = document.cookie.match(new RegExp('(^| )csrfToken=([^;]+)')); // Regular expression to match the csrfToken cookie
    return match ? match[2] : null;// Return the CSRF token if found, otherwise return null
}
