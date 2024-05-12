import React from 'react';
import AppHeader from '../../Components/Commercial/AppHeader';
import { Outlet } from 'react-router-dom';
import AppFooter from '../../Components/Commercial/AppFooter';

const LayoutAdv = () => {
    return (
        <div className='App'>
            <AppHeader />
            <div className="SideMenuAndPageContent">
                <h1>Adv layout</h1>
                <div className='Container'>
                    <Outlet/>
                </div>
            </div>
            <AppFooter />
        </div>
    );
};

export default LayoutAdv;