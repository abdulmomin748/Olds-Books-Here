import React from 'react';
import Banner from '../Banner/Banner';
import Categorories from '../Categorories/Categorories';
import RecentPost from '../RecenPost/RecentPost';

const Home = () => {
    return (
        <>
            <Banner />
            <Categorories />
            <RecentPost />
        </>
    );
};

export default Home;