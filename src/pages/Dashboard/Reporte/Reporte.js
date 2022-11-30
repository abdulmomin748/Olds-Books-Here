import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import Loading from '../../shered/Loading/Loading';

const Reporte = () => {
    const {user} = useContext(AuthContext)
    const {data: reportedItems = [], isLoading, refetch} = useQuery({
        queryKey: ['reportedItems'],
        queryFn: async () => {
            const res = await axios.get(`https://old-books-here-server.vercel.app/reportedItems`)
            const data = await res.data;
            return data;
        }
    });
    console.log(reportedItems);
    if(isLoading){
        return <Loading />
    }
    const handleDelete = id => {
        fetch(`https://old-books-here-server.vercel.app/deletereportedItems/${id}`,{
            method: 'DELETE'
        }) 
        .then(res => res.json())
        .then(data => {
            // if(data.deletedCount > 0){
            //     toast.success(`Successfully delete`)
            //     refetch();
            // }
        })
    }
    return (
        <>
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
                                action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedItems?.map(reportItem => <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td class="py-4 px-6">
                                    {reportItem.sellerName}
                                </td>
                                <td class="py-4 px-6">
                                    {reportItem.email}
                                </td>
                                <td class="py-4 px-6">
                                    <button onClick={() => handleDelete(reportItem._id)} className='btn-sm font-semibold text-[15px] bg-yellow-800 text-white rounded-md'>
                                        Delete
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Reporte;