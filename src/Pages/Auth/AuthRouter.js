import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Error404 from './../../_components/Error404';



const AuthRouter = () => {
    return (
        <Routes className='AuthRouter'>
            <Route index element={<Login/> } />
            <Route path='login' element={<Login/> } />
            <Route path='*' element={<Error404 /> } />
        </Routes>
    );
};

export default AuthRouter;