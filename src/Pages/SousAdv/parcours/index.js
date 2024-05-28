import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sousadvService } from "../../../_services/sousadv.service";
import { Button, Col, Divider, Form, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../Commercial/Position/map.css";
import { connexionService } from "../../../_services/connexion.service";

const ParcoursCommercial = () => {
  const params = useParams();
  const [position, setPosition] = useState([]);
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [positionCenter, setPositionCenter] = useState([5.379711, -4.060998]);

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

  const handleChange = (value) => {
    //console.log(`selected ${value}`);
  };

  const onSearchFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const customMarker = new Icon({
    iconUrl: "/images/trajectoire.png",
    iconSize: [14, 14],
  });

  const btnSearchStyle = {
    backgroundColor: "#222",
    border: "none",
    borderRadius: 0,
  };

  const onSearch = (values) => {
    setFetching(true);
    sousadvService
      .getCommercialPosition(values.contact)
      .then((res) => {
        console.log(res.data.Reponse);
        setPosition(res.data.Reponse);
        setFetching(false);
        if (position.length > 0) {
          setPositionCenter(res.data.Reponse[res.data.Reponse.length - 1].geocode);
        }
        console.log(res.data.Reponse[res.data.Reponse.length - 1].geocode);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setFetching(false);
      });
  };

  useEffect(() => {
    if (params.contact) {
      sousadvService
        .getCommercialPosition(params.contact)
        .then((res) => {
          //console.log(res.data.Reponse);
          setPosition(res.data.Reponse);
        })
        .catch((error) => {
          console.error("Erreur :", error);
        });
    }
  }, [params.contact]);

  return (
    <div>
      <h2>Parcours</h2>
      <Divider />
      <Form
        name="normal_login"
        initialValues={{
          remember: false,
        }}
        onFinish={onSearch}
        onFinishFailed={onSearchFailed}
        layout="vertical"
        requiredMark="optional"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="contact">
              <Select
                prefix={<SearchOutlined />}
                style={{
                  width: "100%",
                }}
                placeholder="Nom du commercial"
                options={options}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Button
                style={btnSearchStyle}
                block
                type="primary"
                htmlType="submit"
              >
                Recherche
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider />
      {!fetching && (
        <MapContainer center={positionCenter} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {position.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customMarker}>
              <Popup>
                <img
                  src={"/images/ping.png"}
                  alt="marker GPS"
                  width="150"
                  height="150"
                  style={{ borderRadius: 18 }}
                />
                <br />
                {marker.popUp}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default ParcoursCommercial;
