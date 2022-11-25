import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const MyOders = () => {
    const {user} = useContext(AuthContext);
    const {data} = useQuery({
        queryKey: '',
        queryFn:  () => {
            axios.get(`http://localhost:5000/users?email=${user?.email}`)
            .then(data => {
                return data;
            })
        }
    })
    console.log(data);
    return (
        <div>
            
        </div>
    );
};

export default MyOders;