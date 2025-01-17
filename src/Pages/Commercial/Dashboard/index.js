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
  Spin,
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
  AreaChartOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const DashboardCommercial = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    commercial: [],
    pdvs: [],
    stat: [],
    transaction: [],
    statGrap: [],
    statGrap2: [],
  });
  const [loading, setLoading] = useState({
    main: true,
    graph: true,
    graph2: true,
  });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const formatDate = (date) => {
    const annee = date.getFullYear();
    const mois = ("0" + (date.getMonth() + 1)).slice(-2);
    const jour = ("0" + date.getDate()).slice(-2);
    return `${annee}-${mois}-${jour}`;
  };

  const today = new Date();
  const dateFormatted = formatDate(today);

  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const lastWeekDay = formatDate(lastWeek);

  const handleViewRecu = (reference) => {
    navigate("/commercial/transaction/detail/" + reference);
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await connexionService.howIsLogIn();
        if (res.data.role === "COMMERCIAL") {
          const contactSim = res.data.contactSim;
          setData((prevState) => ({ ...prevState, contactSim }));
          fetchData(contactSim);
        }
      } catch (error) {
        console.error("Erreur :", error);
        setLoading({
          main: false,
          graph: false,
        });
      }
    };

    fetchUserRole();
  }, []);

  const fetchData = async (contactSim) => {
    fetchTransactionInfo(contactSim);
    fetchLastTransactions(contactSim);
    fetchStatData(contactSim);
    fetchCommercialData(contactSim);
    fetchPdvsData(contactSim);
    fetchInfoGraph2(contactSim)
  };

  const fetchTransactionInfo = async (contactSim) => {
    try {
      const infoTransactionRes = await TransactionService.getInfoTransaction(
        contactSim,
        dateFormatted,
      );
      setData((prevState) => ({ ...prevState, stat: infoTransactionRes.data }));
      setLoading((prevState) => ({ ...prevState, main: false }));
    } catch (error) {
      console.error("Erreur :", error);
    }
  };


  const fetchInfoGraph2 = async (contactSim) => {
    try {
      const infoGraph2 = await TransactionService.getStatPerDate(
        contactSim,
        dateFormatted,
      );
      setData((prevState) => ({ ...prevState, statGrap2: infoGraph2.data.Reponse }));
      setLoading((prevState) => ({ ...prevState, graph2: false }));
    } catch (error) {
      console.error("Erreur :", error);
    }
  };



  const fetchLastTransactions = async (contactSim) => {
    try {
      const lastTransactionRes =
        await TransactionService.get10lastTransaction(contactSim);
      setData((prevState) => ({
        ...prevState,
        transaction: lastTransactionRes.data.Reponse,
      }));
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const fetchStatData = async (contactSim) => {
    try {
      const statRes = await TransactionService.getStat(
        contactSim,
        lastWeekDay,
        dateFormatted,
      );
      //console.log(statRes)
      setData((prevState) => ({
        ...prevState,
        statGrap: statRes.data.Reponse,
      }));
      setLoading((prevState) => ({ ...prevState, graph: false }));
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const fetchCommercialData = async (contactSim) => {
    try {
      const commercialRes =
        await commercialService.getCommercialByContact(contactSim);
      setData((prevState) => ({
        ...prevState,
        commercial: commercialRes.data.Reponse,
      }));
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const fetchPdvsData = async (contactSim) => {
    try {
      const pdvsRes = await commercialService.getPdvsCommercial(contactSim);
      setData((prevState) => ({ ...prevState, pdvs: pdvsRes.data.Reponse }));
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const configg = {
    data: data.statGrap,
    yField: "montant",
    colorField: "nom",
    group: true,
    style: {
      inset: 10,
    },
    legend: {
      position: "top-left",
      layout: "horizontal",
    },
  };

  const config2 = {
    data: data.statGrap2,
    yField: "montant",
    colorField: "nom",
    group: true,
    style: {
      inset: 10,
    },
    legend: {
      position: "top-left",
      layout: "horizontal",
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
        {
          text: "RETOUR_UV",
          value: "RETOUR_UV",
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
        } else if (rechargeType === "RETOUR_UV") {
          color = "orange";
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
          value={data.commercial.solde ? data.commercial.solde + "." : 0}
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
          value={data.commercial.creances ? data.commercial.creances + "." : 0}
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
          value={
            data.commercial.especeEnCours
              ? data.commercial.especeEnCours + "."
              : 0
          }
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
          value={
            data.stat.montantRecharge ? data.stat.montantRecharge + "." : 0
          }
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
          value={
            data.stat.montantRechargeRecu
              ? data.stat.montantRechargeRecu + "."
              : 0
          }
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
          value={
            data.stat.montantRetourUV ? data.stat.montantRetourUV + "." : 0
          }
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
          value={data.stat.nombreRecharge ? data.stat.nombreRecharge + "." : 0}
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
          value={
            data.stat.nombreRechargeRecu
              ? data.stat.nombreRechargeRecu + "."
              : 0
          }
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
          value={data.pdvs.length ? data.pdvs.length + "." : 0}
        />
      </Space>

      <Divider dashed />

      <div style={{ margin: 10, marginTop: 17, display: "flex" }}>
        <Progress type="circle" percent={78} strokeColor={conicColors} />

        <p style={{ margin: 25, marginLeft: 50, display: "flex" }}>
          <Statistic
            title={
              "Objectif " + data.commercial.objactifDate
                ? "Objectif " + data.commercial.objactifDate
                : 0
            }
            value={
              data.commercial.objectifMontant
                ? data.commercial.objectifMontant + " XOF"
                : 0 + " XOF"
            }
            prefix={<CalendarOutlined />}
          />

          <span style={{ display: "block", margin: 10 }}></span>

          <Statistic
            title="Date & Heure du dernier rechargement"
            value={
              data.commercial.dateDerniereRechargement
                ? data.commercial.dateDerniereRechargement +
                  " " +
                  data.commercial.heureDerniereRechargement
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
          className="tbl_transaction"
          loading={loading.main}
          columns={columns}
          dataSource={data.transaction}
        ></Table>
      </Space>

      <Divider orientation="left" dashed>
        Performances
      </Divider>

      <Space>
        <div
          style={{ width: "530px", padding: "6px" }}
        >
          {loading.graph2 ? (
            <Spin className="custom-spin" />
          ) : (
            <Column {...config2} />
          )}
          <p style={{ fontStyle: "italic", fontSize: "12px", color: "#222" }}>
            <AreaChartOutlined /> Transactions aujourd'hui
          </p>
        </div>

        <div
          style={{ width: "530px", padding: "6px" }}
        >
          {loading.graph ? (
            
            <Spin className="custom-spin" />
          ) : (
            <Column {...configg} />
          )}
          <p style={{ fontStyle: "italic", fontSize: "12px", color: "#222" }}>
            <AreaChartOutlined /> Transactions en 1 semaine
          </p>
        </div>
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
