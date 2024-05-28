import React, { useEffect, useState } from "react";
import { connexionService } from "../../../_services/connexion.service";
import { sousadvService } from "../../../_services/sousadv.service";
import { Button, Descriptions, Divider, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";

const ProfilSousADv = () => {
  const [sousadv, setSousadv] = useState({});
  const [adv, setAdv] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    connexionService
      .howIsLogIn()
      .then((res) => {
        if (res.data.role === "SOUSADV") {
          Promise.all([
            sousadvService.getSousAdvByContact(res.data.contactSim),
            sousadvService.getMyAdv(res.data.contactSim)
          ])
            .then(([respSousadv, respAdv]) => {
              setSousadv(respSousadv.data.Reponse);
              setAdv(respAdv.data.Reponse);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Erreur :", error);
              setLoading(false);
            });
        }
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return  <div >
              <Spin size="large" className="custom-spin2"  >
                
              </Spin>
            </div>
  }

  return (
    <div className="ProfilSousADv">
      <h2>Profil</h2>
      <div>
        <div>
          <img
            src={"/images/avatar.jpg"}
            alt="Avatar intervenant ou utilisateur"
            width="200"
            height="200"
            style={{ borderRadius: 18 }}
          />
          <Button icon={<EditOutlined />}></Button>
        </div>
        
        <Divider orientation="left">Mes Information</Divider>
        <Descriptions
          contentStyle={{ fontWeight: "semi-bold", fontSize: 15 }}
          labelStyle={{ color: "#800080", fontWeight: "bold", fontSize: 16 }}
        >
          <Descriptions.Item label="Nom">{sousadv.nom}</Descriptions.Item>
          <Descriptions.Item label="Contact marchant ">{sousadv.contactSim}</Descriptions.Item>
          <Descriptions.Item label="Contact perso">{sousadv.contactPerso}</Descriptions.Item>
          <Descriptions.Item label="Localication">{sousadv.situationGeo}</Descriptions.Item>
          <Descriptions.Item label="Email ">{sousadv.email}</Descriptions.Item>
          <Descriptions.Item label="Secteur">{sousadv.secteur}</Descriptions.Item>
          <Descriptions.Item label="Zone ">{sousadv.zone}</Descriptions.Item>
          <Descriptions.Item label="Poste">Sous Adv</Descriptions.Item>
        </Descriptions>

        <Divider></Divider>

        <Descriptions
          contentStyle={{ fontWeight: "semi-bold", fontSize: 15 }}
          labelStyle={{ color: "#800080", fontWeight: "bold", fontSize: 16 }}
        >
          <Descriptions.Item label="Numero CNI ">{sousadv.piece ? sousadv.piece.numeroCni : "..."}</Descriptions.Item>
          <Descriptions.Item label="Date de naissance ">{sousadv.piece ? sousadv.piece.dateNaissance : "..."}</Descriptions.Item>
          <Descriptions.Item label="Lieu de naissance ">{sousadv.piece ? sousadv.piece.lieu : "..."}</Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Information Adv</Divider>
        <Descriptions
          contentStyle={{ fontSize: 12, fontStyle: "italic" }}
          labelStyle={{ color: "#800080", fontSize: 12, fontStyle: "italic" }}
        >
          <Descriptions.Item label="Nom Adv">{adv.nom}</Descriptions.Item>
          <Descriptions.Item label="Contact marchant ">{adv.contactSim}</Descriptions.Item>
          <Descriptions.Item label="Contact perso">{adv.contactPerso}</Descriptions.Item>
          <Descriptions.Item label="Localication">{adv.situationGeo}</Descriptions.Item>
          <Descriptions.Item label="Email ">{adv.email}</Descriptions.Item>
          <Descriptions.Item label="Secteur">{adv.secteur}</Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default ProfilSousADv;
