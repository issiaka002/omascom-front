import React, { useEffect, useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { TransactionService } from "../../../_services/transaction.service";
import { Descriptions, Divider } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const TransactionDetail = () => {
  const params = useParams();
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    TransactionService.getTransactionByReference(params.reference)
      .then((res) => {
        console.log("Transaction :" + res.data.Reponse.recu.reference);
        setTransaction(res.data.Reponse.recu);
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 25 }}>Details recu de transaction</h2>
      <CheckOutlined style={{ fontSize: 150, color: "orange" }} />
      <Divider></Divider>
      <Descriptions
        contentStyle={{ fontWeight: "semi-bold", fontSize: 15 }}
        labelStyle={{ color: "#800080", fontWeight: "bold", fontSize: 16 }}
      >
        <Descriptions.Item label="Reference">
          {transaction.reference}
        </Descriptions.Item>
        <Descriptions.Item label="Montant">
          {transaction.montantTransaction} {transaction.device}
        </Descriptions.Item>
        <Descriptions.Item label="Donneur ">
          {transaction.numeroDonneurSim}
        </Descriptions.Item>
        <Descriptions.Item label="Beneficiaire">
          {transaction.numeroBeneficiareSim}
        </Descriptions.Item>
        <Descriptions.Item label="Date ">
          {transaction.dateTransaction}
        </Descriptions.Item>
        <Descriptions.Item label="Heure">
          {transaction.heureTransaction}
        </Descriptions.Item>
        <Descriptions.Item label="Type recharge ">
          {transaction.rechargeType}
        </Descriptions.Item>
        <Descriptions.Item label="Type de transaction ">
          {transaction.typeTransaction}
        </Descriptions.Item>
        <Descriptions.Item label="Device">
          {transaction.device}
        </Descriptions.Item>
        <Descriptions.Item label="Acompte">
          {transaction.acompte}
        </Descriptions.Item>
        <Descriptions.Item label="Reste a payer">
          {transaction.resteApayer}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default TransactionDetail;
