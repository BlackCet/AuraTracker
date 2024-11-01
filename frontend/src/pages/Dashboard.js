import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h1>Welcome to your Dashboard</h1>
            <div className="card-container">
                <div className="card">
                    <Link to="/course">
                        <h3>Courses</h3>
                        <p>See all your courses here</p>
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
                        <h3>Virtual Study Rooms</h3>
                        <p>Connect with your peers.</p>
                    </Link>
                </div>
                {/* Add more cards as needed */}
            </div>
        </div>
    );
};

export default Dashboard;
