import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { commercialService } from "../../../_services/commercial.service";
import { connexionService } from "../../../_services/connexion.service";
import {
  AreaChartOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  DollarCircleOutlined,
  EditOutlined,
  EyeOutlined,
  IssuesCloseOutlined,
  ManOutlined,
  RiseOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Input,
  Row,
  Space,
  Spin,
  Statistic,
  Table,
  Tag,
} from "antd";
import { TransactionService } from "../../../_services/transaction.service";
import { Column } from "@ant-design/charts";

const DetailCommercial = () => {
  const params = useParams();
  const [commercial, setCommercial] = useState([]);
  const navigate = useNavigate();
  //
  const [loading, setLoading] = useState(true);

  const [transaction, setTransaction] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [statGrap, setStatGrap] = useState([]);
  const [loadinggraph, setLoadinggraph] = useState(true);

  const [statGrap2, setStatGrap2] = useState([]);
  const [loadinggraph2, setLoadinggraph2] = useState(true);

  const handleViewDetailPdv = (contactSim) => {
    navigate("/sousadv/pdv/detail/" + contactSim);
  };

  const detailTransaction = (reference) => {
    navigate("/sousadv/transaction/detail/" + reference);
  };

  const voirIteneraire = (contact) => {
    navigate("/sousadv/parcours/" + contact);
  };

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

  useEffect(() => {
    commercialService
      .getCommercialByContact(params.contact)
      .then((res) => {
        setCommercial(res.data.Reponse);
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  }, []);

  const [loadingpdv, setLoadingpdv] = useState(true);
  const [pdvs, setPdvs] = useState([]);
  const [statTransaction, setStatTransaction] = useState([]);

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
      ...getColumnSearchProps("date"),
    },
    {
      title: "Heure",
      dataIndex: "heure",
      ...getColumnSearchProps("heure"),
    },
    {
      title: "Donneur",
      dataIndex: "contactDonneurSim",
      ...getColumnSearchProps("contactDonneurSim"),
    },
    {
      title: "Beneficiaire",
      dataIndex: "contactBeneficiaireSim",
      ...getColumnSearchProps("contactBeneficiaireSim"),
    },
    {
      title: "Type de recharge",
      dataIndex: "rechargeType",
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
      render: (_, record) => (
        <Space size="middle">
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => detailTransaction(record.reference)}
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

  const statStyle = {
    color: "#222",
    fontWeight: 500,
    padding: 0,
  };

  const config = {
    data: statGrap,
    yField: "montant",
    colorField: "nom",
    group: true,
    style: {
      inset: 10,
    },
    legend: {
      position: "top-left", // Change the position of the legend
      layout: "horizontal", // Layout of the legend, can be 'horizontal' or 'vertical'
    },
    title: {
      visible: true,
      text: "Graphique des Précipitations Moyennes Mensuelles",
      style: {
        fontSize: 25,
        fontWeight: "bold",
        fill: "#222",
      },
    },
  };

  const config2 = {
    data: statGrap2,
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

  useEffect(() => {
        TransactionService.getInfoTransaction(params.contact, dateFormatted)
          .then((resps) => {
            setStatTransaction(resps.data);
          })
          .catch((error) => {
            console.error("Erreur :", error);
          });
        TransactionService.getStat(params.contact, lastWeekDay, dateFormatted)
          .then((ress) => {
            setStatGrap(ress.data.Reponse);
            setLoadinggraph(false);
          })
          .catch((error) => {
            console.error("Erreur :", error);
          });
        TransactionService.getStatPerDate(params.contact, dateFormatted)
          .then((ressp) => {
            setStatGrap2(ressp.data.Reponse);
            setLoadinggraph2(false);
          })
          .catch((error) => {
            console.error("Erreur :", error);
          });
        commercialService
          .getPdvsCommercial(params.contact)
          .then((res2) => {
            setPdvs(res2.data.Reponse);
            setLoadingpdv(false);
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
          commercialService
            .getCommercialAndPdv(res.data.contactSim, params.contact)
            .then((resp) => {
              setTransaction(resp.data.Reponse);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Erreur : ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  }, []);

  return (
    <div className="DetailCommercial">
      <h2>
        Detail sur le Commercial #
        <span style={{ color: "#800080" }}>{commercial.nom}</span>
      </h2>

      <Divider></Divider>

      <div>
        <img
          src={"/images/avatar.jpg"}
          alt="Avatar intervenant ou utilisateur"
          width="200"
          height="200"
          style={{ borderRadius: 18 }}
        />
      </div>

      <Divider></Divider>
      <Row gutter={7} wrap>
        <Col span={5}>
          <Card bordered={false} style={{ padding: 0 }}>
            <Statistic
              style={statStyle}
              title="Float"
              value={commercial.solde ? commercial.solde + "." : 0.0}
              precision={1}
              prefix={<ShoppingCartOutlined />}
              suffix=""
            />
          </Card>
        </Col>

        <Col span={5}>
          <Card bordered={false}>
            <Statistic
              style={statStyle}
              title="Créances"
              value={commercial.creances ? commercial.creances + "." : 0.0}
              precision={1}
              prefix={<DollarCircleOutlined />}
              suffix=""
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false}>
            <Statistic
              style={statStyle}
              title="Float Recu"
              value={
                statTransaction.montantRechargeRecu
                  ? statTransaction.montantRechargeRecu + "."
                  : 0
              }
              precision={1}
              prefix={<DollarCircleOutlined />}
              suffix=""
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card bordered={false}>
            <Statistic
              style={statStyle}
              title="Float poussé"
              value={
                statTransaction.montantRecharge
                  ? statTransaction.montantRecharge + "."
                  : 0
              }
              prefix={<ArrowUpOutlined />}
              suffix=""
            />
          </Card>
        </Col>
      </Row>
      <Divider></Divider>
      <Row gutter={7} wrap>
        <Col span={5}>
          <Card bordered={false}>
            <Statistic
              style={statStyle}
              title="Espece"
              value={
                commercial.especeEnCours ? commercial.especeEnCours + "." : 0.0
              }
              precision={1}
              prefix={<ArrowDownOutlined />}
              suffix=""
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card bordered={false}>
            <Statistic
              style={statStyle}
              title="Retour float"
              value={
                statTransaction.montantRetourUV
                  ? statTransaction.montantRetourUV + "."
                  : 0
              }
              precision={1}
              prefix={<ArrowDownOutlined />}
              suffix=""
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false}>
            <Statistic
              title="Nombre de Pdvs"
              value={pdvs.length}
              prefix={<ManOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Divider></Divider>

      <Descriptions
        contentStyle={{ fontWeight: "semi-bold", fontSize: 15 }}
        labelStyle={{ color: "#800080", fontWeight: "bold", fontSize: 16 }}
      >
        <Descriptions.Item label="Nom">{commercial.nom}</Descriptions.Item>
        <Descriptions.Item label="Contact Marchant">
          {commercial.contactSim}
        </Descriptions.Item>
        <Descriptions.Item label="Tel">
          {commercial.contactPerso}
        </Descriptions.Item>
        <Descriptions.Item label="Localication">
          {commercial.situationGeo} {}
        </Descriptions.Item>
        <Descriptions.Item label="Email ">{commercial.email}</Descriptions.Item>
        <Descriptions.Item label="Secteur">
          {commercial.secteur}
        </Descriptions.Item>
        <Descriptions.Item label="Zone ">{commercial.zone}</Descriptions.Item>
        <Descriptions.Item label="Poste">COMMERCIAL</Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Info CNI</Divider>

      <Descriptions
        contentStyle={{ fontWeight: "semi-bold", fontSize: 15 }}
        labelStyle={{ color: "#800080", fontWeight: "bold", fontSize: 16 }}
      >
        <Descriptions.Item label="Date de naissance ">
          {commercial.piece ? commercial.piece.dateNaissance : "..."}
        </Descriptions.Item>
        <Descriptions.Item label="Date d'expiration ">
          {commercial.piece ? commercial.piece.dateExpiration : "..."}
        </Descriptions.Item>
        <Descriptions.Item label="Numero CNI ">
          {commercial.piece ? commercial.piece.numeroCni : "..."}
        </Descriptions.Item>
        <Descriptions.Item label="Lieu de naissance ">
          {commercial.piece ? commercial.piece.lieu : "..."}
        </Descriptions.Item>
        <Descriptions.Item label="Date delivré ">
          {commercial.piece ? commercial.piece.dateDelivre : "..."}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">
        Historique des transactions effectuées
      </Divider>
      <div>
        <Space size={20} direction="vertical">
          <Table
            className="tbl_transaction2"
            loading={loading}
            columns={columns}
            dataSource={transaction}
            pagination={{ pageSize: 5 }}
          />
        </Space>
      </div>

      <Divider orientation="left">Point de ventes</Divider>

      <Table
        className="tbl_transaction2"
        loading={loadingpdv}
        size="small"
        columns={[
          {
            title: "Photo",
            dataIndex: "image",
            render: (link) => <Avatar src={"/images/avatar.jpg"} />,
          },
          {
            title: "Nom",
            dataIndex: "nom",
            width: "20%",
            ...getColumnSearchProps("nom"),
          },
          {
            title: "Categorie",
            dataIndex: "categorie",
            filters: [
              {
                text: "EDV",
                value: "EDV",
              },
              {
                text: "MOMO",
                value: "MOMO",
              },
              {
                text: "EDV_MOMO",
                value: "EDV_MOMO",
              },
            ],
            onFilter: (value, record) => record.categorie.startsWith(value),
            width: "9%",
            render: (categorie) => {
              let color = "geekblue";
              if (categorie === "MOMO") {
                color = "yellow";
              } else if (categorie === "EDV") {
                color = "blue";
              } else if (categorie === "EDV_MOMO") {
                color = "red";
              }
              return <Tag color={color}>{categorie}</Tag>;
            },
          },
          {
            title: "Contact SIM",
            dataIndex: "contactSim",
            ...getColumnSearchProps("contactSim"),
          },
          {
            title: "Emplacement",
            dataIndex: "situationGeo",
            ...getColumnSearchProps("situationGeo"),
          },

          {
            title: "Tel",
            dataIndex: "contactPerco",
            ...getColumnSearchProps("contactPerco"),
          },
          {
            title: "Zone",
            dataIndex: "zone",
            filters: [
              {
                text: "AAP",
                value: "AAP",
              },
              {
                text: "MT",
                value: "MT",
              },
            ],
            onFilter: (value, record) => record.zone.startsWith(value),
            width: "6%",
            render: (zone) => {
              let color = "geekblue";
              if (zone === "MT") {
                color = "red";
              } else if (zone === "AAP") {
                color = "yellow";
              }
              return <Tag color={color}>{zone}</Tag>;
            },
          },
          {
            title: "Creance",
            dataIndex: "creances",
            ...getColumnSearchProps("creances"),
          },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Button
                  size="small"
                  icon={<EyeOutlined />}
                  onClick={() => handleViewDetailPdv(record.contactSim)}
                ></Button>
                <Button
                  size="small"
                  icon={<RiseOutlined />}
                  onClick={{}}
                ></Button>
                <Button
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => {}}
                ></Button>
                <Button
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => {}}
                ></Button>
              </Space>
            ),
          },
        ]}
        dataSource={pdvs}
        pagination={{ pageSize: 5 }}
      />
      <Divider orientation="left">Performances</Divider>
      <Space>
        <div
          style={{ width: "530px", backgroundColor: "white", padding: "6px" }}
        >
          {loadinggraph2 ? (
            <Spin className="custom-spin2" />
          ) : (
            <Column {...config2} />
          )}
          <p style={{ fontStyle: "italic", fontSize: "12px", color: "#222" }}>
            <AreaChartOutlined /> Transactions aujourd'hui
          </p>
        </div>

        <div
          style={{ width: "530px", backgroundColor: "white", padding: "6px" }}
        >
          {loadinggraph ? (
            <Spin className="custom-spin2" />
          ) : (
            <Column {...config} />
          )}
          <p style={{ fontStyle: "italic", fontSize: "12px", color: "#222" }}>
            <AreaChartOutlined /> Transactions en 1 semaine
          </p>
        </div>
      </Space>
      <Divider orientation="left">Parcours</Divider>
      <div>
        <Space size={20} direction="vertical">
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => voirIteneraire(commercial.contactSim)}
          >
            Voir iteneraire
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default DetailCommercial;
