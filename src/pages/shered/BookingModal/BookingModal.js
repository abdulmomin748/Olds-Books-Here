import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const BookingModal = ({product, setSaveProduct}) => {
    const {user} = useContext(AuthContext);
    const [isBuyer, setIsBuyer] = useState('')
    console.log('here', product._id);

    useEffect(() => {
        axios.get(`http://localhost:5000/users?email=${user?.email}`)
        .then(res => {
            console.log(res.data.role);
            const buyer = res.data.role;
            setIsBuyer(buyer);
        })
    },[user?.email])


    const handleSubmit = event => {

        event.preventDefault();
        const form = event.target;
        const productName = form.productName.value;
        const productPrice = form.productPrice.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const location = form.meetingLocation.value;
        console.log(productName, productPrice, name, email, phone, location);
        const bookingData = {
            productName,
            productPrice,
            name,
            email,
            phone,
            location,
            image: product.image,
            beforeBookingProductId: product._id,
        }
        console.log(bookingData);

        if(isBuyer){
            fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingData)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.acknowledged){
                    setSaveProduct(null);
                    toast.success('Booking Confirmed');
                }
                else{
                    toast.error(data.message)
                }
            })
            }
            else{
                toast.error('Only user can buy product!')
            }
    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box bg-gray-100 relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-6 top-5">✕</label>
                    <h3 className="text-lg font-bold mb-10">{`Product: ${product.name}`}</h3>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-5'>
                        <input type="text" name='productName' defaultValue={product.name} className="input input-bordered w-full placeholder:!text-black !bg-slate-200 !border-[#dcdcdc]" disabled required/>
                        <input type="text" name='productPrice' disabled defaultValue={product.rPrice} className="input input-bordered w-full placeholder:!text-black !bg-slate-200 !border-[#dcdcdc]" required/>

                        
                        <input type="Email" name='name' placeholder='Name' disabled defaultValue={user?.displayName} className="input input-bordered w-full placeholder:!text-black !bg-slate-200 !border-[#dcdcdc]" required/>
                        <input type="Email" name='email' placeholder='Email' disabled defaultValue={user?.email} className="input input-bordered w-full placeholder:!text-black !bg-slate-200 !border-[#dcdcdc]" required/>

                        <input type='text' name='phone' placeholder='Phone Number' className="input input-bordered w-full placeholder:!text-black" required/>
                        <input type='text' name='meetingLocation' placeholder='Meeting Location' className="input input-bordered w-full placeholder:!text-black" required/>

                        <input type='submit' name='submit' placeholder='Submit' className="uppercase bg-yellow-800  input font-semibold hover:bg-yellow-600 text-white input-bordered w-full cursor-pointer" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;