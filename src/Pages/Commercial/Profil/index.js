import React, { useEffect, useState } from "react";
import "./profil.css";
import { Button, Descriptions, Divider, Spin } from "antd";
import { connexionService } from "../../../_services/connexion.service";
import { EditOutlined } from "@ant-design/icons";
import { commercialService } from "../../../_services/commercial.service";

const ProfilCommercial = () => {
  const [commercial, setCommercial] = useState([]);
  const [sousadv, setSousadv] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    connexionService
      .howIsLogIn()
      .then((res) => {
        if (res.data.role === "COMMERCIAL") {
          setCommercial(res.data);

          commercialService
            .getMySousAdv(res.data.contactSim)
            .then((resp) => {
              setSousadv(resp.data.Reponse);
              setLoading(false)
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
        <Spin size="large" className="custom-spin" />
    );
  }

  return (
    <div>
      <h2>Profil </h2>
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
          <Descriptions.Item label="Nom">{commercial.nom}</Descriptions.Item>
          <Descriptions.Item label="Contact marchant ">
            {commercial.contactSim}
          </Descriptions.Item>
          <Descriptions.Item label="Contact perso">
            {commercial.contactPerso}
          </Descriptions.Item>
          <Descriptions.Item label="Localication">
            {commercial.situationGeo} {}
          </Descriptions.Item>
          <Descriptions.Item label="Email ">
            {commercial.email}
          </Descriptions.Item>
          <Descriptions.Item label="Secteur">
            {commercial.secteur}
          </Descriptions.Item>
          <Descriptions.Item label="Zone ">{commercial.zone}</Descriptions.Item>
          <Descriptions.Item label="Role">{commercial.role}</Descriptions.Item>
        </Descriptions>

        <Divider></Divider>

        <Descriptions
          contentStyle={{ fontWeight: "semi-bold", fontSize: 15 }}
          labelStyle={{ color: "#800080", fontWeight: "bold", fontSize: 16 }}
        >
          <Descriptions.Item label="Numero CNI ">
            {commercial.piece ? commercial.piece.numeroCni : "..."}
          </Descriptions.Item>
          <Descriptions.Item label="Date de naissance ">
            {commercial.piece ? commercial.piece.dateNaissance : "..."}
          </Descriptions.Item>
          <Descriptions.Item label="Lieu de naissance ">
            {commercial.piece ? commercial.piece.lieu : "..."}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Information sous adv</Divider>

        <Descriptions
          contentStyle={{ fontSize: 12, fontStyle: "italic" }}
          labelStyle={{ color: "#800080", fontSize: 12, fontStyle: "italic" }}
        >
          <Descriptions.Item label="Nom Sous Adv">
            {sousadv.nom}
          </Descriptions.Item>
          <Descriptions.Item label="Contact marchant ">
            {sousadv.contactSim}
          </Descriptions.Item>
          <Descriptions.Item label="Contact perso">
            {sousadv.contactPerso}
          </Descriptions.Item>
          <Descriptions.Item label="Localication">
            {sousadv.situationGeo}
          </Descriptions.Item>
          <Descriptions.Item label="Email ">{sousadv.email}</Descriptions.Item>
          <Descriptions.Item label="Secteur">
            {sousadv.secteur}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default ProfilCommercial;
