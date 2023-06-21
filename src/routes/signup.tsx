/**
 * Signup route that handles the signup process using firebase auth for the new user
 */
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <div className="login-form-wrapper">
            <form
                className="login-form"
                onSubmit={async e => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const email = form.email as HTMLInputElement;
                    const password = form.password as HTMLInputElement;
                    const confirm = form.confirm as HTMLInputElement;
                    if (password.value !== confirm.value) {
                        alert("Passwords do not match");
                        return;
                    }
                    try {
                        await createUserWithEmailAndPassword(
                            auth,
                            email.value,
                            password.value
                        );
                    } catch (error) {
                        alert(error);
                    }
                }}
            >
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
            </form>
        </div>
    );
}
