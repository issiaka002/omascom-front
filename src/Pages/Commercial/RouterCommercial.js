import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutCommercial from "./LayoutCommercial";
import DashboardCommercial from "./Dashboard";
import TransactionCommercial from "./Transaction";
import ListePdv from "./Pdv/ListePdv";
import AddPdv from "./Pdv/AddPdv";
import DetailPdv from "./Pdv/DetailPdv";
import Error404 from "../../_components/Error404";
import ProfilCommercial from "./Profil";
import Recouvrement from "./Recouvrement";
import TransactionDetail from "./Transaction/TransactionDetail";
import PositionPdvs from "./Position";
import AddRecourvrement from "./Recouvrement/AddRecourvrement";
import AddTransaction from "./Transaction/AddTransaction";
import ParametreCommercial from "./Parametre";

const RouterCommercial = () => {
  return (
    <Routes>
      <Route element={<LayoutCommercial />}>
        <Route index element={<DashboardCommercial />} />

        <Route path="dashbaord" element={<DashboardCommercial />} />
        <Route path="transaction" element={<TransactionCommercial />} />
        <Route
          path="transaction/detail/:reference"
          element={<TransactionDetail />}  
        />
        <Route
          path="transaction/addTransaction/:contact"
          element={<AddTransaction />}
        />
        <Route path="recouvrement" element={<Recouvrement />} />
        <Route path="pdv" element={<ListePdv />} />
        <Route path="pdv/liste" element={<ListePdv />} />
        <Route path="pdv/add" element={<AddPdv />} />
        <Route path="pdv/edit/:contact" element={<AddPdv />} />
        <Route path="position" element={<PositionPdvs />} />
        <Route path="parametre" element={<ParametreCommercial />} />
        <Route path="addRecouvrement/:contact" element={<AddRecourvrement />} />
        <Route path="pdv/detail/:contact" element={<DetailPdv />} />
        <Route path="compte" element={<ProfilCommercial />} />

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default RouterCommercial;

