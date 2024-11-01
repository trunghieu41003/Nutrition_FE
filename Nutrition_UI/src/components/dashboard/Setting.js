import React, { useState, useEffect } from "react";
import axios from "axios";
import edit from "../../image/setting_image/Edit.svg";
import { DatePicker, message } from 'antd';
import '../../styles/Setting.css';

const Setting = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [goalWeight, setGoalWeight] = useState(""); // Initialize with 0 if that's a valid state

    const [activityLevel, setActivityLevel] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    const token = localStorage.getItem("token");

    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);


    // Fetch user data (GET request)
    useEffect(() => {
        axios.get(`http://localhost:3000/api/auth/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const data = response.data.user;
            const goalData = response.data.goal[0]; // Use the first goal if available
            console.log('User Data:', data);
           
            setName(data.name);
            setEmail(data.email);
            setGender(data.gender);
            setBirthday(data.birthday);
            setHeight(data.height);
            setWeight(data.weight);
            setGoalWeight(goalData ? goalData.weight_goal : "");
            setActivityLevel(data.activity_level);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
    }, [token]);

    const toggleModal1 = () => setModal1(!modal1);
    const toggleModal2 = () => setModal2(!modal2);
    const toggleModal3 = () => setModal3(!modal3);

    // Update user data (PUT request)
    const updateUserData = () => {
        const updatedData = { 
            name, 
            email, 
            password, 
            gender, 
            birthday, 
            height, 
            weight, 
            activity_level: activityLevel, 
            goal: [{ weight_goal: goalWeight }]
        };

        axios.put(`http://localhost:3000/api/auth/users`, updatedData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            message.success("Information updated successfully!");
            setIsDisabled(true); // Disable fieldsets after update
        })
        .catch(error => {
            console.error("Error updating user data:", error);
            message.error("Update failed, please try again.");
        });
    };

    return (
        <div className="setting">
            <h1 className="setting-title">Setting</h1>

            <div className="account">
                <h2>Account</h2>

                {/* Name Section */}
                <div className="name">
                    <p>Name</p>
                    <input type="text" className="name-input" value={name} disabled />
                    <img onClick={toggleModal1} src={edit} alt="edit" className="edit-icon-name" />
                    {modal1 && (
                        <div className="modal">
                            <div onClick={toggleModal1} className="overlay"></div>
                            <div className="modal-content">
                                <h3>Change name</h3>
                                <div className="name-container">
                                    <div className="name-input-again">Enter your new name</div>
                                    <input type="text" className="name-input1" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="modal-btn">
                                    <button className="cancel-modal" onClick={toggleModal1}>Cancel</button>
                                    <button className="save-modal" onClick={updateUserData}>Save</button>
                                </div>
                                <button className="close-modal" onClick={toggleModal1}>X</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Email Section */}
                <div className="email">
                    <p>Email</p>
                    <input type="email" className="email-input" value={email} disabled />
                    <img onClick={toggleModal2} src={edit} alt="edit" className="edit-icon-email" />
                    {modal2 && (
                        <div className="modal">
                            <div onClick={toggleModal2} className="overlay"></div>
                            <div className="modal-content">
                                <h3>Change email address</h3>
                                <div className="name-container">
                                    <div className="email-input-again">Enter your new email address</div>
                                    <input type="email" className="email-input1" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="modal-btn">
                                    <button className="cancel-modal" onClick={toggleModal2}>Cancel</button>
                                    <button className="save-modal" onClick={updateUserData}>Save</button>
                                </div>
                                <button className="close-modal" onClick={toggleModal2}>X</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Password Section */}
                <div className="password">
                    <p>Password</p>
                    <input type="password" className="password-input" value={password} disabled />
                    <img onClick={toggleModal3} src={edit} alt="edit" className="edit-icon-password" />
                    {modal3 && (
                        <div className="modal">
                            <div onClick={toggleModal3} className="overlay"></div>
                            <div className="modal-content1">
                                <h3>Change your password</h3>
                                <div className="name-container">
                                    <div className="password-input-again">Current password</div>
                                    <input type="password" className="password-input1" />
                                    <div className="password-input-again">New password</div>
                                    <input type="password" className="password-input1" onChange={(e) => setPassword(e.target.value)} />
                                    <div className="password-input-again">Confirm new password</div>
                                    <input type="password" className="password-input1" />
                                </div>
                                <div className="modal-btn">
                                    <button className="cancel-modal" onClick={toggleModal3}>Cancel</button>
                                    <button className="save-modal1" onClick={updateUserData}>Save</button>
                                </div>
                                <button className="close-modal" onClick={toggleModal3}>X</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
    

            <div className="profile">
                <h2>Profile</h2>
                <div className="gender">
                    <p>Your gender</p>
                    <input 
                        type="radio" 
                        name="gender" 
                        value="male" 
                        checked={gender === "male"} 
                        onChange={() => setGender("male")} 
                       
                    /> Male
                    <input 
                        type="radio" 
                        name="gender" 
                        value="female" 
                        checked={gender === "female"} 
                        onChange={() => setGender("female")} 
                      
                    /> Female
                </div>

                <div className="birthday">
                    <p>Your birthday</p>
                    <input
                                            type="date"
                                            id="birthday"
                                            className="input-field happy"
                                            value={birthday}
                                            onChange={(e) => setBirthday(e.target.value)}
                                        />
                </div>

                <div className="height">
                    <p>Height</p>
                    <input 
                     className="number"
                        type="number" 
                        value={height} 
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 3) { // Limit height to 3 digits
                                setHeight(value);
                            }
                        }} 
                        
                    />
                </div>

                <div className="weight">
                    <p>Weight</p>
                    <input 
                     className="number"
                        type="number" 
                        value={weight} 
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 3) {
                                setWeight(value); // Limit weight to 3 digits
                            }
                        }}  
                       
                    />
                </div>
            </div>

            <div className="goal">
                <h2>Goal</h2>
                <div className="weight-goal">
                    <p>Weight goal</p>
                    <input 
                    className="number"
                        type="number" 
                        value={goalWeight} 
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 3) {
                                setGoalWeight(value);// Limit goal weight to 3 digits
                            }
                        }} 
                         
                    />
                    <span className="unit-kg-goal">kg</span>
                </div>

           
                <div className="activity_level">
    <h2>Activity level</h2>
    <div className="level">
        <input
            type="radio"
            id="not_very_active"
            checked={activityLevel === "not very active"}
            onChange={() => setActivityLevel("not very active")}
        />
        <div className="label_container">
            <label htmlFor="not_very_active" className={activityLevel === "not very active" ? "selected" : ""}>Not very active</label>
            <h5 className={activityLevel === "not very active" ? "selected" : ""}>You spend most of your day sitting or doing minimal physical activity.</h5>
        </div>
    </div>
    <div className="level">
        <input
            type="radio"
            id="moderately_active"
            checked={activityLevel === "moderately active"}
            onChange={() => setActivityLevel("moderately active")}
        />
        <div className="label_container">
            <label htmlFor="moderately_active" className={activityLevel === "moderately active" ? "selected" : ""}>Moderately active</label>
            <h5 className={activityLevel === "moderately active" ? "selected" : ""}>You engage in light physical activity, like walking or occasional exercise.</h5>
        </div>
    </div>
    <div className="level">
        <input
            type="radio"
            id="active"
            checked={activityLevel === "active"}
            onChange={() => setActivityLevel("active")}
        />
        <div className="label_container">
            <label htmlFor="active" className={activityLevel === "active" ? "selected" : ""}>Active</label>
            <h5 className={activityLevel === "active" ? "selected" : ""}>You are regularly active, exercising several times a week and moving often.</h5>
        </div>
    </div>
    <div className="level">
        <input
            type="radio"
            id="very_active"
            checked={activityLevel === "very_active"}
            onChange={() => setActivityLevel("very_active")}
        />
        <div className="label_container">
            <label htmlFor="very_active" className={activityLevel === "very_active" ? "selected" : ""}>Very active</label>
            <h5 className={activityLevel === "very_active" ? "selected" : ""}>You have a highly active lifestyle, engaging in intense exercise or physical labor daily.</h5>
        </div>
    </div>
</div>

            </div>

            <button onClick={updateUserData} className="save-button">Save Changes</button>
        </div>
    );
};

export default Setting;
