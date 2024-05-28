import React from 'react';

import AppHeader from '../../Components/Commercial/AppHeader';
import SideMenu from '../../Components/Commercial/SideMenu';
import { Outlet } from 'react-router-dom';


const LayoutCommercial = () => {
    return (
        <div className='App'>
            <AppHeader />
            <div className="SideMenuAndPageContent">
                <SideMenu/>
                <div className='Container'>
                    <Outlet/>
                </div>
            </div>
            
        </div>
    );
};
export default LayoutCommercial;