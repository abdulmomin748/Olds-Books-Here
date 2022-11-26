import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import Loading from '../../shered/Loading/Loading';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [categories, setCategories] = useState('')
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [addproduct, setAddProduct] = useState('')

    useEffect(() => {   
        axios.get('http://localhost:5000/productsCategoris')
        .then(data => {
            const cat = data.data;
            setCategories(cat)
            setLoading(false)
        })
    },[]);

    const handleAddProduct = e => {
        e.preventDefault();
        const form = e.target;
        const seller = user?.displayName;
        const pName = form.pName.value;
        const pPhotoUrl = form.pPhotoUrl?.value;
        const pCategory = form.pCategory.value;
        const pPrice = form.pPrice.value;
        const pFeedback = form.pFeedback.value;
        const uNumber = form.uNumber.value;
        const uLocation = form.uLocation.value;
        const pDesc = form.pDesc.value;
        const pYearsofUse = form.pYearsofUse.value;
        const pPurchaseDate = form.pPurchaseDate.value;
        const pPostDate = form.pPostDate.value;

        const addProductInfo = {
            seller,
            pName,
            pPhotoUrl,
            pCategory,
            pPrice,
            pFeedback,
            uNumber,
            uLocation,
            pDesc,
            pYearsofUse,
            pPurchaseDate,
            pPostDate,
        }
        axios.post('http://localhost:5000/products', addProductInfo)
        .then(res => {
           if(res.data.acknowledged){
                form.reset();
                toast.success(`${pName} product added`);
                
           }
        })
        
    }
    if(loading){
        return <Loading />
    }
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    function formatDate(date) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/');
    }

   
    return (
        <div className='py-20'>
            <h2 className="mb-12 text-4xl font-semibold text-center">Add Product</h2>
            <div className="w-full max-w-[550px] mx-auto p-4 rounded-md shadow sm:p-8 bg-yellow-600  text-white">
                <form onSubmit={handleAddProduct} className="space-y-8 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <input type="text" name="pName" id="pName" placeholder="Product Name" className="text-black w-full px-3 py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2"> 
                            <div class="flex items-center justify-center w-full">
                                <label
                                    class="flex flex-col w-full h-32 border-4  border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300 hover:text-black">
                                    <div class="flex flex-col items-center justify-center pt-7">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p class="pt-1 text-sm tracking-wider ">
                                            Attach Product Image</p>
                                    </div>
                                    <input type="file" class="" />
                                </label>
                            </div>    
                        </div>
                        <div className="space-y-2">
                            <select name='pCategory' id='pCategory' className="select text-black select-bordered w-full text-xl">
                                {
                                   categories?.map(category => <option value={category.name}>{category.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="space-y-2">
                            <input type="text" name="pPrice" id="pPrice" placeholder="Product Price" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input type="text" name="pFeedback" id="pFeedback" placeholder="Product Feedback" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input type="text" name="uNumber" id="uNumber" placeholder="Seller Number" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input type="text" name="uLocation" id="uLocation" placeholder="Seller Location" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input type="text" name="pDesc" id="pDesc" placeholder="Product description" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input type="text" placeholder='Years of use' name="pYearsofUse" id="pYearsofUse" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input type="text" placeholder='Year of purchase' name="pPurchaseDate" id="pPurchaseDate" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        
                        <div className="space-y-2">
                            <input type="text" name="pPostDate" id="pPostDate" defaultValue={formatDate(new Date())} disabled className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                    </div>
                     <button type="submit" className="w-full bg-[#3f3c3c] hover:bg-slate-900 px-8 py-3 font-semibold rounded-md">Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;