import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [workDuration, setWorkDuration] = useState(25); // in minutes
  const [breakDuration, setBreakDuration] = useState(5); // in minutes
  const [minutes, setMinutes] = useState(workDuration);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isFinished, setIsFinished] = useState(false); // New state for animation
  const [showPartyPopper, setShowPartyPopper] = useState(false); // Party popper state
  const [isTransitioning, setIsTransitioning] = useState(false); // State to manage transition between work and break
  const [message, setMessage] = useState(""); // State for the message
  useEffect(() => {
    let timer;
  
    if (isActive && !isTransitioning) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(timer);
          setIsFinished(true); // Timer finished
  
          // Start transition to break or work
          if (!isBreak) {
            setIsTransitioning(true); // Start the transition to break
            setShowPartyPopper(true); // Show party popper for celebration
            setMessage("Time for a quick break!"); // Message after work finishes
            setTimeout(() => setShowPartyPopper(false), 3000); // Hide party popper after 3 seconds
  
            setTimeout(() => {
              setIsBreak(true); // Switch to break after work is done
              setMinutes(breakDuration); // Set break duration
              setSeconds(0);
              setIsActive(true); // Start the break timer automatically
              setMessage("Break Time"); // Show "Break Time" during break period
              setIsTransitioning(false); // End the transition state
            }, 3000); // Wait for the party popper to disappear
          } else {
            setIsBreak(false); // Switch to work
            setMinutes(workDuration); // Set work time
            setSeconds(0);
            setIsActive(true); // Start the work timer again automatically
            setMessage("Time to get back to your work!"); // Message after break finishes
            
            setTimeout(() => {
              setMessage("Work Time"); // Show "Work Time" during work period
              setIsTransitioning(false); // End the transition state
            }, 3000); // Message delay after "Time to get back to your work!"
          }
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(timer);
    }
  
    return () => clearInterval(timer);
  }, [isActive, seconds, minutes, isBreak, workDuration, breakDuration, isTransitioning]);
  

  const handleStart = () => {
    setIsActive(true);
    setIsFinished(false); // Reset animation when starting the timer
    setShowPartyPopper(false); // Hide party popper when starting new session
    setMessage(""); // Reset message
  };

  const handlePause = () => setIsActive(false);

  const handleReset = () => {
    setIsActive(false);
    setMinutes(workDuration);
    setSeconds(0);
    setIsBreak(false);
    setIsFinished(false); // Reset animation when resetting the timer
    setShowPartyPopper(false); // Hide party popper when resetting the timer
    setIsTransitioning(false); // Reset transition state
    setMessage(""); // Reset message
  };

  const handleWorkDurationChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value));
    setWorkDuration(value);
    if (!isActive) {
      setMinutes(value); // Update minutes to match new work duration if timer is inactive
    }
  };

  const handleBreakDurationChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value));
    setBreakDuration(value);
    if (!isActive) {
      setMinutes(value); // Update minutes to match new break duration if timer is inactive
    }
  };

  return (
    <div style={{ backgroundColor: '#E2F1E7' }} className="flex flex-col items-center shadow-lg rounded-lg p-8 w-80 m-auto">
      <h1 className="text-2xl font-bold text-center mb-4">{isBreak ? "Break" : "Work"}</h1>

      {/* Display party popper after work session is complete */}
      {showPartyPopper && (
        <div className="text-5xl mb-4 animate-bounce">
          🎉🎉🎉
        </div>
      )}

      {/* Display timer with animation trigger */}
      <div
        className={`text-5xl font-mono mb-8 transition-transform ${isFinished ? 'animate-pulse' : ''}`}
      >
        {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
      </div>

      {/* Display message after work or break finishes */}
      {message && (
        <div className="text-xl font-semibold text-center mb-4">
          {message}
        </div>
      )}

      {/* Timer Controls */}
      <div className="flex gap-4 mb-8">
        {isActive ? (
          <button className="btn btn-warning" onClick={handlePause}>Pause</button>
        ) : (
          <button className="btn btn-success" onClick={handleStart}>Start</button>
        )}
        <button className="btn btn-error" onClick={handleReset}>Reset</button>
      </div>

      {/* Customize Timer */}
      <div className="flex gap-4">
        <div>
          <label htmlFor="work-duration" className="block text-sm">Work Time (mins)</label>
          <input
            id="work-duration"
            type="number"
            value={workDuration}
            onChange={handleWorkDurationChange}
            className="input input-bordered w-16"
            min="1"
          />
        </div>
        <div>
          <label htmlFor="break-duration" className="block text-sm">Break Time (mins)</label>
          <input
            id="break-duration"
            type="number"
            value={breakDuration}
            onChange={handleBreakDurationChange}
            className="input input-bordered w-16"
            min="1"
          />
        </div>
      </div>
    </div>
  );
};

export default Timer;