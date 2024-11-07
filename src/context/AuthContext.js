import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null)
    const [isSignedIn, setIsSignedIn] = useState(false)


    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            if (user) {

                if (user.emailVerified) {
                    setUser(user)
                    setIsSignedIn(true)
                }
            } else {
                setUser(null)
                setIsSignedIn(false)
            }
        })
    }, [])


    return (
        <AuthContext.Provider value={{ user, isSignedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider