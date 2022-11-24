import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../shered/Loading/Loading';

const Categorories = () => {
    const {data: categories, isLoading} = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/productsCategoris');
            const data = await res.json();
            return data;
            
        }
    });
    if(isLoading){
        return <Loading />
    }
    console.log(categories)
    return (
        <div className='grid gap-6 lg:grid-cols-4 grid-cols-1 md:grid-cols-2 py-24 pb-0'>
            {
                categories.map(category => <div className=''>
                    <div className="">
                        <Link className="">
                            <div className="space-y-1 border-2 pb-3 p-4 border-[#b37c05]">
                                <img src={category.image} alt="" className="block rounded-sm h-[170px] w-[300px] dark:bg-gray-500" />
                                <h3 className='text-2xl font-bold'>{category.name}</h3>
                            </div>
                        </Link>
                    </div>
                </div>)
            }    
        </div>
    );
};

export default Categorories;