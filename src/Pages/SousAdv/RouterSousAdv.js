import React from 'react';

import { Route, Routes } from 'react-router-dom';
import LayoutSousAdv from './LayoutSousAdv';
import DashbaordSousAdv from './Dashbaord';
import TransactionSousADv from './Transaction';
import ProfilSousADv from './Profil';
import Error404 from '../../_components/Error404';
import SousAdvCommercialListe from './Commercial';
import DetailCommercial from './Commercial/DetailCommercial';
import AddCommercial from './Commercial/AddCommercial';
import PdvSousAdv from './Pdv';


const RouterSousAdv = () => {
    return (
        <div className='RouterSousAdv'>
            <Routes>
                <Route element={ <LayoutSousAdv/> }>
                    <Route index element={<DashbaordSousAdv />}/>

                    <Route path='dashbaord' element={<DashbaordSousAdv />}/>
                    <Route path='sousadv' element={<DashbaordSousAdv />}/>
                    <Route path="transaction" elemen t={<TransactionSousADv />}/>
                    <Route path="commercial" element={<SousAdvCommercialListe />}/>
                    <Route path="commercial/liste" element={<SousAdvCommercialListe />}/>
                    <Route path="commercial/add" element={<AddCommercial />}/>
                    <Route path="commercial/detail" element={<DetailCommercial />}/>
                    <Route path="pdv/liste" element={<PdvSousAdv />}/>
                    <Route path="pdv/add" element={<AddCommercial />}/>
                    <Route path="pdv/detail" element={<DetailCommercial />}/>
                    <Route path="compte" element={<ProfilSousADv />}/>

                    <Route path='*' element={ <Error404/> } />
                </Route>
            </Routes>
        </div>
    );
};

export default RouterSousAdv;