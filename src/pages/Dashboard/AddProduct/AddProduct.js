import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import Loading from '../../shered/Loading/Loading';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [categories, setCategories] = useState('')
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user)
    const imageHostKey = process.env.REACT_APP_imgbb_apiKey;
    const [addproduct, setAddProduct] = useState('')
    const [productId, setProductId] = useState('637f455c345d495b77927d28')
    useEffect(() => {   
        axios.get('https://old-books-here-server.vercel.app/productsCategoris')
        .then(data => {
            const cat = data.data;
            setCategories(cat)
            setLoading(false)
        })
    },[]);
    

    const handleAddProduct = e => {
        e.preventDefault();
        const form = e.target;
        const categoryId = productId;
        const sellerName = user?.displayName;
        const name = form.pName.value;
        const image = form.image.files[0];
        const pCategory = form.pCategory.value;
        const rPrice = form.rPrice.value;
        const oPrice = form.oPrice.value;
        const pFeedback = form.pFeedback.value;
        const uNumber = form.uNumber.value;
        const location = form.uLocation.value;
        const pDesc = form.pDesc.value;
        const yUse = form.pYearsofUse.value;
        const pPurchaseDate = form.pPurchaseDate.value;
        const postedTime = form.pPostDate.value;
        
        
        // console.log(addProductInfo);

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        axios.post(url, formData)
        .then(res => {
            console.log(res.data.data);
            if(res.data.success){
                const addProductInfo = {
                    categoryId,
                    sellerName,
                    email: user?.email,
                    name,
                    image: res.data.data.url,
                    pCategory,
                    rPrice,
                    oPrice,
                    pFeedback,
                    uNumber,
                    location,
                    pDesc,
                    yUse,
                    pPurchaseDate,
                    postedTime,
                    verified: false,
                    isPaid: false,
                    isReport: false,   
                }
                console.log(image);
                axios.post('https://old-books-here-server.vercel.app/products', addProductInfo)
                .then(res => {
                   if(res.data.acknowledged){
                        form.reset();
                        toast.success(`${name} product added`);
                        navigate('/dashboard/myproducts')
                   }
                })
            }
        })
        .catch(err => {
            toast.error(`${err.message}`)
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
            <div className="w-full max-w-[550px] mx-auto p-4 rounded-md shadow sm:p-8 bg-yellow-800  text-white">
                <form onSubmit={handleAddProduct} className="space-y-8 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <input required type="text" name="pName" id="pName" placeholder="Product Name" className="text-black w-full px-3 py-2 border rounded-md" />
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
                                    <input required  {...register("name", {
                                    required: "Name is required",
                                    })} name='image'  type="file" class="" />
                                </label>
                            </div>    
                        </div>
                        <div className="space-y-2">
                            <select onChange={(e) => setProductId(e.target.value)} required name='pCategory' id='pCategory' className="select text-black select-bordered w-full text-xl">
                                {
                                   categories?.map(category => <option value={category._id}>{category.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="space-y-2">
                            <input required type="text" name="rPrice" id="rPrice" placeholder="Product recel price" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input required type="text" name="oPrice" id="oPrice" placeholder="Product original price" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input required type="text" name="pFeedback" id="pFeedback" placeholder="Product Feedback" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input required type="text" name="uNumber" id="uNumber" placeholder="Seller Number" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input required type="text" name="uLocation" id="uLocation" placeholder="Seller Location" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input required type="text" name="pDesc" id="pDesc" placeholder="Product description" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input required type="text" placeholder='Years of use' name="pYearsofUse" id="pYearsofUse" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input required type="text" placeholder='Year of purchase' name="pPurchaseDate" id="pPurchaseDate" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        
                        <div className="space-y-2">
                            <input required type="text" name="pPostDate" id="pPostDate" defaultValue={formatDate(new Date())} disabled className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                    </div>
                     <button type="submit" className="w-full bg-[#3f3c3c] hover:bg-slate-900 px-8 py-3 font-semibold rounded-md uppercase">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;