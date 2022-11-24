import React from 'react';
import bannerBg from '../../../assets/Home.Banner.BookSale.jpg'
const Banner = () => {
    return (
        <>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${bannerBg})`}}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-xl">
                    <h1 className="mb-5 text-5xl font-bold">Buy Old Books</h1>
                    <p className="mb-5 text-lg">A book is a medium for recording information in the form of writing or images, typically composed of many pages (made of papyrus, parchment, vellum, or paper) bound together and protected by a cover.</p>
                    <button className="btn bg-white text-black hover:!border-white border hover:text-white border-white hover:bg-transparent w-32 font-semibold">Buy Book</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;