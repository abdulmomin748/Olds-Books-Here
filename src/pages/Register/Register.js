import React from 'react';
import { Link } from 'react-router-dom';
import SocialSignIn from '../../components/SocialSignIn/SocialSignIn';
import '../Page.css'
const Register = () => {
    
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
                <form novalidate="" action="" className="space-y-8 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label for="name" className="block text-lg">Name</label>
                            <input type="text" name="name" id="name" placeholder="Name" className="w-full px-3 py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label for="password" className="text-lg">Email</label>
                                <Link rel="noopener noreferrer" href="#" className="text-xs hover:underline ">Forgot password?</Link>
                            </div>
                            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label for="name" className="block text-lg">Photo Url</label>
                            <input type="text" name="name" id="name" placeholder="Phot url" className="w-full px-3 py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label for="email" className="block text-lg">Account Type</label>
                            <select className="select text-black select-bordered w-full text-xl" required>
                                <option value='user'>User</option>
                                <option value='seller'>Seller</option>
                            </select>
                        </div>
                        
                    </div>
                    <button type="button" className="w-full bg-[#3f3c3c] hover:bg-slate-900 px-8 py-3 font-semibold rounded-md">Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default Register;