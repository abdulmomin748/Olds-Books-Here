import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import axios from "axios";
const SocialSignIn = () => {
    const {signInWithGmailPopup} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const handleSocialSignIN = () => {
        signInWithGmailPopup()
        .then(result => {
            const user = result.user;
            console.log(user);
            toast.success('Login Successfully');
            saveUser(user.displayName, user.email, user.emailVerified, user.photoURL)
            navigate(from, {replace: true});
        })
        .catch(err => console.error(err))
    }

    const saveUser = (name, email, isVerified, photoURL) => {
        const user = {
            name,
            email,
            isVerified,
            photoURL,
            role: "buyer"
        }
        axios.post(`http://localhost:5000/users?email=${user?.email}`, user)
        .then(res => console.log(res.data.message))
        .catch(err => console.log(err))
    }   

    return (
        <div>
            <button onClick={handleSocialSignIN} aria-label="Login with Google" type="button" className="flex ggle_btn items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
                <p>Login with Google</p>
            </button> 
        </div>
    );
};

export default SocialSignIn;