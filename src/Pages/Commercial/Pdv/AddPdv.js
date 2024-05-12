import React, { useEffect } from 'react';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Typography,
  Form,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
  Divider,
  
} from 'antd';
import { connexionService } from '../../../_services/connexion.service';
import { commercialService } from '../../../_services/commercial.service';
import { pdvService } from '../../../_services/pdv.service';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';
const { Option } = Select;



const AddPdv = () => {

    


    const [pdv, setPdv] = useState([]);
    const [contactComm, setContactComm] = useState("");
    const navigate = useNavigate();

    const onFinish = (values) => {
        let newPdv = [];
        if (!Array.isArray(pdv)) {
            newPdv = [];
        } else {
            newPdv = [...pdv];
        }
        newPdv.push(values);
        setPdv(newPdv);
    
        const piece = {
            numeroCni: values.numeroCni, 
            dateNaissance: values.dateNaissance,
            dateExpiration: values.dateExpiration,
            dateDelivre: values.dateDelivre,
            lieu: values.lieu,
        };
    
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
    
                const coordonneesGpsDomicile = {
                    latitude: latitude,
                    longitude: longitude
                };
    
                newPdv[0].contactSimCommercial = contactComm;
                newPdv[0].piece = piece;
                newPdv[0].coordonneesGpsDomicile = coordonneesGpsDomicile;
    
                console.log(newPdv[0]);
    
                pdvService.AddPdv(newPdv[0])
                    .then(res => {
                        console.log(res);
                        navigate("/commercial/pdv/liste");
                    })
                    .catch(error => {
                        console.error("Erreur lors de l'enregistrement du pdv :", error);
                    });
    
            }, function(error) {
                console.error("Erreur de géolocalisation :", error);
            });
        } else {
            pdvService.AddPdv(newPdv[0])
                    .then(res => {
                        console.log(res);
                        navigate("/commercial/pdv/liste");
                    })
                    .catch(error => {
                        console.error("Erreur lors de l'enregistrement du pdv :", error);
                    });
            console.log("Geolocation impossible !");
        }
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    useEffect(() => {
        connexionService.howIsLogIn()
            .then(res => {
                if (res.data.role === "COMMERCIAL") {
                    commercialService.getCommercialByContact(res.data.contactSim)
                        .then(res2 => {
                            setContactComm(res2.data.Reponse.contactSim);
                            //console.log("contact "+contactComm);
                        })
                        .catch(error => {
                            console.error("Erreur :", error);
                        });
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des informations de connexion:", error);
            });
    }, []);

    
    

    return (
        <div className=''>
            <h2>Ajouter un point de vente</h2>
            
            <div className='AddPdv'>
                <Divider></Divider>
                <span style={{fontSize:10, color:'#222', fontStyle:'italic'}}>Contact du commercial : {contactComm}</span>
                <Form layout="vertical" 
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item
                    label="Nom complet"
                    name="nom"
                    rules={[
                        {
                        required: true,
                        message: 'Entre votre nom svp!',
                        },
                    ]}
                    >
                    <Input placeholder='Ex: ISSIAKA SIDIBE ' />
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item
                    label="Localisation"
                    name="situationGeo"
                    rules={[
                        {
                        required: true,
                        message: 'Entre votre localisation svp!',
                        },
                    ]}
                    >
                    <Input placeholder='Ex: ANGRE CHATEAUX'/>
                    </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item
                    label="Contact SIM"
                    name="contactSim"
                    rules={[
                        {
                        required: true,
                        message: 'Entre un contact SIM svp!',
                        },
                    ]}
                    >
                    <Input placeholder='Entrer un contact marchant'/>
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item
                    label="Secteur"
                    name="secteur"
                    rules={[
                        {
                        required: true,
                        message: 'Entre le secteur svp!',
                        },
                    ]}
                    >
                    <Input placeholder='le secteur de travail'/>
                    </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item
                    label="contact Perso"
                    name="contactPerso"
                    rules={[
                        {
                        required: true,
                        message: 'Entre le contact Perso svp!',
                        },
                    ]}
                    >
                    <Input placeholder='Entrer un contact personnel'/>
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item
                        name="zone"
                        label="Zone"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Select
                        placeholder="Selectionner la zone"
                    
                        allowClear
                        >
                        <Option value="AAP">AAP</Option>
                        <Option value="MT">MT</Option>
                        </Select>
                    </Form.Item>

                    
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item
                        name="categorie"
                        label="Categorie"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Select
                        placeholder="Selectionner la categorie"
                    
                        allowClear
                        >
                            <Option value="EDV">EDV</Option>
                            <Option value="EDV_MOMO">EDV_MOMO</Option>
                            <Option value="MOMO">MOMO</Option>
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                        required: true,
                        message: 'Please un email svp!',
                        },
                    ]}
                    >
                    <Input placeholder='Entrer votre email'/>
                    </Form.Item>
                    </Col>
                </Row>
                <Divider orientation="left">Info CNI</Divider>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Lieu naissance"
                            name="lieu"
                            >
                            <Input placeholder='Ex: Agou'/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Numero CNI"
                            name="numeroCni"
                            rules={[
                                {
                                required: true,
                                message: 'Please entrer le numero de votre carte CNI!',
                                },
                            ]}
                            >
                            <Input placeholder='Ex: 0987289238023'/>
                        </Form.Item>
                    </Col>
                    
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="date de naissance"
                            name="dateNaissance"
                            >
                            <DatePicker defaultValue={dayjs('2019-09-03', dateFormat)}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="date d'expiration"
                            name="dateExpiration"
                            >
                            <DatePicker defaultValue={dayjs('2019-09-03', dateFormat)}/>
                        </Form.Item>
                    </Col>
                    
                </Row> 
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="date delivre"
                            name="dateDelivre"
                            >
                            <DatePicker defaultValue={dayjs('2019-09-03', dateFormat)} />
                        </Form.Item>
                    </Col>
                    
                </Row>
             
                <Row gutter={16}>
                
                    <Col span={12}>
                        <Form.Item
                            wrapperCol={{
                                offset: 25,
                                span: 16,
                            }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Enregistrer
                                </Button>
                        </Form.Item>
                    </Col>
                </Row>
                
            </Form>
            </div>
            
        </div>
        
    );
};

export default AddPdv;