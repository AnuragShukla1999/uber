import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CaptainProjectWrapper = ({ children }) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { caption, setCaption } = useContext(captainDataContext);

    const [ isLoading, setIsLoading ] = useState(true);


    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
        };

        axios.get(`${import.meta.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setCaption(response.data.caption)
                setIsLoading(false)
            }
        }).catch(err => {
            localStorage.removeItem('token');
            navigate('/captain-logic');
        })
    }, [token])


    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

  return (
    <div>
        { children }
    </div>
  )
}

export default CaptainProjectWrapper