import { Column } from "@ant-design/charts";
import {
  CalendarOutlined,
  DollarCircleOutlined,
  EyeOutlined,
  FallOutlined,
  IssuesCloseOutlined,
  RiseOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  SlidersOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Calendar,
  Card,
  Divider,
  Input,
  Space,
  Statistic,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import { connexionService } from "../../../_services/connexion.service";
import { TransactionService } from "../../../_services/transaction.service";
import { sousadvService } from "../../../_services/sousadv.service";

const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const DashbaordSousAdv = () => {
  //
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingCom, setLoadingCom] = useState(true);
  const [loadingPdv, setLoadingPdv] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [sousadv, setSousadv] = useState([]);
  //
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [stat, setStat] = useState([]);
  const [statGrap, setStatGrap] = useState([]);

  const [transactionPdv, setLastTransactionPdv] = useState([]);
  const [transactionPdvInfo, setLastTransactionPdvInfo] = useState([]);

  const [transactionCom, setTransactionCom] = useState([]);
  const [lastTransactionCom, setlastTransactionCom] = useState([]);

  var today = new Date();
  var annee = today.getFullYear();
  var mois = ("0" + (today.getMonth() + 1)).slice(-2);
  var jour = ("0" + today.getDate()).slice(-2);
  var todayFormatted = annee + "-" + mois + "-" + jour;
  //
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  var annee_ = lastWeek.getFullYear();
  var mois_ = ("0" + (lastWeek.getMonth() + 1)).slice(-2);
  var jour_ = ("0" + lastWeek.getDate()).slice(-2);
  var lastWeekDay = annee_ + "-" + mois_ + "-" + jour_;

  useEffect(() => {
    connexionService
      .howIsLogIn()
      .then((res) => {
        if (res.data.role === "SOUSADV") {
          sousadvService
            .getSousAdvByContact(res.data.contactSim)
            .then((resp) => {
              setSousadv(resp.data.Reponse);
            })
            .catch((err) => console.log("Erreur " + err));

          sousadvService
            .getStatistique(res.data.contactSim, todayFormatted)
            .then((response) => {
              setTransactionCom(response.data.Reponse);
            })
            .catch((err) => console.log("Erreur " + err));
          sousadvService
            .getTrasanctionWithCommerciaux(res.data.contactSim)
            .then((resps) => {
              console.log(resps);
              setLoadingCom(true);
              setlastTransactionCom(resps.data.Reponse);
              setLoadingCom(false);
            })
            .catch((err) => console.log("Erreur " + err));

          sousadvService
            .getStatistiquePdv(res.data.contactSim, todayFormatted)
            .then((respp) => {
              setLastTransactionPdvInfo(respp.data.Reponse);
            })
            .catch((err) => console.log("Erreur " + err));

          sousadvService
            .getTrasanctionWithPdvs(res.data.contactSim)
            .then((resps) => {
              setLoadingPdv(true);
              setLastTransactionPdv(resps.data.Reponse);
              setLoadingPdv(false);
            })
            .catch((err) => console.log("Erreur " + err));
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
        if (res.data.role === "SOUSADV") {
          TransactionService.getInfoTransaction(
            res.data.contactSim,
            todayFormatted,
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
            todayFormatted,
          )
            .then((res) => {
              // Graphique data
              setStatGrap(res.data.Reponse);
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
          color = "orange";
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

  const mysyle = {
    color: "orange",
    fontSize: 18,
    fontWeight: "bold",
  };

  return (
    <div className="DashbaordSousAdv">
      <h2>Tableau de bord</h2>
      <Divider style={mysyle}></Divider>
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
          value={sousadv.solde ? sousadv.solde + "." : 0}
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
          value={sousadv.creances ? sousadv.creances + "." : 0}
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
          value={sousadv.especeEnCours ? sousadv.especeEnCours + "." : 0}
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
          title={"Nombre de commerciaux"}
          value={
            transactionCom.nombreCommerciaux
              ? transactionCom.nombreCommerciaux + "."
              : 0
          }
        />
      </Space>

      <Divider dashed />

      <div style={{ margin: 10, marginTop: 17, display: "flex" }}>
        <p style={{ margin: 25, marginLeft: 50, display: "flex" }}>
          <Statistic
            title={
              "Objectif " + sousadv.objactifDate
                ? "Objectif " + sousadv.objactifDate
                : 0
            }
            value={
              sousadv.objectifMontant
                ? sousadv.objectifMontant + " XOF"
                : 0 + " XOF"
            }
            prefix={<CalendarOutlined />}
          />

          <span style={{ display: "block", margin: 10 }}></span>

          <Statistic
            title="Date & Heure du dernier rechargement"
            value={
              sousadv.dateDerniereRechargement
                ? sousadv.dateDerniereRechargement +
                  " " +
                  sousadv.heureDerniereRechargement
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
          className="tbl_transaction2"
          loading={loading}
          columns={columns}
          dataSource={transaction}
        ></Table>
      </Space>
      <Divider style={mysyle} orientation="left">
        Commerciaux
      </Divider>
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
          title={"Cumul Float "}
          value={
            transactionCom.cumulFloat ? transactionCom.cumulFloat + "." : 0
          }
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
          title={"Cumul Creances"}
          value={
            transactionCom.cumulCreances
              ? transactionCom.cumulCreances + "."
              : 0
          }
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
          title={"Cumul Espèces"}
          value={
            transactionCom.cumulEspeceEnCours
              ? transactionCom.cumulEspeceEnCours + "."
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
          title={"Cumul Float Poussé"}
          value={
            transactionCom.cumulFloatPousse
              ? transactionCom.cumulFloatPousse + "."
              : 0
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
          title={"Cumul Float Recu"}
          value={
            transactionCom.cumulFloatRecu
              ? transactionCom.cumulFloatRecu + "."
              : 0
          }
        />
      </Space>
      <Divider dashed />
      <Space wrap>
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
          title={"Cumul Retour Float"}
          value={
            transactionCom.cumulRetourFloat
              ? transactionCom.cumulRetourFloat + "."
              : 0
          }
        />

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
          title={"Cumul Nombre Float Poussé"}
          value={
            transactionCom.nombreFloatPousse
              ? transactionCom.nombreFloatPousse + "."
              : 0
          }
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
          title={"Cumul Nombre Float recu"}
          value={
            transactionCom.nombreFloatPousse
              ? transactionCom.nombreFloatPousse + "."
              : 0
          }
        />
      </Space>

      <Divider dashed />

      <div style={{ margin: 10, marginTop: 17, display: "flex" }}>
        <p style={{ margin: 25, marginLeft: 50, display: "flex" }}>
          <Statistic
            title={
              "Objectif " + "00000000000" ? "Objectif " + "000000000000" : 0
            }
            value={0 + " XOF"}
            prefix={<CalendarOutlined />}
          />

          <span style={{ display: "block", margin: 10 }}></span>

          <Statistic
            title="Date & Heure du dernier rechargement"
            value={0}
            prefix={<CalendarOutlined />}
          />
        </p>
      </div>
      <Divider orientation="left" dashed>
        Les 5 dernieres transactions
      </Divider>
      <Space direction="vertical">
        <Table
          className="tbl_transaction2"
          loading={loadingCom}
          columns={columns}
          dataSource={lastTransactionCom}
        ></Table>
      </Space>

      <Divider style={mysyle} orientation="left" dashed>
        Point de ventes
      </Divider>

      <Space direction="horizontal" size={[4, 4]} wrap>
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
          title={"Cumul Creances"}
          value={
            transactionPdvInfo.cumulCreances
              ? transactionPdvInfo.cumulCreances + "."
              : 0
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
          title={"Cumul Float Recu"}
          value={
            transactionPdvInfo.cumulFloatRecu
              ? transactionPdvInfo.cumulFloatRecu + "."
              : 0
          }
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
          title={"Cumul Float Poussé"}
          value={
            transactionPdvInfo.cumulFloatPousse
              ? transactionPdvInfo.cumulFloatPousse + "."
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
          title={"Cumul Retour Float"}
          value={
            transactionPdvInfo.cumulRetourFloat
              ? transactionPdvInfo.cumulRetourFloat + "."
              : 0
          }
        />
      </Space>
      <Divider />
      <Space>
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
          title={"Nombre Float poussé"}
          value={
            transactionPdvInfo.nombreFloatPousse
              ? transactionPdvInfo.nombreFloatPousse + "."
              : 0
          }
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
            transactionPdvInfo.nombreFloatRecu
              ? transactionPdvInfo.nombreFloatRecu + "."
              : 0
          }
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
          title={"Nombre Retour float"}
          value={
            transactionPdvInfo.nombreRetourFloat
              ? transactionPdvInfo.nombreRetourFloat + "."
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
          title={"Nombre de pdvs Total"}
          value={
            transactionPdvInfo.nombrePdvTotal
              ? transactionPdvInfo.nombrePdvTotal + "."
              : 0
          }
        />
      </Space>
      <Divider dashed />

      <div style={{ margin: 10, marginTop: 17, display: "flex" }}>
        <p style={{ margin: 25, marginLeft: 50, display: "flex" }}>
          <Statistic
            title={
              "Objectif " + "00000000000" ? "Objectif " + "000000000000" : 0
            }
            value={0 + " XOF"}
            prefix={<CalendarOutlined />}
          />

          <span style={{ display: "block", margin: 10 }}></span>

          <Statistic
            title="Date & Heure du dernier rechargement"
            value={0}
            prefix={<CalendarOutlined />}
          />
        </p>
      </div>
      <Divider orientation="left" dashed>
        Les 5 dernieres transactions
      </Divider>
      <Space direction="vertical">
        <Table
          className="tbl_transaction2"
          loading={loadingPdv}
          columns={columns}
          dataSource={transactionPdv}
        ></Table>
      </Space>

      <Divider style={mysyle} orientation="left" dashed>
        Performances
      </Divider>
      <Space>
        <Column />
      </Space>
      <Divider style={mysyle} orientation="left" dashed>
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
    <Card style={{ padding: 0, margin: 0 }} hoverable>
      <Space direction="horizontal">
        {icon}
        <Statistic
          title={title}
          value={value}
          valueStyle={{ color: "#222", fontWeight: 500 }}
        />
      </Space>
    </Card>
  );
}
export default DashbaordSousAdv;
