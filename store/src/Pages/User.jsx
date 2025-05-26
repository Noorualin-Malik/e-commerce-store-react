import React, { useEffect, useState } from 'react';
import { Layout, Card, message } from 'antd';

const { Content } = Layout;

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:5000/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      console.log("Fetched data:", data);

      if (!res.ok) {
        throw new Error(data.msg || 'Failed to fetch user');
      }

      setUser(data.user);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Layout style={{ padding: '24px', minHeight: '100vh' }}>
      <Content>
        <Card title="Your Profile" style={{ width: 300 }}>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </Card>
      </Content>
    </Layout>
  );
};

export default UserPage;
