import { BellOutlined, MailOutlined, UserAddOutlined } from "@ant-design/icons";
import { Badge, Drawer, List, Space } from "antd";
import { useEffect, useState } from "react";
import { connexionService } from "../../../_services/connexion.service";
import { commercialService } from './../../../_services/commercial.service';

function HeaderSousAdv() {
  const [comments, setComments] = useState([]);
  

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notification, setNotification] = useState([]);

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
          commercialService.getNotification(resp.data.contactSim,lastWeekDay,dateFormatted)
            .then(res=>{
                //console.log("Notification : "+res.data.Reponse);
                setNotification(res.data.Reponse)
            }).catch(err=>console.error(err));
      }).catch(err=>console.error(err));
  }, []);

  return (
    
    <div className='HeaderSousAdv'>
      
      <h3>Omascom</h3>
      <Space>
          
          <Badge count={comments.length} dot>
           <MailOutlined
            style={{ fontSize: 15, color: 'white' }}
             onClick={() => {
               
             }}
           />  
          </Badge>
          <Badge count={notification.length} dot>
           <BellOutlined
            style={{ fontSize: 15, color: 'white' }}
             onClick={() => {
               setNotificationsOpen(true);
             }}
           />
          </Badge>
          
          <Badge>
              <UserAddOutlined style={{fontSize:15, color:"white"}}/>
          </Badge>
      </Space>
      
      <Drawer
          title="Notifications"
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
                    title={<a href="https://ant.design">{item.titre}</a>}
                    description={item.description}
                  />
              </List.Item>;
            }}
          ></List>
        </Drawer>
    </div>
  );
}
export default HeaderSousAdv;
