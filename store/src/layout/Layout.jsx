import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  DashboardFilled,
  LogoutOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useNavigate, Outlet } from 'react-router-dom';


const { Header, Content, Sider } = Layout;

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const [collapsed, setCollapsed] = useState(false);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = ({ key }) => {
    if (key === '3') {
      localStorage.removeItem('token');
      navigate('/login');
    } else if (key === '1') {
      navigate('/dashboard');
    }  else if (key === '2') {
      navigate('/');
    } else if (key === 'product') {
      navigate('/dashboard/product');
    }
  };

  const menuItems = [
    // {
    //   label: 'Dashboard',
    //   key: '1',
    //   icon: <DashboardFilled />,
    // },
    
    {
      label: 'Home',
      key: '2',
      icon:<HomeOutlined />,
    },
    {
      label: 'Products',
      key: 'product',
      icon: <DashboardFilled />
    },

    {
      label: 'Logout',
      key: '3',
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapse}
        style={{ background: '#2d2d2d' }}
      >
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          style={{ background: '#2d2d2d' }}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: '#2d2d2d',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="primary"
            icon={<MenuFoldOutlined />}
            onClick={handleCollapse}
            style={{
              backgroundColor: '#00bcd4',
              borderColor: '#00bcd4',
            }}
          />
        </Header>

        <Content style={{ margin: '16px' }}>
          <div
            style={{
              padding: 24,
              background: '#ffffff',
              minHeight: 360,
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
