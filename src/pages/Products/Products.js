import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../shered/Loading/Loading';
import { useNavigation } from "react-router-dom";
import '../Page.css';

// import BookingModal from '../shered/BookingModal/BookingModal';
import ProductItem from './ProductItem';
import BookingModal from '../shered/BookingModal/BookingModal';

const Products = () => {

    
    const [saveProduct, setSaveProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const products = useLoaderData();
    setTimeout(() => {
        setLoading(false)
    }, 700)

    if(loading){
        return  <Loading />
    }
    console.log(saveProduct);
    return (
        <div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-24 pt-20'>
                {
                    products.map(product => <ProductItem setSaveProduct={setSaveProduct} key={product._id} product={product} />)
                }
            </div>
            {
               saveProduct && <BookingModal product={saveProduct} setSaveProduct={setSaveProduct}/> 
            }
        </div>

    );
};

export default Products;