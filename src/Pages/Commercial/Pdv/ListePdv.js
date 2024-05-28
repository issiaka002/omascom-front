import { Avatar, Button, Divider, Input, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { connexionService } from "../../../_services/connexion.service";
import { commercialService } from "../../../_services/commercial.service";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  IssuesCloseOutlined,
  RiseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";

const ListePdv = () => {

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const btnStyle = {
    backgroundColor:'orange',
    color:'white'
}

  const navigate = useNavigate();

  const handleViewDetail = (contactSim) => {
    navigate("/commercial/pdv/detail/" + contactSim);
  };

  const handleTransaction = (contactBeneficiaire) => {
    navigate("/commercial/transaction/addTransaction/" + contactBeneficiaire);
  };

  useEffect(() => {
    setLoading(true);
    connexionService.howIsLogIn().then((res) => {
      if (res.data.role === "COMMERCIAL") {
        commercialService
          .getPdvsCommercial(res.data.contactSim)
          .then((res2) => {
            setDataSource(res2.data.Reponse);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Erreur :", error);
          });
      }
    });
  }, []);

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

  const switcher = () => {
    navigate("/commercial/pdv/add");
  };

  return (
    <div className="ListePdv">
      <Space size={20} direction="vertical">
        <h2 style={{ marginBottom: 13 }}>Points de ventes</h2>

        <Button style={btnStyle} size="small" onClick={switcher}>
          Ajouter un pdv
        </Button>
        <Divider></Divider>
        <Table
          loading={loading}
          columns={[
            {
              title: "Photo",
              dataIndex: "image",
              render: (link) => <Avatar src={"/images/avatar.jpg"} />,
            },
            {
              title: "Nom",
              dataIndex: "nom",
              ...getColumnSearchProps("nom"),
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
              dataIndex: "contactPerso",
              ...getColumnSearchProps("contactPerso"),
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
              width: "40%",
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
              width: "40%",
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
              title: "Derniere rechargement",
              dataIndex: "dateDerniereRechargement",
              ...getColumnSearchProps("dateDerniereRechargement"),
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <Space size="middle">
                  <Button
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={() => handleViewDetail(record.contactSim)}
                  ></Button>
                  <Button
                    size="small"
                    icon={<RiseOutlined />}
                    onClick={() => handleTransaction(record.contactSim)}
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
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
        />
      </Space>
    </div>
  );
};

export default ListePdv;
