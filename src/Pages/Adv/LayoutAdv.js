import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenuAdv from '../../Components/Adv/SideMenu';
import HeaderSousAdv from '../../Components/SousAdv/Header';

const LayoutAdv = () => {
    return (
        <div className='App'>
            <HeaderSousAdv />
            <div className="SideMenuAndPageContent">
                <SideMenuAdv/>
                <div className='Container'>
                    <Outlet/>
                </div>
            </div>
            
        </div>
    );
};

export default LayoutAdv;