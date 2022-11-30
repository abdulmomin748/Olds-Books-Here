import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import BookingModal from '../../shered/BookingModal/BookingModal';
import Loading from '../../shered/Loading/Loading';
import AdvertisedItem from './AdvertisedItem';

const Advertised = () => {
    const [saveProduct, setSaveProduct] = useState(null);
    const {data: advertiseProducts =[], isLoading, refetch} = useQuery({
        queryKey: ['advertises'],
        queryFn: async () => {
            const res = await axios.get('https://old-books-here-server.vercel.app/advertises')
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
                        advertiseProducts.map(advertiseItem => <AdvertisedItem setSaveProduct={setSaveProduct} key={advertiseItem._id} advertiseItem={advertiseItem}  />)
                    }
                    </div>
                    {
                        saveProduct && <BookingModal product={saveProduct} setSaveProduct={setSaveProduct}/> 
                     }

                </div>
            }
        </>
    );
};

export default Advertised;