import React, { useEffect, useState } from "react";
import { connexionService } from "../../../_services/connexion.service";
import { sousadvService } from "../../../_services/sousadv.service";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  IssuesCloseOutlined,
  RiseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";

const SousAdvCommercialListe = () => {

    const navigate  = useNavigate();
  const [loading, setLoading] = useState(false);
  const [commerciaux, setCommerciaux] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleViewDetailcommercial = (contactSim) => {
    navigate("/sousadv/commercial/detail/"+contactSim)
  };

  const switcher = () => {};
  const handleTransactionCom = () => {};

  const btnStyle = {
    backgroundColor: "#222",
    color: "white",
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

  useEffect(() => {
    setLoading(true);
    connexionService
      .howIsLogIn()
      .then((res) => {
        if (res.data.role === "SOUSADV") {
          sousadvService
            .getAllCommerciaux(res.data.contactSim)
            .then((resp) => {
              setCommerciaux(resp.data.Reponse);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Erreur :", error);
            });
        }
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  }, []);
  return (
    <div className="SousAdvCommercial">
      <h2>liste des commerciaux</h2>

      <Button style={btnStyle} size="small" onClick={switcher}>
        Ajouter un commercial
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
            title: "Zone",
            dataIndex: "zone",
            width:'7%',
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
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Button
                  size="small"
                  icon={<EyeOutlined />}
                  onClick={() => handleViewDetailcommercial(record.contactSim)}
                ></Button>
                <Button
                  size="small"
                  icon={<RiseOutlined />}
                  onClick={() => handleTransactionCom(record.contactSim)}
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
        dataSource={commerciaux}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default SousAdvCommercialListe;
