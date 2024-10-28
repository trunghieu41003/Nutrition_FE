import React, { useState } from 'react';
import { Layout, Menu, Avatar, Button, Table, DatePicker } from 'antd';
import { UserOutlined, CalendarOutlined, LogoutOutlined, PieChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../../styles/MyMeal.css';
import search from '../../image/mymeal_image/search.jpg';



//Layout
const { Header, Content, Sider } = Layout;

//Modal
const MyMeal = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  }
  if (modal) {
    document.body.classList.add('active-modal');
  }
  else {
    document.body.classList.remove('active-modal');
  }
  //Table
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
    {
      key: '2',
      name: 'Fish breast',
      portion: 1,
      size: 'large - 135g',
      kcal: 77,
      protein: 60,
      carbs: 60,
      fat: 60,
    },
  ];

  // Function to calculate totals for each column
  const calculateTotals = (data) => {
    const total = data.reduce( //reduce: run array
      (acc, meal) => {
        acc.kcal += meal.kcal;
        acc.protein += meal.protein;
        acc.carbs += meal.carbs;
        acc.fat += meal.fat;
        return acc;
      },
      { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    );
    return total;
  };

  const breakfastTotal = calculateTotals(mealData);
  const lunchTotal = calculateTotals([]); // For now, no lunch data
  const dinnerTotal = calculateTotals([]); // For now, no dinner data

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
        <Content style={{ padding: '16px 24px', backgroundColor: '#F2F5FD' }}>
          <div className='mymeal'>
            <h1 className="meal-title">My Meal</h1>
            <div className='control'>
              <DatePicker />
              <Button onClick={toggleModal} className='btn-modal' classtype="primary" Open>+ Add new food</Button>
              {modal && (<div className='modal'>
                <div onClick={toggleModal} className="overlay"></div>
                <div className='modal-content'>
                  <h2>Choose your food</h2>
                  <div class="search-container">
                    <img src={search} alt="Search" className="search-icon" />
                    <input type="text" placeholder="Search food" className="search-input" />
                  </div>
                  <div className='chicken-container'>
                    <span>Chicken breast</span> <Button className='choose-button' classtype="primary">Choose</Button>
                  </div>
                  <div className='apple-container'>
                    <span>Apple</span> <Button className='choose-button' classtype="primary">Choose</Button>
                  </div>
                  <div className='banana-container'>
                    <span>Banna</span> <Button className='choose-button' classtype="primary">Choose</Button>
                  </div>
                  <div className='fish-container'>
                    <span>Fish</span> <Button className='choose-button' classtype="primary">Choose</Button>
                  </div>
                  <div className='potato-container'>
                    <span>Potato</span> <Button className='choose-button' classtype="primary">Choose</Button>
                  </div>
                  <button className='close-modal'
                    onClick={toggleModal} >X</button>
                </div>
              </div>)}

            </div>
            {/* Breakfast Section */}
            <div className='breakfast-header'>
              <h2 className="breakfast-title">Breakfast</h2>
              <p className='kcal-total'>{breakfastTotal.kcal} kcal</p>
              <p className='pro-total'>{breakfastTotal.protein} Protein (g)</p>
              <p className='ca-total'>{breakfastTotal.carbs} Carbs (g)</p>
              <p className='fat-total'>{breakfastTotal.fat} Fat (g)</p>
            </div>
            <div className='table'>
              <Table columns={columns} dataSource={mealData} pagination={false} />
            </div>

            {/* Lunch Section */}
            <div className='lunch-header'>
              <h2 className="lunch-title">Lunch</h2>
              <p className='kcal-total'>{lunchTotal.kcal} kcal</p>
              <p className='pro-total'>{lunchTotal.protein} Protein (g)</p>
              <p className='ca-total'>{lunchTotal.carbs} Carbs (g)</p>
              <p className='fat-total'>{lunchTotal.fat} Fat (g)</p>
            </div>
            <div className='table'>
              <Table columns={columns} dataSource={[]} pagination={false} />
            </div>

            {/* Dinner Section */}
            <div className='dinner-header'>
              <h2 className="dinner-title">Dinner</h2>
              <p className='kcal-total'>{dinnerTotal.kcal} kcal</p>
              <p className='pro-total'>{dinnerTotal.protein} Protein (g)</p>
              <p className='ca-total'>{dinnerTotal.carbs} Carbs (g)</p>
              <p className='fat-total'>{dinnerTotal.fat} Fat (g)</p>
            </div>
            <div className='table'>
              <Table columns={columns} dataSource={[]} pagination={false} />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyMeal;

