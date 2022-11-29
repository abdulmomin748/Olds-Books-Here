import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLoaderData } from 'react-router-dom';
import CheckOut from './CheckOut';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
    const productBooking = useLoaderData();
    console.log(productBooking);
    return (
        <div>
            <div className='p-12 '>
                <h6 className='font-semibold text-xl'>Hellow, {productBooking.name}</h6>
                <p>Please pay <strong>{productBooking.productPrice}</strong> for your product<strong> {productBooking.productName}</strong></p>
                <div className='max-w-md mt-12'>
                    <Elements stripe={stripePromise}>
                        <CheckOut productBooking={productBooking} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;