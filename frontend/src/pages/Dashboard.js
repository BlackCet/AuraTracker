import React from 'react';
import { Link } from 'react-router-dom';
import Countdown from '../components/Countdown';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h1 className='color-teal-light'>Welcome to your Dashboard</h1>
            <div className="card-container">
                <div className="card">
                    <Link to="/course">
                        <h3>Course materials</h3>
                        <p>See all your courses material here</p>
                    </Link>
                </div>
                <div className="card">
                    <Link to="/assignments">
                        <h3>Assignments</h3>
                        <p>View and manage your assignments</p>
                    </Link>
                </div>
                <div className="card">
                    <Link to="/profile">
                        <h3>Profile</h3>
                        <p>Update your profile information</p>
                    </Link>
                </div>
                <div className="card">
                    <Link to="/schedule">
                        <h3>Schedule</h3>
                        <p>Check your class schedule</p>
                    </Link>
                </div>
                <div className="card">
                    <Link to="/goals">
                        <h3>Academic Goals</h3>
                        <p>Add and keep track of your academic goals.</p>
                    </Link>
                </div>
                <div className="card">
                    <Link to="/leaderboard">
                        <h3>Leaderboard</h3>
                        <p>See who's ahead of you.</p>
                    </Link>
                </div>
                <div className="card">
                    <Link to="/studyroom">
                        <h3>Pomodoro Timer</h3>
                        <p>See your focus time here.</p>
                    </Link>
                </div>
                <div className="card">
                    <Link to="/analytics">
                        <h3>Study Tracker</h3>
                        <p>See your progress here.</p>
                    </Link>
                </div>
                {/* Add more cards as needed */}
            </div>
            <div className="my-6 p-4 bg-[#E2f1E7] rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-center text-teal-700">Upcoming Event Countdown</h2>
                <Countdown />
            </div>
        </div>
    );
};

export default Dashboard;
