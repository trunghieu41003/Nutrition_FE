import React, { useState } from 'react';
import '../../styles/Header.css';
import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import maskImage from '../../dashboard_image/Mask.png';

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleMenuClick = (e) => {
    // Optionally handle menu item click here
    console.log("Menu item clicked:", e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        Manage Account
      </Menu.Item>
      <Menu.Item key="2">
        Log out
      </Menu.Item>
    </Menu>
  );

  // Handle clicks inside the dropdown to prevent closing
  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevents the toggleDropdown from being triggered
  };

  return (
    <div className="header">
      <div className="hamburger-container">
        <div className="hamburger" />
        <div className="header-title">Dashboard</div>
      </div>

      <div className="avatar-container" onClick={toggleDropdown}>
        <Avatar size={40} src={maskImage} icon={<UserOutlined />} />
        <span className="avatar-name">Moni Roy</span>
        <div className="dropdown-toggle">
          <DownOutlined />
        </div>

        {isDropdownVisible && (
          <div className="dropdown-menu" onClick={handleDropdownClick}>
            <div className="dropdown-item">Manage Account</div>
            <div className="dropdown-item">Log out</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
