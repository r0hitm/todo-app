/**
 * AuthProvider is a component that wraps the entire application and provides
 * the authentication context
 */
import AuthContext from "./AuthContext";
import { useAuth } from "./hooks/useAuth";

export default function AuthProvider({ children }: { children: any }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
