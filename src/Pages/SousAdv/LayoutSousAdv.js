import React from 'react';
import SideMenuSousAdv from '../../Components/SousAdv/SideMenu';
import { Outlet } from 'react-router-dom';
import HeaderSousAdv from '../../Components/SousAdv/Header';

const LayoutSousAdv = () => {
    return (
        <div className='App'>
            <HeaderSousAdv />
            <div className="SideMenuAndPageContent">
                <SideMenuSousAdv></SideMenuSousAdv>
                <div className='Container'>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default LayoutSousAdv;