import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { pdvService } from '../../../_services/pdv.service';
import { Button, Descriptions, Divider, Input, Space, Table, Tag } from 'antd';
import { EyeOutlined, IssuesCloseOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { connexionService } from '../../../_services/connexion.service';
import { commercialService } from '../../../_services/commercial.service';





const DetailPdv = () => {

      const params = useParams();
      const [pdvs, setPdvs] = useState([]);
      const navigate = useNavigate();
      //
      const [loading, setLoading] = useState(true);
      const [transaction, setTransaction] = useState([]);
      const [searchText, setSearchText] = useState('');
      const [searchedColumn, setSearchedColumn] = useState('');
      
      useEffect(() => {

        pdvService.getPdvByContactSim(params.contact)
            .then(res=>{
                setPdvs(res.data.Reponse)
            })
            .catch(error => {
                console.error("Erreur :", error);
            });
      }, []);

      useEffect(() => {
        connexionService.howIsLogIn()
            .then(res => {
                if (res.data.role === "COMMERCIAL") {
                    commercialService.getCommercialAndPdv(res.data.contactSim,params.contact)
                      .then(resp=>{
                          setTransaction(resp.data.Reponse)
                          setLoading(false)
                      }).catch(error => {console.error("Erreur : ", error);});
                }
            })
            .catch(error => {
                console.error("Erreur :", error);
            });
    }, []);

    const handleViewRecu = (reference) => {
        navigate("/commercial/transaction/detail/" + reference);
    };

      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Recherche ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} size="small" style={{ width: 90 }}>
                        <SearchOutlined />
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        <IssuesCloseOutlined />
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
      {
          title: "Reference",
          dataIndex: "reference",
          ...getColumnSearchProps('reference'),
      },
      
      {
          title: "Montant",
          dataIndex: "montant",
          ...getColumnSearchProps('montant'),
      },
      
      {
          title: "Type transaction",
          dataIndex: "typeTransaction",
          filters: [
              {
                text: 'RECHARGEMENT',
                value: 'RECHARGE',
              },
              {
                text: 'RECOUVREMENT',
                value: 'RECOUVRE',
              },
              {
                  text: 'RETOUR_UV',
                  value: 'RETOUR',
                },
            ],
            onFilter: (value, record) => record.typeTransaction.startsWith(value),
            width: '40%',
          render: (typeTransaction) => {
              let color = 'geekblue';
              if (typeTransaction === 'RECHARGEMENT') {
                  color = 'yellow';
              } else if (typeTransaction === 'RECOUVREMENT') {
                  color = 'blue';
              } else if (typeTransaction === 'RETOUR_UV') {
                  color = 'red';
              }
              return (
                  <Tag color={color}>
                      {typeTransaction}
                  </Tag>
              );
          },
      },
      {
          title: "Date",
          dataIndex: "date",
          ...getColumnSearchProps('date'),
      },
      {
          title: "Heure",
          dataIndex: "heure",
          ...getColumnSearchProps('heure'),
      },
      {
          title: "Donneur",
          dataIndex: "contactDonneurSim",
          ...getColumnSearchProps('contactDonneurSim'),
      },
      {
          title: "Beneficiaire",
          dataIndex: "contactBeneficiaireSim",
          ...getColumnSearchProps('contactBeneficiaireSim'),
      },
      {
          title: "Type de recharge",
          dataIndex: "rechargeType",
          filters: [
              {
                text: 'COMPTANT',
                value: 'COMPTANT',
              },
              {
                text: 'ACOMPTE',
                value: 'ACCOMPTE',
              },
              {
                  text: 'CREDIT',
                  value: 'CREDIT',
                },
            ],
            onFilter: (value, record) => record.rechargeType.startsWith(value),
            filterSearch: true,
            width: '40%',
          render: (rechargeType) => {
              let color = 'geekblue';
              if (rechargeType === 'COMPTANT') {
                  color = 'geekblue';
              } else if (rechargeType === 'ACCOMPTE') {
                  color = 'volcano';
              } else if (rechargeType === 'CREDIT') {
                  color = 'red';
              }
              return (
                  <Tag color={color}>
                      {rechargeType}
                  </Tag>
              );
          },
      },
      {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
              <Space size="middle">
                  <Button
                      size='small'
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
      setSearchText('');
    };
    

      return (
        <div style={{ margin:6}}>
                <h2 style={{ margin:6}}>Detail sur #{pdvs.nom}</h2>

                <Divider></Divider>

                <div>
                    <img  src={'/images/avatar.jpg'} alt='Avatar intervenant ou utilisateur' width='200' height='200' style={{borderRadius:18}}/>
                </div>

                <Divider></Divider>

                <Descriptions contentStyle={{fontWeight:'semi-bold',fontSize:15}} labelStyle={{color:'#800080', fontWeight:'bold',fontSize:16}} >

                    <Descriptions.Item  label="Nom">{pdvs.nom}</Descriptions.Item>
                    <Descriptions.Item label="Localication">{pdvs.situationGeo} {}</Descriptions.Item>
                    <Descriptions.Item label="Email ">{pdvs.email}</Descriptions.Item>
                    <Descriptions.Item label="Secteur">{pdvs.secteur}</Descriptions.Item>
                    <Descriptions.Item label="Zone ">{pdvs.zone}</Descriptions.Item>
                    <Descriptions.Item label="Role">Point de vente</Descriptions.Item>
                
        
                </Descriptions>

                <Divider orientation='left'>Info CNI</Divider>

                <Descriptions contentStyle={{fontWeight:'semi-bold',fontSize:15}} labelStyle={{color:'#800080', fontWeight:'bold',fontSize:16}} >
                    
                    <Descriptions.Item label="Date de naissance ">{pdvs.piece?pdvs.piece.dateNaissance:"..."}</Descriptions.Item>
                    <Descriptions.Item label="Date d'expiration ">{pdvs.piece?pdvs.piece.dateExpiration:"..."}</Descriptions.Item>
                    <Descriptions.Item label="Numero CNI ">{pdvs.piece?pdvs.piece.numeroCni:"..."}</Descriptions.Item>
                    <Descriptions.Item label="Lieu de naissance ">{pdvs.piece?pdvs.piece.lieu:"..."}</Descriptions.Item>
        
                </Descriptions>

                <Divider orientation='left'>Historique des transactions effectuées</Divider>
                <div>
                  <Space size={20} direction="vertical">
                      
                      <Table
                          loading={loading}
                          columns={columns}
                          dataSource={transaction}
                          pagination={{ pageSize: 5 }}
                      />
                  </Space>
                </div>
                <Divider orientation='left'>Emplacement geographique</Divider>
                <div>
                  <Space size={20} direction="vertical">
                      <div class="col">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116834.00977795363!2d-4.00769052204097!3d5.394915437541007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1fcdb856e1778f5d%3A0x2a2a5b74081f91aa!2sAbidjan%2C%20Cocody%2C%20CHU%20Angr%C3%A9!5e0!3m2!1sen!2sci!4v1630002222661!5m2!1sen!2sci" style={{marginLeft:100,border:'none', height:400, width:'240%'}} allowfullscreen="" loading="lazy"></iframe>
                      </div>
                  </Space>
                </div>
        </div>
      );
};

export default DetailPdv;