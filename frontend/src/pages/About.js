import React from 'react'
import Slider from 'react-slick';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './About.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
    let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow:2,
        slidesToScroll: 2
    };
    let myStyle= {
        textAlign: "center",    
    }
    return (
    <>
        <Navbar/>
        <div className="head">
            <h2 style={myStyle}>Aura Tracker: Campusify</h2>
        </div>
        <div className="desc">
            <p style={myStyle}>
            We believe that studying doesn’t have to be tedious—it can be motivating, interactive, and even gameful. Our platform combines the power of goal setting, progress tracking, and game-like elements to help you stay motivated and achieve your academic goals.
            </p>
            <p style={myStyle}>
            A campus college tracker web app that gamifies academic life, making studying, attending lectures, completing projects, and participating in events engaging and rewarding.
            </p>
            <p style={myStyle}>
            Track your classes, assignments, deadlines, study goals, schedules, and more. This app fosters a strong community vibe by integrating social and interactive features, encouraging collaboration and making learning fun.
            </p>
            <p style={myStyle}>
            Here are some salient features of Aura Tracker:
            </p>
        </div>
        <div className='h-screen pl-10  pt-10'>
            <div className = "w-1 m-auto">
            <Slider {...settings}>            
                {
                data.map((d) => {
                    return(
                        <div className="whole">
                            <div className="head">
                                <p>{d.head}</p>
                            </div>
                            <div className="desc">
                                <p>{d.desc}</p>
                            </div>
                        </div>
                    )
                })
                }
            </Slider>    
            </div>
        </div>
        <Footer/>
    </>
    )
  }
  
  const data = [
    {
        head: 'Student Profiles',
        desc: 'Set academic goals , track progress, and manage course schedules.'
    },
    {
        head: 'Reward System',
        desc: 'Receive both virtual and Real-World rewards for meeting targets.'
    },
    {
        head: 'Course Tracking',
        desc: 'Organise assignments, deadlines ,and display a timetable.'
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
        desc: 'Complete Aura scores with peers across courses and campus.'
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
        desc: ' Check-in to lectures and gain attendance points.'
    },
    {
        head: 'Event & Exam Countdown',
        desc: ' Get reminders and plan for upcoming deadlines.'
    },
    {
        head: 'Custom Goals',
        desc: ' Set personalized study goals with reminders.'
    },
    {
        head: 'Study Analytics',
        desc: '  Track study time, progress, and identify improvement areas.'
    }
  ]
  export default App
  