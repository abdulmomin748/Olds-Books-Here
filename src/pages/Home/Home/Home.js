import React from 'react';
import Advertised from '../Advertised/Advertised';
import Banner from '../Banner/Banner';
import Categorories from '../Categorories/Categorories';
import RecentPost from '../RecenPost/RecentPost';

const Home = () => {
    return (
        <>
            <Banner />
            <Categorories />
            <Advertised />
            <RecentPost />
        </>
    );
};

export default Home;