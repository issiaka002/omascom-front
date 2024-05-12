import React from 'react';
import LayoutAdv from './LayoutAdv';
import { Route, Routes } from 'react-router-dom';
import Error404 from '../../_components/Error404';
import Adv from '../../Components/Adv';

const RouterAdv = () => {
    return (
        <div className='RouterAdv'>
            <Routes>
                <Route element={ <LayoutAdv/> }>
                    <Route index element={<Adv />}/>
                    <Route path='*' element={ <Error404/> } />
                </Route>
            </Routes>
        </div>
    );
};

export default RouterAdv;