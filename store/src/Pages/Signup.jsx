import React, { useState } from 'react';  
import { Button, Divider, Form, Input, message } from 'antd';
import { GoogleOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';


function Signup() {
  const [firstName, setFirstName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin")


  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, email, role, password }),  
      });

      const data = await res.json();

      if (res.ok) {
        message.success('Signup successful!');
      } else {
        message.error(data.msg || 'Signup failed!'); 
      }
    } catch (err) {
      console.error(err);
      message.error('Something went wrong!');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <h2>Signup</h2>

        <Form.Item
          label="Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input placeholder="Enter your name" onChange={handleFirstName} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Enter a valid email!' },
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
            Signup
          </Button>
        </Form.Item>

        <Divider>or signup with</Divider>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <Button shape="circle" icon={<GoogleOutlined />} />
          <Button shape="circle" icon={<FacebookOutlined />} />
          <Button shape="circle" icon={<TwitterOutlined />} />
        </div>
      </Form>
    </div>
  );
}

export default Signup;
