import React from 'react';
import icon from '../../assets/icons8-approval-24.png'
const ProductItem = ({setSaveProduct, product}) => {
    return (
        <div>
           <div className='card custom_card max-w-md m-auto bg-base-100 shadow-xl'>
                <figure><img className='w-[420px] h-[250px]' src={product.image} alt="Shoes" /></figure>
                <div className="card-body p-4">
                    <h2 className="card-title text-[28px]">{product.name}</h2>
                    <p className='text-xl'>Location: <span className='font-medium border-b-2'>{product.location}</span></p>
                    <p className='text-xl'>Resale Price: <span className='font-medium border-b-2' children>{product.rPrice}</span></p> 
                    <p className='text-xl'>Orginal Price: <span className='font-medium border-b-2' children>{product.oPrice}</span></p> 
                    <p className='text-xl'>Post Time: <span className='font-medium border-b-2' children>{product.postedTime}</span></p> 
                    <div className='flex justify-start items-center mb-3'>
                        <p className='text-xl !flex-grow-0 inline-block'>Saller: <span className='font-medium border-b-2' children>{product.sellerName}</span></p> 
                        <span className='pl-2 !flex-grow-0'><img className='w-4' src={product.verified && icon} alt="" srcset="" /></span>
                    </div>
                    <div className="card-actions justify-end">
                        <label onClick={() => setSaveProduct(product)} htmlFor="booking-modal" className="btn w-full btn-primary border-0 bg-gray-700">Buy Now</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;