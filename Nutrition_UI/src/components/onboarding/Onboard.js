

import React, { useState, useEffect } from 'react';
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
    
    // State for TDEE and success
    const [calorieGoal, setCalorieGoal] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // State for email and password in step 6
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGenderChange = (e) => setGender(e.target.value);
    
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
        } else if (step === 6 && (!email || !password)) {
            setError('Please enter email and password');
            return;
        }

        setError('');
        if (step === 4) {
            // After step 4, calculate TDEE and then move to step 5
            calculateTDEE();
        } else if (step < 6) {
            setStep(step + 1);
        } else if (step === 6) {
            handleSignup();
        }
    };
    
    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const calculateTDEE = () => {
        // Tính toán TDEE dựa trên các thông số người dùng nhập vào
        const BMR = gender === 'Male' 
            ? 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * (new Date().getFullYear() - new Date(birthday).getFullYear()))
            : 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * (new Date().getFullYear() - new Date(birthday).getFullYear()));

        let activityMultiplier = 1.2; // mặc định là 'Not very active'
        switch (activityLevel) {
            case 'Moderately active':
                activityMultiplier = 1.55;
                break;
            case 'Active':
                activityMultiplier = 1.725;
                break;
            case 'Very active':
                activityMultiplier = 1.9;
                break;
            default:
                break;
        }

        const TDEE = BMR * activityMultiplier;
        setCalorieGoal(Math.round(TDEE)); // Round and set calorie goal
        setStep(5); // Chuyển sang bước 5 sau khi tính toán
    };

    const handleSignup = async () => {
        const userData = {
            name: `${firstName} ${username}`,
            email: email,
            password: password,
            gender,
            birthday,
            height: parseFloat(height),
            weight: parseFloat(weight),
            activity_level: activityLevel,
            goal_type: selectedGoal,
            weight_goal: parseFloat(weightGoal),
        };

        try {
            const response = await fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const result = await response.json();
                setSuccessMessage('Account successfully created!'); // Show success message
                setStep(7); // Final step
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed.');
            }
        } catch (error) {
            setError('An error occurred during registration.');
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
                                    You have a highly active lifestyle, engaging in intense exercise or physical work.
                                </span>
                            </label>
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="button-group">
                            <button className="back-btn" onClick={prevStep}>Back</button>
                            <button className="following-btn" onClick={nextStep}>
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
                                        type="number" min="0" oninput="this.value = this.value < 0 ? '' : this.value;"
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
                                        type="number" min="0" oninput="this.value = this.value < 0 ? '' : this.value;"
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
                                       type="number" min="0" oninput="this.value = this.value < 0 ? '' : this.value;"
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
                            <h1 className="calorie-goal">{calorieGoal !== null ? calorieGoal : 'Calculating...'}</h1>
                            <span>You can lose 2kg by December 15th</span> {/* Adjust this date and value dynamically */}
                            <div className="button-group">
                                <button className="back-btn" onClick={prevStep}>Back</button>
                                <button className="following-btn" onClick={nextStep}>Next</button>
                            </div>
                        </div>
                    );
                case 6:
                    return (
                        <div className="popup step6">
                            <h2>Complete Your Signup</h2>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && <p className="error">{error}</p>}
                            <div className="button-group">
                                <button className="back-btn" onClick={prevStep}>Back</button>
                                <button className="following-btn" onClick={nextStep}>Sign Up</button>
                            </div>
                        </div>
                    );
                case 7:
                    return (
                        <div className="popup step7">
                            <h2>{successMessage}</h2>
                            <button onClick={props.onComplete}>Get started</button>
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
    
