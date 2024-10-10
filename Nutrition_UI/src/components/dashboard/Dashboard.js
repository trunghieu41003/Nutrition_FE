import React from 'react';
import { Progress, Card, Row, Col, Typography } from 'antd';
import '../../styles/Dashboard.css'; // Import your styles here

const { Title } = Typography;

const Dashboard = () => {

// Hàm format hiển thị 938 kcal với 938 in đậm và kcal bên dưới
const calorieFormat = (calories) => (
  <div style={{ fontSize: '16px', lineHeight: '1' }}>
    <strong style={{ display: 'block', fontSize: '34px', fontWeight: '600' }}>{calories}</strong>
    <span style={{ fontSize: '24px', color:'#989BA6' }}>kcal</span>
  </div>
);

  return (
    <div className="dashboard">
      {/* Title for Energy Summary */}
      <Title level={2} className="section-title">
        Energy Summary
      </Title>

      {/* Energy Summary Section */}
      <Row gutter={[16, 16]} className="energy-summary">
        <Col xs={24} sm={12}>
          <Card className="energy-card" bordered={false}>
            <div className="progress-container1">
              <Progress
                type="circle"
                percent={50}
                strokeColor="#0072FD"
                strokeWidth={12} 
                format={() => calorieFormat(938)}
                width={150}
              />
              <p>Calorie consumed</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card className="energy-card" bordered={false}>
            <div className="progress-container1">
              <Progress
                type="circle"
                percent={50}
                strokeColor="#00C0FD"
                strokeWidth={12} 
                format={() => calorieFormat(938)}
                width={150}
              />
              <p>Calorie remaining</p>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Title for Macro Targets */}
      <Title level={2} className="section-title1">
        Macro Targets
      </Title>

      {/* Macro Targets Section */}
      <Row gutter={[16, 16]} className="macro-targets">
        <Col xs={24} sm={8}>
          <Card className="macro-card" bordered={false}>
            <div className="progress-container">
            <div className="progress-info">
                <p>345/453 (g)</p>
                <p>Protein</p>
              </div>
              <Progress
                type="circle"
                percent={75}
                strokeColor="#1F263E"
                strokeWidth={10}
                format={() => '75%'}
                width={70}
              />
              
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="macro-card" bordered={false}>
            <div className="progress-container">
            <div className="progress-info">
                <p>345/453 (g)</p>
                <p>Protein</p>
              </div>
              <Progress
                type="circle"
                percent={75}
                strokeColor="#1F263E"
                strokeWidth={10}
                format={() => '75%'}
                width={70}
              />
             
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="macro-card" bordered={false}>
            <div className="progress-container">
            <div className="progress-info">
                <p>345/453 (g)</p>
                <p>Protein</p>
              </div>
              <Progress
                type="circle"
                percent={75}
                strokeColor="#1F263E"
                strokeWidth={10}
                format={() => '75%'}
                width={70}
              />
              
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
