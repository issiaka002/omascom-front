import React from "react";
import { Button, DatePicker, Divider, Input, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { TransactionService } from "../../../_services/transaction.service";
import { connexionService } from "../../../_services/connexion.service";
import {
  EyeOutlined,
  IssuesCloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";
const { RangePicker } = DatePicker;


const TransactionCommercial = () => {
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  
  var today = new Date();
  var annee = today.getFullYear();
  var mois = ("0" + (today.getMonth() + 1)).slice(-2);
  var jour = ("0" + today.getDate()).slice(-2);
  var todayFormated = annee + "-" + mois + "-" + jour;

  const navigate = useNavigate();

  const btnStyle = {
    backgroundColor:'orange',
    color:'white'
  }

  const switcher = () => {
    navigate("/commercial/pdv/liste");
  };

  

  useEffect(() => {
    connexionService
      .howIsLogIn()
      .then((res) => {
        if (res.data.role === "COMMERCIAL") {
          TransactionService.getTrasanctionByDate(res.data.contactSim,todayFormated)
            .then((resps) => {
              setTransaction(resps.data.Reponse);
              setLoading(false);
              //console.log("transaction:", resps.data.Reponse);
            })
            .catch((err) => console.error("Erreur :", err));
        }
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  }, []);

  const handleViewRecu = (reference) => {
    navigate("/commercial/transaction/detail/" + reference);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Recherche ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            <SearchOutlined />
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            <IssuesCloseOutlined />
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Reference",
      dataIndex: "reference",
      ...getColumnSearchProps("reference"),
    },

    {
      title: "Montant",
      dataIndex: "montant",
      ...getColumnSearchProps("montant"),
    },

    {
      title: "Type transaction",
      dataIndex: "typeTransaction",
      responsive: ["lg", "xl", "xxl"],
      filters: [
        {
          text: "RECHARGEMENT",
          value: "RECHARGE",
        },
        {
          text: "RECOUVREMENT",
          value: "RECOUVRE",
        },
        {
          text: "RETOUR_UV",
          value: "RETOUR",
        },
      ],
      onFilter: (value, record) => record.typeTransaction.startsWith(value),
      width: "40%",
      render: (typeTransaction) => {
        let color = "geekblue";
        if (typeTransaction === "RECHARGEMENT") {
          color = "yellow";
        } else if (typeTransaction === "RECOUVREMENT") {
          color = "blue";
        } else if (typeTransaction === "RETOUR_UV") {
          color = "red";
        }
        return <Tag color={color}>{typeTransaction}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      responsive: ["md", "lg", "xl", "xxl"],
      ...getColumnSearchProps("date"),
    },
    {
      title: "Heure",
      dataIndex: "heure",
      responsive: ["md", "lg", "xl", "xxl"],
      ...getColumnSearchProps("heure"),
    },
    {
      title: "Donneur",
      dataIndex: "contactDonneurSim",
      responsive: ["xl", "xxl"],
      ...getColumnSearchProps("contactDonneurSim"),
    },
    {
      title: "Beneficiaire",
      dataIndex: "contactBeneficiaireSim",
      responsive: ["sm", "md", "lg", "xl", "xxl"],
      ...getColumnSearchProps("contactBeneficiaireSim"),
    },
    {
      title: "Type de recharge",
      dataIndex: "rechargeType",
      responsive: ["lg", "xl", "xxl"],
      filters: [
        {
          text: "COMPTANT",
          value: "COMPTANT",
        },
        {
          text: "ACOMPTE",
          value: "ACCOMPTE",
        },
        {
          text: "CREDIT",
          value: "CREDIT",
        },
      ],
      onFilter: (value, record) => record.rechargeType.startsWith(value),
      filterSearch: true,
      width: "40%",
      render: (rechargeType) => {
        let color = "geekblue";
        if (rechargeType === "COMPTANT") {
          color = "geekblue";
        } else if (rechargeType === "ACCOMPTE") {
          color = "volcano";
        } else if (rechargeType === "CREDIT") {
          color = "red";
        }
        return <Tag color={color}>{rechargeType}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      responsive: ["xl", "xxl"],
      render: (_, record) => (
        <Space size="middle">
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewRecu(record.reference)}
          ></Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Transactions</h2>
      <Space size={20} direction="vertical">
        
        <Button style={btnStyle} size="small" onClick={switcher}>
          faire une transaction
        </Button>
        <Divider></Divider>
        <RangePicker
          format="YYYY-MM-DD"
          onChange={(value, dateString) => {
            setLoading(true);
            if(dateString[0] !=="" & dateString[1]!==""){
              connexionService.howIsLogIn()
                .then(res=>{
                  TransactionService.getTrasanctionByDateBetweenIntervenant(res.data.contactSim,dateString[0],dateString[1])
                    .then(resp=>{
                        setTransaction(resp.data.Reponse);
                        setLoading(false);
                    }).catch(err=>console.log(err))

                }).catch(err=>console.log(err))
            }
          }}
        />
        <Table
          loading={loading}
          columns={columns}
          dataSource={transaction}
          pagination={{ pageSize: 5 }}
        />
      </Space>
    </div>
  );
};

export default TransactionCommercial;
