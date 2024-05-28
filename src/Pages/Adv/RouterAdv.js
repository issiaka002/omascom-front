import React from 'react';
import LayoutAdv from './LayoutAdv';
import { Route, Routes } from 'react-router-dom';
import Error404 from '../../_components/Error404';
import DashboardADV from './Dashbaord';
import TransactionADV from './Transaction';
import TransactionDetail from '../Commercial/Transaction/TransactionDetail';
import AddTransactionAdv from './Transaction/AddTransaction';
import RecouvrementADV from './Recouvrement';
import AddSousAdv from './SousAdv/AddSousAdv';
import SousAdv from './SousAdv';
import PositionSousADv from './PositionSousadv';
import ParametreADV from './Parametre';
import AddRecouvrementADV from './Recouvrement/AddRecouvrementADV';
import ProfilADV from './Profil';

const RouterAdv = () => {
    return (
        <Routes>
      <Route element={<LayoutAdv />}>
        <Route index element={<DashboardADV />} />

        <Route path="dashbaord" element={<DashboardADV />} />
        <Route path="transaction" element={<TransactionADV />} />
        <Route
          path="transaction/detail/:reference"
          element={<TransactionDetail />}  
        />
        <Route
          path="transaction/addTransaction/:contact"
          element={<AddTransactionAdv />}
        />
        <Route path="recouvrement" element={<RecouvrementADV />} />
        <Route path="sousadv" element={<SousAdv />} />
        <Route path="sousadv/liste" element={<SousAdv />} />
        <Route path="sousadv/add" element={<AddSousAdv />} />
        <Route path="sousadv/edit/:contact" element={<AddSousAdv />} />
        <Route path="position" element={<PositionSousADv />} />
        <Route path="parametre" element={<ParametreADV />} />
        <Route path="addRecouvrement/:contact" element={<AddRecouvrementADV />} />
        <Route path="compte" element={<ProfilADV />} />

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
    );
};

export default RouterAdv;