import React, { useEffect, useState } from "react";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import "./map.css";
import { Divider, Spin } from "antd";
import { connexionService } from "../../../_services/connexion.service";
import { commercialService } from "../../../_services/commercial.service";

const PositionPdvs = () => {
  const [markers, setMarkers] = useState([]);
  const [positionCenter, setPositionCenter] = useState([5.379711, -4.060998])
  const [loadingCard, setLoadingCard] = useState(true);

  useEffect(() => {
    connexionService
      .howIsLogIn()
      .then((resp) => {
        if (resp.data.role === "COMMERCIAL") {
          commercialService
            .getAllPositionPdv(resp.data.contactSim)
            .then((res) => {
              setMarkers(res.data);
              if(markers.length>0){
                setPositionCenter(markers[0].geocode)
              }
              setLoadingCard(false)
              //console.log(markers[0].geocode);
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const customMarker = new Icon({
    iconUrl: "/images/ping.png",
    iconSize: [24, 24],
  });

  return (
    <div>
      
      
      {loadingCard ? <Spin size="large" className="custom-spin"/> :
        
       <div>
          <h2>Position geographique des points de ventes</h2>
          <Divider />
          <MapContainer center={positionCenter} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customMarker}>
            <Popup>
              <img
                src={"/images/ping.png"}
                alt="marker GPS"
                width="150"
                height="150"
                style={{ borderRadius: 18 }}
              />
              <br />
              { marker.popUp }
            </Popup>
          </Marker>
        ))}
      </MapContainer>
       </div>
      }
      
    </div>
  );
};

export default PositionPdvs;
