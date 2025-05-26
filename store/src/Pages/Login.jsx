import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message } from 'antd';
import { GoogleOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/');
    }
  }, [navigate]); 

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);  
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/users/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);

     if (res.ok) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user)); // ✅ Store user
  message.success('Login successful!');
  navigate('/');
}
 else {
        message.error(data.msg || 'Invalid credentials'); 
      }
    } catch (err) {
      console.error(err);
      message.error('Something went wrong');
    }
  };

  return (
    <div className="appBg" style={styles.container}>
      <Form
        className="loginform"
        layout="vertical"
        onFinish={handleSubmit}
        style={styles.form}
      >
        <h1 style={styles.heading}>Login</h1>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Enter your email" onChange={handleEmail} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder="Enter your password" onChange={handlePassword} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>

        <Divider style={{ borderColor: 'black' }}>or login with</Divider>

        <div style={styles.socialIcons}>
          <Button shape="circle" icon={<GoogleOutlined />} />
          <Button shape="circle" icon={<FacebookOutlined />} style={{ margin: '0 12px' }} />
          <Button shape="circle" icon={<TwitterOutlined />} />
        </div>
      </Form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f2f5',
  },
  form: {
    padding: 32,
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    minWidth: 300,
  },
  heading: {
    textAlign: 'center',
    marginBottom: 24,
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 16,
  },
};

export default Login;
