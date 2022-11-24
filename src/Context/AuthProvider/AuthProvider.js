import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, updateProfile } from "firebase/auth";
export const AuthContext = createContext();
const gmaiProvider = new GoogleAuthProvider();
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
        
    }

    const signInWithGmailPopup = () => {
        setLoading(true)
        return signInWithPopup(auth, gmaiProvider);
    }

    const updateProfileName = name => {
        updateProfile(auth.currentUser, {
            displayName: name,
        })
    }

    const logOut = () => {
        setLoading(true)
        localStorage.removeItem('genius-token');
        return signOut(auth) 
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unSubscribe();
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGmailPopup,
        updateProfileName,
        logOut
    }  
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;