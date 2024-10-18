import React, { useState } from "react";
import edit from "../../image/setting_image/Edit.svg";
import { DatePicker } from 'antd';
import '../../styles/Setting.css';

const Setting = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className="setting">
            <div className="account">
                <h2>Account</h2>
                <div className="name">
                    <p>Name</p>
                    <input type="text" className="name-input" />
                    <img src={edit} alt="edit" className="edit-icon" />
                </div>
                <div className="email">
                    <p>Email</p>
                    <input type="email" className="email-input" />
                    <img src={edit} alt="edit" className="edit-icon" />
                </div>
                <div className="password">
                    <p>Password</p>
                    <input type="password" className="password-input" />
                    <img src={edit} alt="edit" className="edit-icon" />
                </div>
            </div>
            <div className="profile">
                <h2>Profile</h2>
                <div className="gender">
                    <p>Your gender</p>
                    <input type="checkbox" id="male-box" name="gender" value="male" />
                    <label htmlFor="male-box">Male</label>
                    <input type="checkbox" id="female-box" name="gender" value="female" />
                    <label htmlFor="female-box">Female</label>
                </div>
                <div className="birthday">
                    <p>Your birthday</p>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="date-picker" // Add your custom class for styling if needed
                    />
                </div>
                <div className="height">
                    <p>Height</p>
                    <input type="number" id="height-input" name="height-input" min="100" max="300" /><span class="unit-cm">cm</span>
                </div>
                <div className="weight">
                    <p>Weight</p>
                    <input type="number" id="weight-input" name="weight-input" min="0" max="200" /><span class="unit-kg">kg</span>
                </div>
            </div>
            <div className="goal">
                <h2>Goal</h2>
                <div className="weight-goal">
                    <p>Weight goal</p>
                    <input type="number" id="goalweight-input" name="goalweight-input" min="0" max="200" /><span class="unit-kg-goal">kg</span>
                </div>
                <div className="activity_level">
                    <p>Activity level</p>
                    <div className="level1">
                        <input type="checkbox" id="no-box" name="no" value="no" />
                        <label htmlFor="no1-box">Not very active</label>
                        <br></br>
                        <label htmlFor="no2-box">You spend most of your day sitting or doing minimal physical activity.</label>
                    </div>
                    <div className="level2">
                        <input type="checkbox" id="mor-box" name="mor" value="mor" />
                        <label htmlFor="mor1-box">Morderately active</label>
                        <br></br>
                        <label htmlFor="mor2-box">You enage in light physical activity, like walking or occasional exercise.</label>
                    </div>
                    <div className="level3">
                        <input type="checkbox" id="nor-box" name="nor" value="nor" />
                        <label htmlFor="nor1-box">Active</label>
                        <br></br>
                        <label htmlFor="nor2-box">You are regularly active, exercising serveral times a week and moving often.</label>
                    </div>
                    <div className="level4">

                        <input type="checkbox" id="ver-box" name="ver" value="ver" />
                        <label htmlFor="ver1-box">Very active</label>
                        <br></br>
                        <label htmlFor="ver2-box">You have a highly active lifestyle, engaging in intense exercise or physical labor daily.</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting;
