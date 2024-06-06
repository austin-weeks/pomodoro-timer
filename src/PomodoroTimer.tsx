import { ArrowFatDown, ArrowFatUp, ArrowsCounterClockwise, Pause, Play } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

interface SettingsProps {
    time: number;
    title: string;
    onclick: (inc: boolean) => void;
}

//Timer Settings Modules, one each for work timer and break timer
function Settings({ time, title, onclick }: SettingsProps) {
    return (
        <div id="session-settings">
            <div className="settings-title">{title}</div>
            <div className="settings-time">{time}:00</div>
            <div className="settings-btns">
                <div>
                    <ArrowFatDown onClick={() => onclick(false)} className="button" weight="bold" />
                </div>
                <div>
                    <ArrowFatUp onClick={() => onclick(true)} className="button" weight="bold" />
                </div>
            </div>
        </div>
    );
}

interface ControlsProps {
    isCounting: boolean
    resetTimer: () => void
    toggleTimer: () => void
}

//Module for starting, stopping, and resetting the timer
function Controls({ isCounting, resetTimer, toggleTimer }: ControlsProps) {
    return (
        <div id="timer-controls">
            <div onClick={toggleTimer}>
                {isCounting ? <Pause className="button button-big" weight="bold" /> : <Play className="button button-big" weight="bold" />}
            </div>
            <div>
                <ArrowsCounterClockwise onClick={resetTimer} className="button button-big" weight="bold" />
            </div>
        </div>
    );
}

function PomodoroTimer() {
    const WORK_DUR = "workDur";
    const BREAK_DUR = "breakDur";
    const WORKING = "working";
    const MINS_LEFT = "minsLeft";
    const SECS_LEFT = "secsLeft";
    function loadWorkDur() {
        const dur = localStorage.getItem(WORK_DUR);
        return dur ? parseInt(dur) : 25;
    }
    function setWorkDur(duration: number) {
        setWorkDurState(duration);
        localStorage.setItem(WORK_DUR, duration.toString());
    }
    function loadBreakDur() {
        const dur = localStorage.getItem(BREAK_DUR);
        return dur ? parseInt(dur) : 5;
    }
    function setBreakDur(duration: number) {
        setBreakDurState(duration);
        localStorage.setItem(BREAK_DUR, duration.toString());
    }
    function loadWorking() {
        const working = localStorage.getItem(WORKING);
        return working ? working === "true" : true;
    }
    function setWorking(working:boolean) {
        setWorkingState(working);
        localStorage.setItem(WORKING, working.toString());
    }
    function loadMinsLeft(){
        const mins = localStorage.getItem(MINS_LEFT);
        return mins ? parseInt(mins) : loadWorkDur();
    }
    function setMinsLeft(minsLeft: number) {
        setMinsLeftState(minsLeft);
        localStorage.setItem(MINS_LEFT, minsLeft.toString());
    }
    function loadSecsLeft() {
        const sec = localStorage.getItem(SECS_LEFT);
        return sec ? parseInt(sec) : 0;
    }
    function setSecsLeft(secsLeft: number) {
        setSecsLeftState(secsLeft);
        localStorage.setItem(SECS_LEFT, secsLeft.toString());
    }

    const [workDur, setWorkDurState] = useState(loadWorkDur());
    const [breakDur, setBreakDurState] = useState(loadBreakDur());
    const [working, setWorkingState] = useState(loadWorking());
    const [isCounting, setIsCounting] = useState(false);
    const [minsLeft, setMinsLeftState] = useState(loadMinsLeft());
    const [secsLeft, setSecsLeftState] = useState(loadSecsLeft());

    useEffect(() => {
        let timer = setTimeout(() => {
            if (!isCounting) return;

            if (secsLeft < 1) {
                if (minsLeft === 0) swapTimer();
                else {
                    setSecsLeft(59);
                    setMinsLeft(minsLeft - 1);
                }
            } else {
                setSecsLeft(secsLeft - 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    });

    function swapTimer() {
        setMinsLeft(working ? breakDur : workDur);
        setWorking(!working);
        const beep = new Audio("Beep.mp3");
        beep.play();
    }

    const updateTimerSettings = (increment: boolean, isWorkTimer: boolean) => {
        function getDuration(duration: number) {
            if (duration < 1) duration = 1;
            if (duration > 60) duration = 60;
            return duration;
        }
        if (isWorkTimer) {
            const workDuration = getDuration(increment ? workDur + 1 : workDur - 1);
            setWorkDur(workDuration);
            if (!isCounting && working) {
                setMinsLeft(workDuration);
                setSecsLeft(0);
            }
        } else {
            const breakDuration = getDuration(increment ? breakDur + 1 : breakDur - 1);
            setBreakDur(breakDuration);
            if (!isCounting && !working) {
                setMinsLeft(breakDuration);
                setSecsLeft(0);
            }
        }
    }

    const resetTimer = () => {
        setMinsLeft(workDur);
        setSecsLeft(0);
        setIsCounting(false);
        setWorking(true);
    }
    
    const onSettingsClick = (isWorkTimer: boolean) => {
        return (increment: boolean) => {
            updateTimerSettings(increment, isWorkTimer);
        }
    }

    const toggleTimer = () => {
        setIsCounting(!isCounting);
    }

    return (
        <div id="timer">
            <div id="timer-settings">
                <Settings onclick={onSettingsClick(true)} time={workDur} title="Work Time" />
                <Settings onclick={onSettingsClick(false)} time={breakDur} title="Break Time" />
            </div>
            <div id="timer-container">
                <div id="time-display">
                    <div>{working ? "Working" : "Break"}</div>
                    <div>{minsLeft}:{secsLeft < 10 ? "0" + secsLeft : secsLeft}</div>
                </div>
                <Controls toggleTimer={toggleTimer} resetTimer={resetTimer} isCounting={isCounting} />
            </div>
        </div>
    );
}

export default PomodoroTimer;