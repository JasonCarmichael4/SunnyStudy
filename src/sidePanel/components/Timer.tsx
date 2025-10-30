import React,  { useState, useEffect } from "react";
import '../../styles/styles.css';

const STUDY_TIME = 25 * 60; // 25 min in sec
const BREAK_TIME = 5 * 60;

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const Timer: React.FC = () => {
    const [started, setStarted] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const [timeLeft, setTimeLeft] = useState(STUDY_TIME);

    useEffect(() => {
        if (!started) {
            console.log("Timer stopped");
            return;
        }
  
        const endTime = Date.now() + timeLeft * 1000;

        console.log("Timer started at :", formatTime(timeLeft));

        return;
    }, [started]);


    return (
        <div className="timer-container">
            <p>This is a placeholder for the timer functionality.</p>
            <button type="button"
                className={`btn ${started ? "btn-danger" : "btn-success"}`}
                onClick={() => setStarted(!started)}>
                {started ? "Stop" : "Start"}
            </button>
        </div>
    );
}

export default Timer;