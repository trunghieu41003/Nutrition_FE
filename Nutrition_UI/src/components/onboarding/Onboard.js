import React, { useState } from 'react';
import '../../styles/Onboard.css';
import logo from '../../dashboard_image/logo.png'; // Đường dẫn điều chỉnh theo yêu cầu

const Onboard = (props) => {
    const [step, setStep] = useState(1);

    // Trạng thái nhập liệu cho Step 1
    const [firstName, setFirstName] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    // Xử lý khi nhấn nút "Following"
    const nextStep = () => {
        if (step === 1 && (!firstName || !username)) {
            setError('Please fill out all fields');
            return;
        }
        setError('');
        if (step < 5) {
            setStep(step + 1);
        }
    };

    // Xử lý nút "Back"
    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const renderContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="popup">
                        <h2>What is your name?</h2>
                        <p>Tell us your name to personalize your experience.</p>
                        <input
                            type="text"
                            placeholder="Firstname"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {error && <p className="error">{error}</p>}
                        <button onClick={nextStep}>Following</button>
                    </div>
                );
            case 2:
                return (
                    <div className="popup step2"> {/* Thêm class step2 để áp dụng CSS mới */}
                        <h2>What is your goal?</h2>
                        <p>Set the health objective you're aiming to achieve.</p>
                        <div className="radio-group">
                            <label>
                                <input type="radio" name="goal" value="Gain weight" />
                                Gain weight
                            </label>
                            <label>
                                <input type="radio" name="goal" value="Lose weight" />
                                Lose weight
                            </label>
                        </div>
                        <div className="button-group">
                            <button className="back-btn" onClick={prevStep}>Back</button>
                            <button className="following-btn" onClick={nextStep}>Following</button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="popup">
                        <h2>What is your activity level?</h2>
                        <input type="radio" name="activity" value="Low" /> Low
                        <input type="radio" name="activity" value="Medium" /> Medium
                        <input type="radio" name="activity" value="High" /> High
                        <div className="button-group">
                            <button onClick={prevStep}>Back</button>
                            <button onClick={nextStep}>Following</button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="popup">
                        <h2>Complete your info</h2>
                        <input type="text" placeholder="Age" />
                        <input type="text" placeholder="Height" />
                        <input type="text" placeholder="Weight" />
                        <div className="button-group">
                            <button onClick={prevStep}>Back</button>
                            <button onClick={nextStep}>Following</button>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="popup">
                        <h2>Congratulations!</h2>
                        <p>You have completed the onboarding process.</p>
                        <button onClick={props.onComplete}>Go to Dashboard</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="onboard-container">
            {/* Logo cố định */}
            <div className="header-logo">
                <img src={logo} alt="Nutritioners Logo" />
                <h1 className="logo-title">Nutritioners</h1>
            </div>

            <div className="background"></div>
            {renderContent()}
        </div>
    );
};

export default Onboard;
