import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { connexionService } from "../../../_services/connexion.service";
import { sousadvService } from "../../../_services/sousadv.service";
const { Option } = Select;

const AddPdvSousAdv = () => {
  const [pdv, setPdv] = useState([]);
  const [sousadv, setSousadv] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    connexionService
      .howIsLogIn()
      .then((res) => {
        if (res.data.role === "SOUSADV") {
          sousadvService
            .getAllCommerciaux(res.data.contactSim)
            .then((response) => {
              const fetchedOptions = response.data.Reponse.map((item) => ({
                value: item.contactSim,
                label: item.nom,
              }));
              setOptions(fetchedOptions);
              console.log(options);
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la récupération des données :",
                error
              );
            });
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations de connexion:",
          error
        );
      });
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(pdv);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="">
      <h2>Ajouter un point de vente</h2>
      <div className="AddPdv">
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={15}>
              <Form.Item
                name="contactSimCommercial"
                label="Commercial"
                rules={[
                  {
                    required: true,
                    message: "Commercial require!",
                  },
                ]}
              >
                <Select
                  
                  style={{
                    width: "100%",
                  }}
                  placeholder="Nom du commercial"
                  options={options}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
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
                <Input placeholder="Ex: ISSIAKA SIDIBE " />
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
                <Input placeholder="Entrer un contact marchant" />
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
                label="Contact Perso"
                name="contactPerso"
                rules={[
                  {
                    required: true,
                    message: "Entre le contact Perso svp!",
                  },
                ]}
              >
                <Input placeholder="Entrer un contact personnel" />
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
                  <Option value="AAM">AAM</Option>
                  <Option value="MT">MT</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="categorie"
                label="Categorie"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Selectionner la categorie" allowClear>
                  <Option value="EDV">EDV</Option>
                  <Option value="EDV_MOMO">EDV_MOMO</Option>
                  <Option value="MOMO">MOMO</Option>
                </Select>
              </Form.Item>
            </Col>
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Mot de passe"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Entrer un mot de passe!",
                  },
                ]}
              >
                <Input.Password placeholder="Entrer un mot de passe" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Numero CNI"
                name="numeroCni"
                rules={[
                  {
                    message: "votre numero CNI de carte d identité svp!",
                  },
                ]}
              >
                <Input placeholder="Ex:09876543976" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button style={{backgroundColor:'#222'}} type="primary" htmlType="submit">
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

export default AddPdvSousAdv;
