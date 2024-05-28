import React from "react";
import { Column } from "@ant-design/plots";

import {
  Button,
  Calendar,
  Card,
  Divider,
  Input,
  Progress,
  Space,
  Statistic,
  Table,
  Tag,
} from "antd";
import { connexionService } from "../../../_services/connexion.service";
import { commercialService } from "./../../../_services/commercial.service";
import { TransactionService } from "../../../_services/transaction.service";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


import {
  ShoppingCartOutlined,
  UserOutlined,
  DollarCircleOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
  CalendarOutlined,
  SlidersOutlined,
  SearchOutlined,
  IssuesCloseOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const DashboardCommercial = () => {
  const navigate = useNavigate();
  const [commercial, setCommercial] = useState([]);
  const [pdvs, setPdvs] = useState([]);
  const [stat, setStat] = useState([]);
  //
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [statGrap, setStatGrap] = useState([]);
  //
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  var today = new Date();
  var annee = today.getFullYear();
  var mois = ("0" + (today.getMonth() + 1)).slice(-2);
  var jour = ("0" + today.getDate()).slice(-2);
  var dateFormatted = annee + "-" + mois + "-" + jour;
  //
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  var annee_ = lastWeek.getFullYear();
  var mois_ = ("0" + (lastWeek.getMonth() + 1)).slice(-2);
  var jour_ = ("0" + lastWeek.getDate()).slice(-2);
  var lastWeekDay = annee_ + "-" + mois_ + "-" + jour_;

  const handleViewRecu = (reference) => {
    navigate("/commercial/transaction/detail/" + reference);
  };

  useEffect(() => {
    connexionService
      .howIsLogIn()
      .then((res) => {
        if (res.data.role === "COMMERCIAL") {
          TransactionService.getInfoTransaction(
            res.data.contactSim,
            dateFormatted
          )
            .then((respd) => {
              setStat(respd.data);
            })
            .catch((err) => console.error("Erreur :", err));

          TransactionService.get10lastTransaction(res.data.contactSim)
            .then((resps) => {
              setTransaction(resps.data.Reponse);
              setLoading(false);
            })
            .catch((err) => console.error("Erreur :", err));

          TransactionService.getStat(
            res.data.contactSim,
            lastWeekDay,
            dateFormatted
          )
            .then((res) => {
              setStatGrap(res.data.Reponse);
            })
            .catch((err) => console.error("Erreur :", err));
        }
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  }, []);

  useEffect(() => {
    connexionService
      .howIsLogIn()
      .then((res) => {
        if (res.data.role === "COMMERCIAL") {
          commercialService
            .getCommercialByContact(res.data.contactSim)
            .then((res2) => {
              setCommercial(res2.data.Reponse);
            })
            .catch((error) => {
              console.error("Erreur :", error);
            });

          commercialService
            .getPdvsCommercial(res.data.contactSim)
            .then((resp) => {
              setPdvs(resp.data.Reponse);
            })
            .catch((error) => {
              console.error("Erreur :", error);
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

  const configg = {
    data: statGrap,
    yField: "montant",
    colorField: "nom",
    group: true,
    style: {
      inset: 10,
    },
  };
  const conicColors = {
    "0%": "#87d068",
    "50%": "#ffe58f",
    "100%": "#ffccc7",
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
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

  return (
    <div className="DashboardCommercial">
      <h2>Tableau de bord</h2>
      <Divider></Divider>
      <Space direction="horizontal" size={[4, 4]} wrap>
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 23,
                padding: 2,
              }}
            />
          }
          title={"Float "}
          value={commercial.solde ? commercial.solde + "." : 0}
        />
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 23,
                padding: 2,
              }}
            />
          }
          title={"Creances"}
          value={commercial.creances ? commercial.creances + "." : 0}
        />
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 23,
                padding: 2,
              }}
            />
          }
          title={"Espèces"}
          value={commercial.especeEnCours ? commercial.especeEnCours + "." : 0}
        />
        <DashboardCard
          icon={
            <RiseOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 23,
                padding: 2,
              }}
            />
          }
          title={"Float Poussé"}
          value={stat.montantRecharge ? stat.montantRecharge + "." : 0}
        />
        <DashboardCard
          icon={
            <FallOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 23,
                padding: 2,
              }}
            />
          }
          title={"Float Recu"}
          value={stat.montantRechargeRecu ? stat.montantRechargeRecu + "." : 0}
        />
        <DashboardCard
          icon={
            <SlidersOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 23,
                padding: 2,
              }}
            />
          }
          title={"Retour Float"}
          value={stat.montantRetourUV ? stat.montantRetourUV + "." : 0}
        />
      </Space>
      <Divider dashed />
      <Space wrap>
        <DashboardCard
          icon={
            <RiseOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 23,
                padding: 2,
              }}
            />
          }
          title={"Nombre Float Poussé"}
          value={stat.nombreRecharge ? stat.nombreRecharge + "." : 0}
        />
        <DashboardCard
          icon={
            <FallOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 23,
                padding: 2,
              }}
            />
          }
          title={"Nombre Float recu"}
          value={stat.nombreRechargeRecu ? stat.nombreRechargeRecu + "." : 0}
        />

        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 23,
                padding: 2,
              }}
            />
          }
          title={"Nombre de Pdvs"}
          value={pdvs.length ? pdvs.length + "." : 0}
        />
      </Space>

      <Divider dashed />

      <div style={{ margin: 10, marginTop: 17, display: "flex" }}>
        <Progress type="circle" percent={78} strokeColor={conicColors} />

        <p style={{ margin: 25, marginLeft: 50, display: "flex" }}>
          <Statistic
            title={
              "Objectif " + commercial.objactifDate
                ? "Objectif " + commercial.objactifDate
                : 0
            }
            value={
              commercial.objectifMontant
                ? commercial.objectifMontant+ " XOF"
                : 0 + " XOF"
            }
            prefix={<CalendarOutlined />}
          />

          <span style={{ display: "block", margin: 10 }}></span>

          <Statistic
            title="Date & Heure du dernier rechargement"
            value={
              commercial.dateDerniereRechargement
                ? commercial.dateDerniereRechargement +
                  " " +
                  commercial.heureDerniereRechargement
                : 0
            }
            prefix={<CalendarOutlined />}
          />
        </p>
      </div>
      <Divider orientation="left" dashed>
        Les 5 dernieres transactions
      </Divider>
      <Space direction="vertical">
        <Table
          loading={loading}
          columns={columns}
          dataSource={transaction}
        ></Table>
      </Space>

      <Divider orientation="left" dashed>
        Performances
      </Divider>
      <Space>
        <Column {...configg} />
      </Space>
      <Divider orientation="left" dashed>
        Calendrier
      </Divider>
      <Space>
        <div style={{ margin: 10, marginTop: 17 }}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
      </Space>
    </div>
  );
};

function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{ padding: 0, margin: 0 }}>
      <Space direction="horizontal">
        {icon}
        <Statistic
          title={title}
          value={value}
          valueStyle={{ color: "rgb(94, 235, 51)", fontWeight: 500 }}
        />
      </Space>
    </Card>
  );
}

export default DashboardCommercial;
