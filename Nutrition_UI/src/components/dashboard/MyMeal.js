// MyMeal.js
import React from 'react';
import { Layout, Menu, Avatar, Button, Table, DatePicker } from 'antd';
import { UserOutlined, CalendarOutlined, LogoutOutlined, PieChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const MyMeal = () => {
  const mealData = [
    {
      key: '1',
      name: 'Chicken breast',
      portion: 1,
      size: 'large - 135g',
      kcal: 123,
      protein: 63,
      carbs: 63,
      fat: 63,
    },
  ];

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Portion', dataIndex: 'portion', key: 'portion' },
    { title: 'Size', dataIndex: 'size', key: 'size' },
    { title: 'kcal', dataIndex: 'kcal', key: 'kcal' },
    { title: 'Protein (g)', dataIndex: 'protein', key: 'protein' },
    { title: 'Carbs (g)', dataIndex: 'carbs', key: 'carbs' },
    { title: 'Fat (g)', dataIndex: 'fat', key: 'fat' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <div className="logo">Nutritioners</div>
        <Menu mode="inline" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            <Link to="/my-meal">My Meal</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/my-report">My Report</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header className="header">
          <div className="user-info">
            <Avatar icon={<UserOutlined />} /> Moni Roy
          </div>
        </Header>

        <Content style={{ padding: '16px 24px' }}>
          <h1>My Meal</h1>
          <div className="meal-header">
            <Button type="default" icon={<CalendarOutlined />}>
              Today
            </Button>
            <DatePicker />
          </div>

          <h2>Breakfast</h2>
          <Table columns={columns} dataSource={mealData} pagination={false} />

          <h2>Lunch</h2>
          <Table columns={columns} dataSource={[]} pagination={false} />

          <h2>Dinner</h2>
          <Table columns={columns} dataSource={[]} pagination={false} />

          <Button type="primary">+ Add new food</Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyMeal;
