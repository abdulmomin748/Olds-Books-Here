import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import Loading from '../../shered/Loading/Loading';

const MyOders = () => {
    const {user} = useContext(AuthContext);

    const {data: orders = [], isLoading} = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://old-books-here-server.vercel.app/bookings?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
    if(isLoading){
        return <Loading />
    }
    console.log(orders)
    return (
        <>
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
                                action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map(order => <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className='w-28' src={order?.image} alt="" srcset="" />
                                </th>
                                <td class="py-4 px-6">
                                    {order.productName}
                                </td>
                                <td class="py-4 px-6">
                                    {order.productPrice}
                                </td>
                                <td class="py-4 px-6">
                                    {
                                        order.productPrice && !order.paid && <>
                                            <Link to={`/dashboard/payment/${order._id}`}>
                                                <button className='btn-sm font-semibold text-[15px] bg-yellow-800 text-white rounded-md'>
                                                    Pay
                                                </button>
                                            </Link>
                                        </>
                                    }
                                    {
                                        order.productPrice && order.paid && <>
                                            <p className='font-semibold border-b'>Paid</p>
                                        </>
                                        
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyOders;