import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../shered/Loading/Loading';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [categories, setCategories] = useState('')
    const [loading, setLoading] = useState(true);
    useEffect(() => {   
        axios.get('http://localhost:5000/productsCategoris')
        .then(data => {
            const cat = data.data;
            setCategories(cat)
            setLoading(false)
        })
    },[])
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
    const handleAddProduct = (data, e) => {
        console.log(data);
        // const addProductInfo = {
        //     name,
        //     email,
        //     isVerified,
        //     photoUrl,
        //     role: "buyer"
        // }
        // axios.post(`http://localhost:5000/users`, user)
        // .then(res => console.log(res))
        // .catch(err => console.log(err))

    }
        
       
    return (
        <div className='py-20'>
            <h2 className="mb-12 text-4xl font-semibold text-center">Add Product</h2>
            <div className="w-full max-w-[550px] mx-auto p-4 rounded-md shadow sm:p-8 bg-yellow-600  text-white">
                
                <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-8 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <input {...register("pName", { required: 'Product name is required' })}  type="text" name="pName" id="pName" placeholder="Product Name" className="text-black w-full px-3 py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <select name='pCategory' id='pCategory' className="select text-black select-bordered w-full text-xl" {...register("pCategory", { required: 'Product category is required' })}>
                                {
                                   categories?.map(category => <option value={category.name}>{category.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="space-y-2">
                            <input {...register("pPrice", { required: 'Product price is required' })} type="text" name="pPrice" id="pPrice" placeholder="Product Price" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input {...register("pFeedback", { required: 'Product Feedback is required' })} type="text" name="pFeedback" id="pFeedback" placeholder="Product Feedback" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input {...register("uNumber", { required: 'Number filed is required' })} type="text" name="uNumber" id="uNumber" placeholder="Seller Number" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input {...register("uLocation", { required: 'User Location is required' })} type="text" name="uLocation" id="uLocation" placeholder="Seller Location" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input {...register("pDesc", { required: 'Product description is required' })} type="text" name="pDesc" id="pDesc" placeholder="Product description" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input {...register("pPurchaseDate", { required: 'Product purchase date is required' })} type="text" placeholder='Product Purchase date' name="pPurchaseDate" id="pPurchaseDate" className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <input {...register("pPostDate", { required: 'Product purchase date is required' })} type="text" name="pPostDate" id="pPostDate" defaultValue={formatDate(new Date())} disabled className="w-full px-3 text-black py-2 border rounded-md" />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-[#3f3c3c] hover:bg-slate-900 px-8 py-3 font-semibold rounded-md">submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;