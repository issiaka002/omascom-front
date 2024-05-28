import React from 'react';
import {
    AppstoreOutlined,
    RiseOutlined,BankOutlined,
    UserSwitchOutlined,PoweroffOutlined,
   PlusOutlined,FormOutlined,MenuUnfoldOutlined,MenuFoldOutlined,
   UsergroupAddOutlined,
   RetweetOutlined
  } from "@ant-design/icons";
  import { Menu, Button } from "antd";
  import { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
import { connexionService } from '../../../_services/connexion.service';
  

const SideMenuAdv = () => {
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
            label: "Tableau de bord",
            icon: <AppstoreOutlined />,
            key: "/adv/dashbaord",
          },
          {
            label: "Transaction",
            key: "/adv/transaction",
            icon: <RiseOutlined />,
          },
          {
            label: "Sous Adv",
            key: "/adv/sousadv",
            icon: <BankOutlined />,
            children:[
                {
                label: 'Sous adv',
                key: '/adv/sousadv/liste',
                icon: <FormOutlined />
                },
                {
                label: 'ajouter',
                key: '/adv/sousadv/add',
                icon: <PlusOutlined/>
                }  
            ]
          },
          {
            label: "commerciaux",
            key: "/adv/commercial",
            icon: <BankOutlined />,
            children:[
                {
                label: 'commercial',
                key: '/adv/commercial/liste',
                icon: <FormOutlined />
                },
                {
                label: 'ajouter',
                key: '/adv/commercial/add',
                icon: <PlusOutlined/>
                }  
            ]
          },
          {
            label: "Point de vente",
            key: "/adv/pdv",
            icon: <UsergroupAddOutlined />,
            children:[
                {
                label: 'pdvs',
                key: '/adv/pdv/liste',
                icon: <FormOutlined />
                },
                {
                label: 'ajouter',
                key: '/adv/pdv/add',
                icon: <PlusOutlined/>
                }  
            ]
          },
          {label:"Position Sous Adv",key:"/adv/position", icon: <RetweetOutlined/> },
          {label:"Profil",key:"/adv/compte", icon: <UserSwitchOutlined /> },
          {label:"Parametre",key:"/adv/parametre", icon: <UserSwitchOutlined /> },
          {label:"Deconnexion",key:"logout", icon: <PoweroffOutlined/>, danger: true},
        ]}
      ></Menu>
    </div>
  );
};

export default SideMenuAdv;