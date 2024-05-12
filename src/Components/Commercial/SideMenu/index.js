import {
  AppstoreOutlined,
  HeatMapOutlined,
  UsergroupAddOutlined,
  FormOutlined,
  MenuFoldOutlined,RiseOutlined,MoneyCollectOutlined,
  MenuUnfoldOutlined,PlusOutlined,UserSwitchOutlined,PoweroffOutlined
} from "@ant-design/icons";
import { Menu, Button } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connexionService } from "../../../_services/connexion.service";

function SideMenu() {
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
            key: "/commercial/dashbaord",
          },
          {
            label: "Transaction",
            key: "/commercial/transaction",
            icon: <RiseOutlined />,
          },
          {
            label: "Recouvrement",
            key: "/commercial/recouvrement",
            icon: <MoneyCollectOutlined />,
          },
          {
            label: "Pdvs",
            key: "/commercial/pdv",
            icon: <UsergroupAddOutlined />,
            children:[
              {
              label: 'pdvs',
              key: '/commercial/pdv/liste',
              icon: <FormOutlined/>
              },
              {
              label: 'ajouter',
              key: '/commercial/pdv/add',
              icon: <PlusOutlined/>
              },
              
          ]
          },
          {
            label: "Positions pdvs",
            key: "/commercial/position",
            icon: <HeatMapOutlined />,
          },
          {label:"Profil",key:"/commercial/compte", icon: <UserSwitchOutlined /> },
          {label:"Deconnexion",key:"logout", icon: <PoweroffOutlined/>, danger: true}, 
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
