import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import icon from '../../assets/icons8-approval-24.png'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useBuyer from '../../hook/useBuyer';
const ProductItem = ({setSaveProduct, product}) => {
    const {user} = useContext(AuthContext);
    const [isBuyer] = useBuyer(user?.email);
    console.log('productItem', isBuyer);
    // const handleReport = product => {
    //     const {name, isReport} = product;
    const handleReport = product => {
        const {name, isReport} = product;
        if(isReport === false){
            fetch(`https://old-books-here-server.vercel.app/reportedItems`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    toast.success(`Successfully reported ${name} product$`);
                }
            })
        }
    }
    return (
        <div>
           <div className='card custom_card max-w-md m-auto bg-base-100 shadow-xl'>
                <figure className='relative'>
                    {   
                        isBuyer ? 
                        <button onClick={() => handleReport(product)} className='btn-sm right-4 top-4 z-10 absolute cursor-pointer font-semibold text-[15px] bg-yellow-800 text-white rounded-md'>
                        Report
                        </button>
                        : 
                        <button onClick={() => handleReport(product)} disabled className='btn-sm right-4 top-4 z-10 absolute font-semibold text-[15px] bg-yellow-800 text-white rounded-md'>
                        Report
                        </button>
                    }
                    
                    <img className='w-[420px] h-[250px]' src={product.image} alt="Shoes" />
                </figure>
                <div className="card-body p-4">
                    <h2 className="card-title text-[28px]">{product.name}</h2>
                    <p className='text-xl'>Location: <span className='font-medium border-b-2'>{product.location}</span></p>
                    <p className='text-xl'>Resale Price: <span className='font-medium border-b-2' children>{product.rPrice}</span></p> 
                    <p className='text-xl'>Orginal Price: <span className='font-medium border-b-2' children>{product.oPrice}</span></p> 
                    <p className='text-xl'>Post Time: <span className='font-medium border-b-2' children>{product.postedTime}</span></p> 
                    <p className='text-xl'>Use: <span className='font-medium border-b-2' children>{product.yUse}{product.yUse === 1 ? ' year' : ' years'}</span></p> 
                    
                    {
                        product?.pFeedback && <p className='text-xl'>{
                             <>
                                Type: <span className='font-medium border-b-2' children>{product.pFeedback}</span>
                            </>
                        }
                        </p> 
                    }
                    {
                        product?.pDesc && <p className='text-xl'>{
                             <>
                                Description: <span className='font-medium border-b-2' children>{
                                    product.pDesc.length > 75 ? product.pDesc.slice(0,75) + '...' : product.pDesc
                                }</span>
                            </>
                        }
                        </p> 
                    }
                    <div className='flex justify-start items-center mb-3'>
                        <p className='text-xl !flex-grow-0 inline-block'>Saller: <span className='font-medium border-b-2' children>{product.sellerName}</span></p> 
                        <span className='pl-2 !flex-grow-0'><img className='w-4' src={product.verified && icon} alt="" srcset="" /></span>
                    </div>
                    <div className="card-actions justify-end">
                        <label onClick={() => setSaveProduct(product)} htmlFor="booking-modal" className="btn w-full btn-primary border-0 bg-gray-700">Book Now</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;