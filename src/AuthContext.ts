/**
 * AuthContext.tsx
 * Provide authentication context for the app using React Context API
 */
import { createContext } from "react";
import { User } from "firebase/auth";

const AuthContext = createContext<null | User>(null);

export default AuthContext;
