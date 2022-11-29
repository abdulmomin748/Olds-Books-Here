import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { json, Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import Loading from '../../shered/Loading/Loading';

const MyProducts = () => {
    const {user} = useContext(AuthContext);
    const {data: userProducts =[], isLoading, refetch} = useQuery({
        queryKey: ['user?.email'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/products?email=${user?.email}`)
            const data = await res.data;
            return data;
        }
    })  
    const enableAdvertised = product => {
        const {_id, name,} = product;
        fetch(`http://localhost:5000/advertises`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                toast.success(`Successfully addvertised product ${name}`);
                refetch();
            }
        })
    }
    const deleteProduct = product => {
        const {_id, name,} = product;
        fetch(`http://localhost:5000/products/${_id}`,{
            method: 'DELETE'
        }) 
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                toast.success(`Successfully delete product ${name}`)
                refetch();
            }
        })
    }
    if(isLoading){
        return <Loading />
    }
    console.log(userProducts);
    return (
        <div>
            {
                userProducts?.length === 0 ? <div className='min-h-[60vh] flex justify-center items-center font-medium'>
                    <h2 className='text-3xl'>You Haven't add any product yet!</h2>
                    <p className='ml-5'>
                        add product here <Link to='/dashboard/addproduct' className='underline'> Add product</Link>
                    </p>
                </div>
                :
                <div class="overflow-x-auto relative">
                    <table class="w-full text-[16px] text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-[16px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className=''>
                                <th scope="col" class="py-3 px-6">
                                    image
                                </th>
                                <th scope="col" class="py-3 px-6">
                                title 
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    price
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    status
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    adVertise
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userProducts?.map(product => <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className='w-28' src={product?.image} alt="" srcset="" />
                                    </th>
                                    <td class="py-4 px-6">
                                        {product.name}
                                    </td>
                                    <td class="py-4 px-6">
                                        {product.rPrice}
                                    </td>
                                    <td class="py-4 px-6">
                                        <span className='btn-sm text-[15px] bg-yellow-500 text-white rounded-md'>{
                                            product.isPaid ?  'Sold' : 'Available '
                                        }
                                        </span>
                                    </td>
                                    <td class="py-4 px-6">
                                        
                                            {
                                                (product.isPaid || product.advertised) && <button  className='btn-sm cursor-not-allowed text-[15px] bg-yellow-500 text-white rounded-md'>
                                                    Advertised
                                                </button>
                                            }
                                            {
                                                !product.isPaid && !product.advertised && <button onClick={() => enableAdvertised(product)} className='btn-sm text-[15px] bg-yellow-500 text-white rounded-md'>
                                                    Enable advertise
                                                </button>
                                            }
                                    </td>
                                    <td class="py-4 px-6">
                                        <button onClick={() => deleteProduct(product)} className='btn-sm text-[15px] bg-yellow-500 text-white rounded-md'>Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            }
            
        </div>
    );
};

export default MyProducts;