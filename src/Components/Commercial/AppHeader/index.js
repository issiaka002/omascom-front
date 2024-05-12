import { BellOutlined, MailOutlined, UserAddOutlined } from "@ant-design/icons";
import { Badge, Drawer, List, Space } from "antd";
import { useEffect, useState } from "react";
import { connexionService } from "../../../_services/connexion.service";
import { commercialService } from "../../../_services/commercial.service";

function AppHeader() {


  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const [user, setUser] = useState("");

  var today = new Date();
  var annee = today.getFullYear();
  var mois = ('0' + (today.getMonth() + 1)).slice(-2);
  var jour = ('0' + today.getDate()).slice(-2);
  var dateFormatted = annee + '-' + mois + '-' + jour;

  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  var annee_ = lastWeek.getFullYear();
  var mois_ = ('0' + (lastWeek.getMonth() + 1)).slice(-2);
  var jour_ = ('0' + lastWeek.getDate()).slice(-2);
  var lastWeekDay = annee_ + '-' + mois_ + '-' + jour_;

  useEffect(() => {
    connexionService.howIsLogIn()
      .then(resp=>{
          setUser(resp.data.nom)
          commercialService.getNotification(resp.data.contactSim,lastWeekDay,dateFormatted)
            .then(res=>{
                setNotification(res.data.Reponse)
            }).catch(err=>console.error(err));
      }).catch(err=>console.error(err));
  }, []);

  return (
    
    <div className='AppHeader'>
      
      <h3>Omascom</h3>
      <Space>
          
          <Badge count={1} dot>
           <MailOutlined
            style={{ fontSize: 15, color: 'black' }}
             onClick={() => {
               
             }}
           />  
          </Badge>
          <Badge count={notification.length} dot>
           <BellOutlined
            style={{ fontSize: 15, color: 'black' }}
             onClick={() => {
               setNotificationsOpen(true);
             }}
           />
          </Badge>
          
          <Badge>
              <span style={{fontWeight:'bold'}}>{user}</span>
          </Badge>
      </Space>
      
      <Drawer
          title={"Notifications "}
          open={notificationsOpen}
          size={200}
          onClose={() => {
            setNotificationsOpen(false);
          }}
          maskClosable
        >
          <List
            dataSource={notification}
            renderItem={(item) => {
              return <List.Item>
                  <List.Item.Meta
                    title={<a href="#">{item.titre}</a>}
                    description={item.description}
                  />              
              </List.Item>;
            }}
          ></List>
        </Drawer>
    </div>
  );
}
export default AppHeader;
