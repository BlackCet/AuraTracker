import React from 'react';

function About() {
    return (
        <>
        <div className="Features">
            <div className="hero bg-base-200 py-10">
                <div className="hero-content text-center">
                    <div className="Desc max-w-xl">
                        {/* Description of the App */}
                        <h2 className="text-4xl font-bold mb-5">Aura Tracker: Campusify</h2>
                        <p className="text-lg mb-5">
                            We believe that studying doesn’t have to be tedious—it can be motivating, interactive, and even gameful. Our platform combines the power of goal setting, progress tracking, and game-like elements to help you stay motivated and achieve your academic goals.
                        </p>
                        <p className="text-lg mb-5">
                            A campus college tracker web app that gamifies academic life, making studying, attending lectures, completing projects, and participating in events engaging and rewarding.
                        </p>
                        <p className="text-lg mb-5">
                            Track your classes, assignments, deadlines, study goals, schedules, and more. This app fosters a strong community vibe by integrating social and interactive features, encouraging collaboration and making learning fun.
                        </p>
                        <p className="text-lg font-semibold mb-5">Here are some salient features of Aura Tracker:</p>
                    </div>
                </div>
            </div>
            
            <div className="carousel carousel-center p-10 space-x-4 rounded-box overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* features of the app */}
                    {data.map((item, index) => (
                        <div key={index} className="carousel-item">
                            <div className="card w-full bg-base-100 shadow-xl">
                                <div className="Cards card-body">
                                    <h3 className="card-title text-xl font-bold">{item.head}</h3>
                                    <p className="text-gray-700 mt-2">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </>
    );
}

const data = [
    {
        head: 'Student Profiles',
        desc: 'Set academic goals, track progress, and manage course schedules.'
    },
    {
        head: 'Reward System',
        desc: 'Receive both virtual and Real-World rewards for meeting targets.'
    },
    {
        head: 'Course Tracking',
        desc: 'Organise assignments, deadlines, and display a timetable.'
    },
    {
        head: 'Daily/Weekly Challenges',
        desc: 'Complete tasks for extra Aura points and rewards.'
    },
    {
        head: 'Study Milestones',
        desc: 'Break down materials into chapters and earn badges for completion.'
    },
    {
        head: 'Leaderboards',
        desc: 'Compete Aura scores with peers across courses and campus.'
    },
    {
        head: 'Gamification',
        desc: 'Earn Aura points for achievements and unlock rewards.'
    },
    {
        head: 'Timetable view',
        desc: 'Display color-coded schedules and reminders.'
    },
    {
        head: 'Study Groups',
        desc: 'Form teams for group challenges with shared rewards.'
    },
    {
        head: 'Campus Events',
        desc: 'Earn points for attending events, fostering a balanced experience.'
    },
    {
        head: 'Virtual Study Rooms',
        desc: 'Join Pomodoro-timed sessions to earn focus-based XP.'
    },
    {
        head: 'Mentorship',
        desc: 'Gain XP through peer and senior mentoring support.'
    },
    {
        head: 'Lecture Attendance',
        desc: 'Check-in to lectures and gain attendance points.'
    },
    {
        head: 'Event & Exam Countdown',
        desc: 'Get reminders and plan for upcoming deadlines.'
    },
    {
        head: 'Custom Goals',
        desc: 'Set personalized study goals with reminders.'
    },
    {
        head: 'Study Analytics',
        desc: 'Track study time, progress, and identify improvement areas.'
    }
];

export default About;
