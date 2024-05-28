import React from 'react';
import {
    AppstoreOutlined,
    ShopOutlined,RiseOutlined,BankOutlined,AlignLeftOutlined,
    UserSwitchOutlined,PoweroffOutlined,
   PlusOutlined,FormOutlined,MenuUnfoldOutlined,MenuFoldOutlined,
   UsergroupAddOutlined,
   RetweetOutlined,
   MoneyCollectOutlined
  } from "@ant-design/icons";
  import { Menu, Button } from "antd";
  import { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
import { connexionService } from '../../../_services/connexion.service';
  

const SideMenuSousAdv = () => {
    const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">

       <Button onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>

      <Menu
        className="SideMenuVertical"
        mode="inline"
        
        inlineCollapsed={collapsed}
        onClick={({key})=>{
          if(key==="logout"){
              // traitement deconnection
              connexionService.logout();
              navigate("/auth/login"); 
          }else{
              navigate(key);
          }
        }}
        selectedKeys={[selectedKeys]}

        items={[
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/sousadv/dashbaord",
          },
          {
            label: "Transaction",
            key: "/sousadv/transaction",
            icon: <RiseOutlined />,
          },
          {
            label: "Recouvrement",
            key: "/sousadv/recouvrement",
            icon: <MoneyCollectOutlined />,
          },
          {
            label: "commerciaux",
            key: "/sousadv/commercial",
            icon: <BankOutlined />,
            children:[
                {
                label: 'commercial',
                key: '/sousadv/commercial/liste',
                icon: <FormOutlined />
                },
                {
                label: 'ajouter',
                key: '/sousadv/commercial/add',
                icon: <PlusOutlined/>
                }  
            ]
          },
          {
            label: "Point de vente",
            key: "/sousadv/pdv",
            icon: <UsergroupAddOutlined />,
            children:[
                {
                label: 'pdvs',
                key: '/sousadv/pdv/liste',
                icon: <FormOutlined />
                },
                {
                label: 'ajouter',
                key: '/sousadv/pdv/add',
                icon: <PlusOutlined/>
                }  
            ]
          },
          {label:"Parcours",key:"/sousadv/parcours", icon: <RetweetOutlined/> },
        
          {label:"Profil",key:"/sousadv/compte", icon: <UserSwitchOutlined /> },
          {label:"Parametre",key:"/sousadv/parametre", icon: <RetweetOutlined/> },

          {label:"Deconnexion",key:"logout", icon: <PoweroffOutlined/>, danger: true},
        ]}
      ></Menu>
    </div>
  );
};

export default SideMenuSousAdv;