import React from 'react'
import { useSelector } from 'react-redux'
import {  useNavigate,BrowserRouter } from 'react-router-dom'
import Home from '../Home';


const ProtectedRoute = ({ isAdmin, ...rest }) => {
    const { Component } = rest;
    const navigate = useNavigate();
    const { user, isAuthenticated} = useSelector(state => state.auth);
    <BrowserRouter basename="/Shopping">
    <Home />
  </BrowserRouter>
    if (isAuthenticated) {
        
        if (isAdmin === true && user.role !== 'admin') {
           
            return navigate('/Shopping')
        }

        return <div>
            <Component {...rest} />
        </div>

    }
    else {
        navigate("/login");

    }

}


export default ProtectedRoute