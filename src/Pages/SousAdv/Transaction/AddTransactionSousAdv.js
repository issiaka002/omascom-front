import React from 'react';
import { Tabs, Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const onChange = (key) => {
  console.log(key);
};


  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

// Composant pour le formulaire de contact
const ContactForm = () => (
    <Form
    name="basic"
    layout="vertical"
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
          message: "Entre votre contact SIM svp!",
        },
      ]}
    >
      <Input disabled />
    </Form.Item>

    <Form.Item
      label="Beneficiaire"
      name="contactBeneficiaireSim"
      rules={[
        {
          required: true,
          message: "Entre votre contact SIM svp!",
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
    <Form.Item label="Device" name="device">
      <Input />
    </Form.Item>
    <Form.Item
      label="Montant"
      name="montant"
      rules={[
        {
          required: true,
          message: "Entre le montant svp!",
        },
      ]}
    >
      <Input prefix="XOF" />
    </Form.Item>

    <Form.Item label="Acompte" name="acompte">
      <Input prefix="XOF" />
    </Form.Item>

    <Form.Item label="Device" name="device">
      <Input />
    </Form.Item>

    <Form.Item
      label="Reference"
      name="reference"
      rules={[
        {
          required: true,
          message: "Reference de la trasaction svp!",
        },
      ]}
    >
      <Input />
    </Form.Item>

    
    <Form.Item>
      <Button style={{backgroundColor:'#222'}} type="primary" htmlType="submit">
        Valider
      </Button>
    </Form.Item>
  </Form>
);

// Composant pour le formulaire de login
const LoginForm = () => (
  <Form
    name="login"
    initialValues={{ remember: true }}
    onFinish={(values) => console.log('Login Form Values:', values)}
  >
    <Form.Item
      name="username"
      rules={[{ required: true, message: 'Please enter your username!' }]}
    >
      <Input placeholder="Username" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: 'Please enter your password!' }]}
    >
      <Input.Password placeholder="Password" />
    </Form.Item>
    <Form.Item>
      <Button style={{backgroundColor:'#222'}} type="primary" htmlType="submit">
        Valider
      </Button>
    </Form.Item>
  </Form>
);

const items = [
  {
    key: '1',
    label: 'Commercial',
    children: <ContactForm />,
  },
  {
    key: '2',
    label: 'Point de vente',
    children: <LoginForm />,
  }
];

const AddTransactionSousAdv = () => (
    <div className='AddTransactionSousAdv'>
        <h2>Effectue une transaction</h2>
        <Tabs tabBarStyle={{color:'#222', fontWeight:600}} defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
);

export default AddTransactionSousAdv;
