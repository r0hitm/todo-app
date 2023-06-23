/**
 * Login route that handles the login process using firebase auth
 */
import { Link, Form } from "react-router-dom";

export default function Login() {
    return (
        <div className="login-form-wrapper">
            <Form className="login-form" method="POST">
                <h1>Login</h1>
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required />
                <button type="submit">Login</button>
            </Form>
        </div>
    );
}
