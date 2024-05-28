import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pdvService } from "../../../_services/pdv.service";
import { Button, Form, Input, Select } from "antd";
import { commercialService } from "../../../_services/commercial.service";
import { connexionService } from "../../../_services/connexion.service";

const { Option } = Select;

const AddTransaction = () => {
  const params = useParams();
  const [pdvs, setPdvs] = useState([]);
  const [options, setOptions] = useState([]);

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const btnStyle = {
    backgroundColor:'orange',
    color:'white'
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  
  useEffect(() => {
    pdvService
      .getPdvByContactSim(params.contact)
      .then((res) => {
        setPdvs(res.data.Reponse);
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  }, []);

  useEffect(() => {
    connexionService
      .howIsLogIn()
      .then((res) => {
        commercialService.getPdvsCommercial(res.data.contactSim)
        .then((response) => {
          console.log(response.data.Reponse);
          const fetchedOptions = response.data.Reponse.map((item) => ({
            value: item.contactSim,
            label: item.nom,
          }));
          setOptions(fetchedOptions);
          
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des données :",
            error
          );
        });
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  }, []);


  

  return (
    <div className="AddTransaction">
      <h2>Effectue une transaction</h2>
      <div style={{ marginTop: 18, marginLeft: 300 }}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          

          <Form.Item
            label="Beneficiaire"
            name="contactBeneficiaireSim"
            rules={[
              {
                required: true,
                message: "Selectionner le point de vente",
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

          <Form.Item
            name="Type de recharge"
            label="typeTransaction"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Selectionner le type de transaction"
              allowClear
            >
              <Option value="ACCOPMTE">ACOMPTE</Option>
              <Option value="COMPTANT">COMPTANT</Option>
              <Option value="CREDIT">CREDIT</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Device" name="device">
            <Input />
          </Form.Item>
          <Form.Item
            label="Montant"
            name="montant"
            rules={[
              {
                required: true,
                message: "Entre le montant svp!",
              },
            ]}
          >
            <Input prefix="XOF" />
          </Form.Item>

          <Form.Item label="Acompte" name="acompte">
            <Input prefix="XOF" />
          </Form.Item>

          <Form.Item label="Device" name="device">
            <Input />
          </Form.Item>

          <Form.Item
            label="Reference"
            name="reference"
            rules={[
              {
                required: true,
                message: "Reference de la trasaction svp!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button style={btnStyle} type="primary" htmlType="submit">
              Valider
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddTransaction;
