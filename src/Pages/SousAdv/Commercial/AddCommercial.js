import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { connexionService } from "../../../_services/connexion.service";
import { sousadvService } from "../../../_services/sousadv.service";
dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";
const { Option } = Select;

const AddCommercial = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [commercial, setCommercial] = useState([]);
  const [contactSousAdv, setContactSousAdv] = useState("");

  const btnStyle = {
    backgroundColor: "#222",
    color: "white",
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Pdv enregistrer avec succes",
    });
  };

  const errors = () => {
    messageApi.open({
      type: "error",
      content: "Error lors de l' enregistrement",
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    errors();
  };

  useEffect(() => {
    connexionService
      .howIsLogIn()
      .then((res) => {
        if (res.data.role === "SOUSADV") {
          sousadvService
            .getSousAdvByContact(res.data.contactSim)
            .then((res2) => {
              setContactSousAdv(res2.data.Reponse.contactSim);
            })
            .catch((error) => {
              console.error("Erreur :", error);
            });
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations de connexion:",
          error,
        );
      });
  }, []);

  const onFinish = (values) => {
    let newPdv = [];
    if (!Array.isArray(commercial)) {
      newPdv = [];
    } else {
      newPdv = [...commercial];
    }
    newPdv.push(values);
    setCommercial(newPdv);

    const piece = {
      numeroCni: values.numeroCni,
      dateNaissance: values.dateNaissance,
      dateExpiration: values.dateExpiration,
      dateDelivre: values.dateDelivre,
      lieu: values.lieu,
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const coordonneesGpsDomicile = {
            latitude: latitude,
            longitude: longitude,
          };

          newPdv[0].contactSimSousAdv = contactSousAdv;
          newPdv[0].piece = piece;
          newPdv[0].coordonneesGpsDomicile = coordonneesGpsDomicile;

          // ajout du commercial
          // .....
        },
        function (error) {
          console.error("Erreur de géolocalisation :", error);
        },
      );
    } else {
      // ajout du commercial
      // .....
    }
  };

  return (
    <div className="AddCommercial">
      <h2>Ajouter un comrcial</h2>
      <div className="AddPdv">
        <Divider></Divider>
        <span style={{ fontSize: 10, color: "#222", fontStyle: "italic" }}>
          Contact du sous adv : {contactSousAdv}
        </span>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Nom complet"
                name="nom"
                rules={[
                  {
                    required: true,
                    message: "Entre votre nom svp!",
                  },
                ]}
              >
                <Input placeholder="Ex: ISSIAKA SIDIBE" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Localisation"
                name="situationGeo"
                rules={[
                  {
                    required: true,
                    message: "Entre votre localisation svp!",
                  },
                ]}
              >
                <Input placeholder="Ex: ANGRE CHATEAUX" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Contact SIM"
                name="contactSim"
                rules={[
                  {
                    required: true,
                    message: "Entre un contact SIM svp!",
                  },
                ]}
              >
                <Input prefix="+225" placeholder="Entrer un contact marchant" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Secteur"
                name="secteur"
                rules={[
                  {
                    required: true,
                    message: "Entre le secteur svp!",
                  },
                ]}
              >
                <Input placeholder="le secteur de travail" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="contact Perso"
                name="contactPerso"
                rules={[
                  {
                    required: true,
                    message: "Entre le contact Perso svp!",
                  },
                ]}
              >
                <Input
                  prefix="+225"
                  placeholder="Entrer un contact personnel"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="zone"
                label="Zone"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Selectionner la zone" allowClear>
                  <Option value="AAP">AAP</Option>
                  <Option value="MT">MT</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please un email svp!",
                  },
                ]}
              >
                <Input placeholder="Entrer votre email" />
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left">Info CNI</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Lieu naissance" name="lieu">
                <Input placeholder="Ex: Agou" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Numero CNI"
                name="numeroCni"
                rules={[
                  {
                    required: true,
                    message: "Please entrer le numero de votre carte CNI!",
                  },
                ]}
              >
                <Input placeholder="Ex: 0987289238023" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="date de naissance" name="dateNaissance">
                <DatePicker defaultValue={dayjs("2019-09-03", dateFormat)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="date d'expiration" name="dateExpiration">
                <DatePicker defaultValue={dayjs("2019-09-03", dateFormat)} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="date delivre" name="dateDelivre">
                <DatePicker defaultValue={dayjs("2019-09-03", dateFormat)} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                wrapperCol={{
                  offset: 25,
                  span: 16,
                }}
              >
                <Button style={btnStyle} type="primary" htmlType="submit">
                  Enregistrer
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AddCommercial;
