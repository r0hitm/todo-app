/**
 * Custom hook that returns the current user's authentication state
 */
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";

function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Subscribe to the Firebase Auth listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                console.log("User is signed in.");
                setUser(user);
            } else {
                console.log("User is not signed in.");
                setUser(null);
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return {
        user,
        loading,
    };
}

export { useAuth };
