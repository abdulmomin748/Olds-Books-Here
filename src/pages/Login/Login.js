import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SocialSignIn from '../../components/SocialSignIn/SocialSignIn';
import '../Page.css';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {signIn} = useContext(AuthContext)


    // if(errors){
    //     if(errors?.email){
    //         toast.error(`${errors.email?.message}`)
    //     }
    //     else{
    //         toast.error(`${errors.password?.message}`)
    //     }
    // }
    const handleLogin = (data, e) => {
        console.log(data, errors);
        
        signIn(data.email, data.password)
        .then(result => {
            const user = result.user;
            toast.error(`Log in successfully!`)
            console.log(user);
            e.target.reset();
        })
        .catch(err => {
            toast.error(`${err.message}`)
        });
    }

    return (
        <div className='py-20'>
            <div className="w-full max-w-md mx-auto p-4 rounded-md shadow sm:p-8 bg-yellow-600  text-white">
                <h2 className="mb-3 text-3xl font-semibold text-center">Login</h2>
                <p className="text-lg text-center dark:text-gray-400">Dont have account?
                    <Link to='/register' rel="noopener noreferrer" className="focus:underline hover:underline"> Sign up here</Link>
                </p>
                <div className="my-6 space-y-4">
                    <SocialSignIn />
                </div>
                <div className="flex items-center w-full my-4">
                    <hr className="w-full "/>
                    <p className="px-3 ">OR</p>
                    <hr className="w-full"/>
                </div>
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-8 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label for="email" className="block text-lg">Email address</label>
                            <input {...register("email", { required: 'Email Address is required' })}  type="email" name="email" id="email" placeholder="Email" className="text-black w-full px-3 py-2 border rounded-md" />
                            
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label for="password" className="text-lg">Password</label>
                                <Link rel="noopener noreferrer" href="#" className="text-xs hover:underline ">Forgot password?</Link>
                            </div>
                            <input {...register("password", { required: 'Password is required' })} type="text" name="password" id="password" placeholder="*****" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-[#3f3c3c] hover:bg-slate-900 px-8 py-3 font-semibold rounded-md">Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default Login;