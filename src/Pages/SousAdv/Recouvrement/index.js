import React, { useEffect, useState } from "react";
import { connexionService } from "../../../_services/connexion.service";
import { Avatar, Button, List, Spin } from "antd";
import { MoneyCollectOutlined } from "@ant-design/icons";
import { sousadvService } from "../../../_services/sousadv.service";
import { useNavigate } from "react-router-dom";

const RecouvrementSousAdv = () => {
  const [commercial, setCommercial] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleViewDetail = (contactSim) => {
    navigate("/sousadv/addRecouvrement/" + contactSim);
  };

  useEffect(() => {
    connexionService
      .howIsLogIn()
      .then((res) => {
        if (res.data.role === "SOUSADV") {
          sousadvService
            .getCommerciauxsHasCreance(res.data.contactSim)
            .then((resp) => {
              setCommercial(resp.data.Reponse);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Erreur :", error);
            });
        }
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  }, []);

  if (loading) {
    return (
      
        <Spin size="large" className="custom-spin2"  >
            
        </Spin>
     
    );
  }
  return (
    <div className="RecourvrementSousAdv">
      <h2 style={{ marginBottom: 25 }}>Recouvrement à effectués</h2>
      <List
        itemLayout="horizontal"
        dataSource={commercial}
        pagination
        size="large"
        style={{ width: "200%" }}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={"keld"} />}
              title={
                <a href={"/sousadv/commercial/detail/" + item.contactSim}>
                  {item.nom}
                </a>
              }
              description={
                <p>
                  Numero Commercial : {item.contactSim}
                  <span className="espace">Creances :{item.creances}</span>
                  <span className="espace">
                    <Button
                      shape="circle"
                      onClick={() => handleViewDetail(item.contactSim)}
                      icon={<MoneyCollectOutlined />}
                    />{" "}
                  </span>
                </p>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default RecouvrementSousAdv;
