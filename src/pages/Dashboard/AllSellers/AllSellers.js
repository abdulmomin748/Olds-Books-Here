import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import Loading from '../../shered/Loading/Loading';

const AllSeller = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    const {data: sellers = [], isLoading, refetch} = useQuery({
        queryKey: ['allSeller'],
        queryFn: async () => {
            const res = await axios.get('https://old-books-here-server.vercel.app/allSellers')
            const data = await res.data;
            return data;
        }
    });

    const handleVarify = users => {
        const {name,email, _id} = user;
        fetch(`https://old-books-here-server.vercel.app/users?email=${user?.email}`,{
            method: 'PATCH',
        })
        .then(res => res.json())
        .then(data => {
            alert('ok')
        })
    }

    const handleDelete = user => {
        const {name, _id} = user;
        fetch(`https://old-books-here-server.vercel.app/users/${_id}`,{
            method: 'DELETE'
        }) 
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                toast.success(`Successfully delete User ${name}`)
                refetch();
            }
        })
    }
    if(isLoading){
        return <Loading />
    }
    console.log('seller', sellers);
    return (
        <div>
        {
           sellers?.length === 0 ?  <div className='min-h-[60vh] flex justify-center items-center font-medium'>
                <h2 className='text-3xl font-medium'>Sellers Not Found.</h2>
            </div>
            :
            <div class="overflow-x-auto relative">
                <table class="w-full text-[16px] text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-[16px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className=''>
                            <th scope="col" class="py-3 px-6">
                                Name
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Email 
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Status
                            </th>
                            <th scope="col" class="py-3 px-6">
                                action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers?.map(seller => <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td class="py-4 px-6">
                                    {seller.name}
                                </td>
                                <td class="py-4 px-6">
                                    {seller.email}
                                </td>
                                <td class="py-4 px-6">
                                    {
                                        seller.verified && <button className='cursor-not-allowed btn-sm font-semibold text-[15px] bg-yellow-800 text-white rounded-md'>
                                            Verified
                                        </button>
                                    }
                                    {
                                        !seller.verified && <button onClick={() => handleVarify(seller)} className='btn-sm font-semibold text-[15px] bg-yellow-800 text-white rounded-md'>
                                            Verify Now
                                        </button>
                                    }
                                </td>
                                <td class="py-4 px-6">
                                    <button onClick={() => handleDelete(seller)} className='btn-sm font-semibold text-[15px] bg-yellow-800 text-white rounded-md'>
                                        Delete
                                    </button>
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

export default AllSeller;