import React, { useEffect, useState } from 'react';
import Recouvrement from './index';
import { useParams } from 'react-router-dom';
import { pdvService } from '../../../_services/pdv.service';
import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;



const AddRecourvrement = () => {
    
    const params = useParams();
    const [pdvs, setPdvs] = useState([]);

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
    
    useEffect(() => {

        pdvService.getPdvByContactSim(params.contact).
            then(res=>{
                //console.log(res.data.Reponse);
                setPdvs(res.data.Reponse)
            })
            .catch(error => {
                console.error("Erreur :", error);
            });
        
      }, []);

    return (
        <div className='AddRecourvrement' style={{}}>
            <h2>Effectuer un Recouvrement <span style={{color:'#800080', marginBottom:20}}>#{pdvs.contactSim}</span></h2>
            <div style={{marginTop:18,marginLeft:300}}>
                <Form
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                
                }}
            
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                
                
            >
            
                
                <Form.Item
                label="Donneur"
                name="contactDonneurSim"
                rules={[
                    {
                    required: true,
                    message: 'Entre votre contact SIM svp!',
                    },
                ]}
                >
                <Input disabled/>
                </Form.Item>

                <Form.Item
                label="Beneficiaire"
                name="contactBeneficiaireSim"
                rules={[
                    {
                    required: true,
                    message: 'Entre votre contact SIM svp!',
                    },
                ]}
                >
                <Input disabled />
                </Form.Item>
                
                <Form.Item
                    name="Type de recharge"
                    label="typeTransaction"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Select
                    placeholder="Selectionner le type de transaction"
                
                    allowClear
                    >
                    <Option value="ACCOPMTE">ACOMPTE</Option>
                    <Option value="COMPTANT">COMPTANT</Option>
                    <Option value="CREDIT">CREDIT</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                label="Device"
                name="device"
                >
                <Input />
                </Form.Item>   
                <Form.Item
                label="Montant"
                name="montant"
                rules={[
                    {
                    required: true,
                    message: 'Entre le montant svp!',
                    },
                ]}
                >
                <Input prefix="XOF"/>
                </Form.Item>   

                <Form.Item
                label="Acompte"
                name="acompte"
                >
                <Input prefix="XOF"/>
                </Form.Item> 

                <Form.Item
                label="Device"
                name="device"
                >
                <Input />
                </Form.Item>   
            

                <Form.Item
                label="Reference"
                name="reference"
                rules={[
                    {
                    required: true,
                    message: 'Reference de la trasaction svp!',
                    },
                ]}
                >
                <Input />
                </Form.Item>   
            
                
                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit">
                    Valider
                </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    );
};

export default AddRecourvrement;