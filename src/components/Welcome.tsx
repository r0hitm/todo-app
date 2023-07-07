/**
 * This component will be rendered when the user is not logged in.
 */
import { signInWithGoogle } from "../firebase";

export default function Welcome() {
    return (
        <div className="welcome">
            <h1>Todo-App</h1>
            <p>
                A simple todo app built by{" "}
                <a href="https://github.com/r0hitm">Rohit Mehta</a> 
                using React, Typescript, and Firebase. <strong>Note</strong>:
                This is not a production app.
                <br />
                View on <a href="https://github.com/r0hitm/todo-app">Github</a>.
            </p>
            <p>
                You must be logged in to use this app.
                <br />
                <button onClick={signInWithGoogle}>Sign in with Google</button>
            </p>
        </div>
    );
}
