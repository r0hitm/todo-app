/**
 * Login route that handles the login process using firebase auth
 */
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="login-form-wrapper">
            <form
                className="login-form"
                onSubmit={async e => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const email = form.email as HTMLInputElement;
                    const password = form.password as HTMLInputElement;
                    try {
                        await signInWithEmailAndPassword(
                            auth,
                            email.value,
                            password.value
                        );
                    } catch (error) {
                        alert(error);
                    }
                }}
            >
                <h1>Login</h1>
                <p>
                    Don't have an account?{" "}
                    <Link to="/signup">Sign up</Link>
                </p>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
