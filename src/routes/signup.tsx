/**
 * Signup route that handles the signup process using firebase auth for the new user
 */
import { Link, Form } from "react-router-dom";

export default function Signup() {
    return (
        <div className="login-form-wrapper">
            <Form className="login-form" method="POST">
                <h1>Sign Up</h1>
                <p>
                    Already have an account? <Link to="/signin">Login</Link>
                </p>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required />
                <label htmlFor="confirm">Confirm Passowrd</label>
                <input type="password" name="confirm" id="confirm" required />
                <button type="submit">Sign Up</button>
            </Form>
        </div>
    );
}
