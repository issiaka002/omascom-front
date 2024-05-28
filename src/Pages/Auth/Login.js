import React, { useState } from "react";
import { Alert, Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { connexionService } from "../../_services/connexion.service";
import { useNavigate } from "react-router-dom";
import { color } from "chart.js/helpers";
import { hover } from "@testing-library/user-event/dist/hover";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Title } = Typography;

const Login = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState(false)

  
  const btnConnectStyle={
    backgroundColor:'orange',
    border:'none',
    borderRaduis:0
  }

  const [msg, setMsg] = useState("");

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onSubmit = (values) => {
    connexionService.logout(); // Pour des tests
    setLoadings(true)
    connexionService.connexion(values)
        .then(res => {
            connexionService.saveToken(res.data.bearer);
            return connexionService.howIsLogIn();
        })
        .then(data => {
            switch (data.data.role) {
                case "ADV":
                    setLoadings(false)
                    navigate("/adv");
                    break;
                case "COMMERCIAL":
                    setLoadings(false)
                    navigate("/commercial");
                    break;
                case "SOUSADV":
                    setLoadings(false)
                    navigate("/sousadv");
                    break;
                default:
                    setMsg("Error veuillez reessayer !!")
                    console.error("Rôle non reconnu");
            }
        })
        .catch(err => {
            setMsg("Email ou mot de passe incorrect !!")
            console.error(err);
        });
};
 

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px"
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%"
    },
    forgotPassword: {
      float: "right"
    },
    header: {
      marginBottom: token.marginXL
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
    },
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
      fontWeight:700,
      color:'#222'
    },
    input:{
      border:'0px orange',
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="orange" />
            <path
              d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
              fill="white"
            />
            <path
              d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
              fill="white"
            />
            <path
              d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
              fill="white"
            />
          </svg>

          <Title style={styles.title}>Connexion</Title>
          
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: false,
          }}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          requiredMark="optional"
          
        >
          <Alert style={{backgroundColor:'white', border:'none', color:'orange', fontStyle:'italic', fontWeight:600}} message={msg} /> <br />
          <Form.Item
            name="email"
            style={styles.input}
            rules={[
              {
                type: "email",
                required: true,
                message: "Entrer votre adresse mail svp!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            style={styles.input}
            rules={[
              {
                required: true,
                message: "Entrer votre mot de passe svp!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mot de passe"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Se rappeler</Checkbox>
            </Form.Item>
            
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button loading={loadings} style={btnConnectStyle} block="true" type="primary" htmlType="submit">
              Connexion
            </Button>
            
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Login;
