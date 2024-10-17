import React, { useState } from 'react';
import '../../styles/Onboard.css';
import logo from '../../dashboard_image/logo.png';

const Onboard = (props) => {
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [username, setUsername] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('');
    const [error, setError] = useState('');

    // State cho các bước khác
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [weightGoal, setWeightGoal] = useState('');

    // State cho step 3 (hoạt động hàng ngày)
    const [activityLevel, setActivityLevel] = useState('');

    // Hàm xử lý khi thay đổi giới tính
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const submitData = async () => {
        const data = {
            name: `${firstName} ${username}`, // Ghép firstname và username
            gender,
            birthday,
            height,
            weight,
            weightGoal,
            activityLevel,
            selectedGoal,
        };

        try {
            const response = await fetch('http://localhost:5000/api/user/onboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Data successfully submitted:', result);
            } else {
                console.error('Failed to submit data:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const nextStep = () => {
        if (step === 1 && (!firstName || !username)) {
            setError('Please fill out all fields');
            return;
        } else if (step === 2 && !selectedGoal) {
            setError('Please select a goal before continuing');
            return;
        } else if (step === 3 && !activityLevel) {
            setError('Please select your activity level before continuing');
            return;
        } else if (step === 4 && (!gender || !birthday || !height || !weight || !weightGoal)) {
            setError('Please fill out all fields');
            return;
        }

        setError('');
        if (step < 5) {
            setStep(step + 1);
        } else {
            submitData(); // Gọi API khi đến bước cuối
        }
    };

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
                    <div className="popup step2">
                        <h2>What is your goal?</h2>
                        <p>Set the health objective you're aiming to achieve.</p>
                        <div className="button-group-goal">
                            <button
                                className={`goal-btn ${selectedGoal === 'Gain weight' ? 'selected' : ''}`}
                                onClick={() => setSelectedGoal('Gain weight')}
                            >
                                Gain weight
                            </button>
                            <button
                                className={`goal-btn ${selectedGoal === 'Lose weight' ? 'selected' : ''}`}
                                onClick={() => setSelectedGoal('Lose weight')}
                            >
                                Lose weight
                            </button>
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="button-group">
                            <button className="back-btn" onClick={prevStep}>Back</button>
                            <button className="following-btn" onClick={nextStep} disabled={!selectedGoal}>
                                Following
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="popup step3">
                        <h2>What is your activity level?</h2>
                        <p>Tell us how active you are in your daily routine.</p>
                        <div className="radio-group">
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="activity"
                                    value="Not very active"
                                    onChange={() => setActivityLevel('Not very active')}
                                />
                                <span className="option-title">Not very active</span>
                                <span className="activity-desc">
                                    You spend most of your day sitting or doing minimal physical activity.
                                </span>
                            </label>
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="activity"
                                    value="Moderately active"
                                    onChange={() => setActivityLevel('Moderately active')}
                                />
                                <span className="option-title">Moderately active</span>
                                <span className="activity-desc">
                                    You engage in light physical activity, like walking or occasional exercise.
                                </span>
                            </label>
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="activity"
                                    value="Active"
                                    onChange={() => setActivityLevel('Active')}
                                />
                                <span className="option-title">Active</span>
                                <span className="activity-desc">
                                    You are regularly active, exercising several times a week and moving often.
                                </span>
                            </label>
                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name="activity"
                                    value="Very active"
                                    onChange={() => setActivityLevel('Very active')}
                                />
                                <span className="option-title">Very active</span>
                                <span className="activity-desc">
                                    You have a highly active lifestyle, engaging in intense exercise or physical labor daily.
                                </span>
                            </label>
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="button-group">
                            <button className="back-btn" onClick={prevStep}>Back</button>
                            <button className="following-btn" onClick={nextStep} disabled={!activityLevel}>
                                Following
                            </button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="popup step4">
                        <h2>Complete your essential info</h2>
                        <form>
                            <div className="input-container">
                                <label className="input-label">Your Gender</label>
                                <div className="gender-group">
                                    <label className={gender === 'Male' ? 'selected' : 'unselected'}>
                                        <input 
                                            type="radio" 
                                            name="gender" 
                                            value="Male" 
                                            onChange={handleGenderChange} 
                                        /> 
                                        Male
                                    </label>
                                    <label className={gender === 'Female' ? 'selected' : 'unselected'}>
                                        <input 
                                            type="radio" 
                                            name="gender" 
                                            value="Female" 
                                            onChange={handleGenderChange} 
                                        /> 
                                        Female
                                    </label>
                                </div>
                            </div>
                            <div className="input-container">
                                <label className="input-label" htmlFor="birthday">Your birthday</label>
                                <input
                                    type="date"
                                    id="birthday"
                                    className="input-field happy"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </div>
                            <div className="input-container">
                                <label className="input-label" htmlFor="height">Height (cm)</label>
                                <input
                                    type="number"
                                    id="height"
                                    className="input-field heights"
                                    placeholder="Type your height "
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            </div>
                            <div className="input-container">
                                <label className="input-label" htmlFor="weight">Weight (kg)</label>
                                <input
                                    type="number"
                                    id="weight"
                                    className="input-field weights"
                                    placeholder="Type your weight kg"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            </div>
                            <div className="input-container">
                                <label className="input-label" htmlFor="goal">Weight goal (kg)</label>
                                <input
                                    type="text"
                                    id="goal"
                                    className="input-field weight-goal"
                                    placeholder="Type your weight goal"
                                    value={weightGoal}
                                    onChange={(e) => setWeightGoal(e.target.value)}
                                />
                            </div>
                        </form>
                        {error && <p className="error">{error}</p>}
                        <div className="button-group">
                            <button className="back-btn" onClick={prevStep}>Back</button>
                            <button
                                className="following-btn"
                                onClick={nextStep}
                                disabled={!gender || !birthday || !height || !weight || !weightGoal}
                            >
                                Following
                            </button>
                        </div>
                    </div>
                );
                case 5:
                    return (
                        <div className="popup step5">
                            <h2>Congratulation 🎉</h2>
                            <p>Your daily net calorie goal is:</p>
                            <h1 className="calorie-goal">2,990</h1> {/* Adjust this value dynamically if needed */}
                            <span>You can lose 2kg by December 15th</span> {/* Adjust this date and value dynamically */}
                            <button className="get-started-btn" onClick={props.onComplete}>Get started</button>
                        </div>
                    );
                
            default:
                return null;
        }
    };

    return (
        <div className="onboard-container">
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
