import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SocialSignIn from '../../components/SocialSignIn/SocialSignIn';
import '../Page.css';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import axios from "axios";
const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {createUser, updateProfileName} = useContext(AuthContext);
    // const [user, saveUser] = useState('')

    const handleSignUp = (data, e) => {
        console.log(data);
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            toast.success('User Create Successfully!')
            updateProfileName(data.name)
                .then(() => {
                    saveUser(data?.email, data?.name, data?.optionValue, data?.password, data?.photoUrl, data?.emailVerified)
                })
                .catch(err => {console.log(err)})
            e.target.reset();
        })
        .catch(err => {
            console.error(err);
            toast.error(`${err.message}`)
        })
    }
    const saveUser = (email, name, optionValue, password, photoUrl, isVerified) => {
        const user = {
            email,
            name, 
            role: optionValue,
            photoUrl,
            isVerified: false
        }
        axios.post(`https://old-books-here-server.vercel.app/users?email=${user?.email}`, user)
        .then(res => console.log(res.data.message))
        .catch(err => console.log(err))
    }
    return (
        <div className='py-20'>
            <div className="w-full max-w-[500px] mx-auto p-4 rounded-md shadow sm:p-8 bg-yellow-600  text-white">
                <h2 className="mb-3 text-3xl font-semibold text-center">Sign Up</h2>
                <p className="text-lg text-center dark:text-gray-400">Already have an account?
                    <Link to='/login' rel="noopener noreferrer" className="focus:underline hover:underline"> Log in here</Link>
                </p>
                <div className="my-6 space-y-4">
                    <SocialSignIn />
                </div>
                <div className="flex items-center w-full my-4">
                    <hr className="w-full "/>
                    <p className="px-3 ">OR</p>
                    <hr className="w-full"/>
                </div>
                <form onSubmit={handleSubmit(handleSignUp)} className="space-y-8 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label for="name" className="block text-lg">Name</label>
                            <input {...register("name", { required: 'name field is required' })} type="text" name="name" id="name" placeholder="Name" className="w-full text-black  px-3 py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label for="name" className="block text-lg">Email</label>
                            <input {...register("email", { required: 'email field is required' })} type="email" name="email" id="email" placeholder="Email" className="text-black w-full px-3 py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label for="name" className="block text-lg">Password</label>
                            <input {...register("password", { required: 'password field is required' })} type="password" name="password" id="password" placeholder="*****" className="text-black w-full px-3 py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label  className="block text-lg">Photo Url</label>
                            <input {...register("photoUrl", { required: 'PhotoUrl field is required' })} type="text" name="photoUrl" id="photoUrl" placeholder="Photo url" className="text-black w-full px-3 py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label for="email" className="block text-lg">Account Type</label>
                            <select name='optionValue' id='optionValue' className="select text-black select-bordered w-full text-xl" {...register("optionValue", { required: 'optionValue field is required' })}>
                                <option value='buyer'>Buyer</option>
                                <option value='seller'>Seller</option>
                            </select>
                        </div>
                        
                    </div>
                    <button type="submit" className="w-full bg-[#3f3c3c] hover:bg-slate-900 px-8 py-3 font-semibold rounded-md">Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default Register;