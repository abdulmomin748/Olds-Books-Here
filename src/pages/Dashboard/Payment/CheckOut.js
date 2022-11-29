import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../shered/Loading/Loading';
     
     const CheckOut = ({productBooking}) => {
        const {productPrice, name, email,productName, _id} = productBooking;
        const stripe = useStripe();
        const elements = useElements();
        const [loading, setLoading] = useState(false);
        const [clientSecret, setClientSecret] = useState("");
        console.log(clientSecret,productBooking)
        useEffect(() => {
            // Create PaymentIntent as soon as the page loads
            fetch("http://localhost:5000/create-payment-intent", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({productPrice}),
            })
              .then((res) => res.json())
              .then((data) => setClientSecret(data.clientSecret));
                // axios.post(`http://localhost:5000/create-payment-intent`, {productPrice})
                // .then(res => setClientSecret(res.clientSecret))
          }, [productPrice]);

        const handleSubmit = async (event) => {
            event.preventDefault();
            if (!stripe || !elements) {
                return;
            }
            const card = elements.getElement(CardElement);
            if (card == null) {
                return;
            }
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });
            if (error) {
                console.log( error.type.message);
                toast.error(`${error.message}`)
            }
            setLoading(true);
            const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
                clientSecret, // parameter
                {
                  payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                    },
                  },
                },
              );
            if(confirmError){
                toast.error(`${confirmError.message}`);
                return;
            }
            if(paymentIntent.status){
                toast.success(`Payment completed product ${productName}`);
                setLoading(false);
                const payment = {
                    productPrice,
                    email,
                    bookingId: _id,
                }
                fetch('http://localhost:5000/payments', {
                    method: 'POST', 
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(payment)
                })
                .then(res => res.json())
                .then(data => {
                   if(data.insertedId){
                        toast.success('Payment completed')
                   }
                })
            }
            console.log('paymentIntent',paymentIntent)
            
        }       
        return (
            <div>
                <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                    style: {
                        base: {
                        fontSize: '16px',
                        color: '#424770',
                        border: '1px solid red',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                        },
                        invalid: {
                        color: '#9e2146',
                        },
                    },
                    }}
                />
                <button className='btn bg-primary' type="submit" disabled={!stripe || !clientSecret || loading}>
                    Pay
                </button>
                </form>
            </div>
        );
     };
     
     export default CheckOut;