import { Avatar, Button, List, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { connexionService } from "../../../_services/connexion.service";

import { commercialService } from "../../../_services/commercial.service";
import { MoneyCollectOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Recouvrement = () => {
  const [pdvs, setPdvs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)

  const handleViewDetail = (contactSim) => {
    navigate("/commercial/addRecouvrement/" + contactSim);
  };

  useEffect(() => {
    connexionService
      .howIsLogIn()
      .then((res) => {
        if (res.data.role === "COMMERCIAL") {
          commercialService
            .getPdvsHasCreance(res.data.contactSim)
            .then((resps) => {
              setPdvs(resps.data.Reponse);
              setLoading(false);
            })
            .catch((err) => console.error("Erreur :", err));
        }
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  }, []);


  if (loading) {
    return (
      <div
        
      >
        <Spin size="large" className="custom-spin" >
            
        </Spin>
      </div>
    );
  }

  return (
    <div className="Recouvrement">
      <h2 style={{ marginBottom: 25 }}>Recouvrement à effectués</h2>
      <List
        itemLayout="horizontal"
        dataSource={pdvs}
        pagination
        size="large"
        style={{ width: "200%" }}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={"keld"} />}
              title={
                <a href={"/commercial/pdv/detail/" + item.contactSim}>
                  {item.nom}
                </a>
              }
              description={
                <p>
                  Numero pdv : {item.contactSim}
                  <span className="espace">Creances :{item.creances}</span>
                  <span className="espace">
                    <Button
                      style={{backgroundColor:'orange', color:'white'}}
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

export default Recouvrement;
