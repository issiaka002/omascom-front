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
import TransactionDetail from '../Commercial/Transaction/TransactionDetail';
import AddTransaction from '../Commercial/Transaction/AddTransaction';
import ParcoursCommercial from './parcours';
import PdvSousAdv from './Pdv/index';
import AddPdvSousAdv from './Pdv/AddPdv';
import DetailPdv from './Pdv/DetailPdv';
import AddTransactionSousAdv from './Transaction/AddTransactionSousAdv';
import ParametreSousAdv from './Parametre';
import RecouvrementSousAdv from './Recouvrement';


const RouterSousAdv = () => {
    return (
        <div className='RouterSousAdv'>
            <Routes>
                <Route element={ <LayoutSousAdv/> }>
                    <Route index element={<DashbaordSousAdv />}/>

                    <Route path='dashbaord' element={<DashbaordSousAdv />}/>
                    
                    <Route path="transaction" element={<TransactionSousADv />}/>
                    <Route path="transaction/add" element={<AddTransactionSousAdv/>}/>

                    <Route path="recouvrement" element={<RecouvrementSousAdv />}/>
                    <Route path="recouvrement/add" element={<Error404/>}/>

                    <Route path="transaction/detail/:reference" element={<TransactionDetail />}/>

                    <Route path="commercial" element={<SousAdvCommercialListe />}/>
                    <Route path="commercial/liste" element={<SousAdvCommercialListe />}/>
                    <Route path="commercial/add" element={<AddCommercial />}/>
                    <Route path="commercial/detail/:contact" element={<DetailCommercial />}/>

                    <Route path="pdv" element={<PdvSousAdv />}/>
                    <Route path="pdv/liste" element={<PdvSousAdv />}/>
                    <Route path="pdv/add" element={<AddPdvSousAdv />}/>
                    <Route path="pdv/detail/:contact" element={<DetailPdv />}/>

                    <Route path="parcours" element={<ParcoursCommercial />}/>
                    <Route path="parcours/:contact" element={<ParcoursCommercial />}/>
                    
                    <Route path="compte" element={<ProfilSousADv />}/>
                    <Route path="parametre" element={<ParametreSousAdv />}/>

                    <Route path='*' element={ <Error404/> }/>
                </Route>
            </Routes>
        </div>
    );
};

export default RouterSousAdv;