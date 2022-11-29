import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../../shered/Loading/Loading';
import icon from '../../../assets/icons8-approval-24.png'
const Advertised = () => {
    const {data: advertiseProducts =[], isLoading, refetch} = useQuery({
        queryKey: ['advertises'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/advertises')
            const data = await res.data;
            return data;
        }
    }) 
    if(isLoading){
        refetch()
        return <Loading />
    }
    console.log('advertiseProducts', advertiseProducts);
    return (
        <>
            {
                advertiseProducts.length > 0 && <div className='py-24 pb-0'>
                <h2 className='text-4xl font-semibold text-center mb-10'>All Advertise items</h2>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                    {
                        advertiseProducts.map(advertiseItem => <div key={advertiseItem._id} className="card custom_card max-w-md m-auto bg-base-100 shadow-xl">
                            <figure><img className='w-[420px] h-[250px]' src={advertiseItem.image} alt="Shoes" /></figure>
                    <div className="card-body p-4">
                        <h2 className="card-title text-[28px]">{advertiseItem.name}</h2>
                        <p className='text-xl'>Location: <span className='font-medium border-b-2'>{advertiseItem.location}</span></p>
                        <p className='text-xl'>Resale Price: <span className='font-medium border-b-2' children>{advertiseItem.rPrice}</span></p> 
                        <p className='text-xl'>Orginal Price: <span className='font-medium border-b-2' children>{advertiseItem.oPrice}</span></p> 
                        <p className='text-xl'>Post Time: <span className='font-medium border-b-2' children>{advertiseItem.postedTime}</span></p> 
                        <p className='text-xl'>Use: <span className='font-medium border-b-2' children>{advertiseItem.yUse}{advertiseItem.yUse === 1 ? ' year' : ' years'}</span></p> 
                        
                        {
                            advertiseItem?.pFeedback && <p className='text-xl'>{
                                    <>
                                    Type: <span className='font-medium border-b-2' children>{advertiseItem.pFeedback}</span>
                                </>
                            }
                            </p> 
                        }
                        {
                            advertiseItem?.pDesc && <p className='text-xl'>{
                                    <>
                                    Description: <span className='font-medium border-b-2' children>{
                                        advertiseItem.pDesc.length > 75 ? advertiseItem.pDesc.slice(0,75) + '...' : advertiseItem.pDesc
                                    }</span>
                                </>
                            }
                            </p> 
                        }
                        <div className='flex justify-start items-center mb-3'>
                            <p className='text-xl !flex-grow-0 inline-block'>Saller: <span className='font-medium border-b-2' children>{advertiseItem.sellerName}</span></p> 
                            <span className='pl-2 !flex-grow-0'><img className='w-4' src={advertiseItem.verified && icon} alt="" srcset="" /></span>
                        </div>
                    </div>
                        </div>)
                    }
                    </div>
                </div>
            }
        </>
    );
};

export default Advertised;