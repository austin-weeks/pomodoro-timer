import { ArrowFatDown, ArrowFatUp, ArrowsCounterClockwise, Pause, Play } from "@phosphor-icons/react";
import { useState } from "react";

interface SettingsProps {
    time: number;
    title: string;
}
function Settings({ time, title }: SettingsProps) {
    return (
        <div id="session-settings">
            <div className="settings-title">{title}</div>
            <div className="settings-time">{time}:00</div>
            <div className="settings-btns">
                <div>
                    <ArrowFatDown className="button" weight="bold" />
                </div>
                <div>
                    <ArrowFatUp className="button" weight="bold" />
                </div>
            </div>
        </div>
    );
}

interface ControlsProps {
    isCounting: boolean
}
function Controls({ isCounting }: ControlsProps) {
    return (
        <div id="timer-controls">
            <div>
                {isCounting ? <Pause className="button button-big" weight="bold" /> : <Play className="button button-big" weight="bold" />}
            </div>
            <div>
                <ArrowsCounterClockwise className="button button-big" weight="bold" />
            </div>
        </div>
    );
}

function PomodoroTimer() {
    const startingState = {
        workDuration: 25,
        breakDuration: 5,
        isCounting: false,
        timeLeft: 25,
        isWorking: true
    };
    const [state, setState] = useState(startingState);

    return (
        <div id="timer">
            <div id="timer-settings">
                <Settings time={state.workDuration} title="Work Time" />
                <Settings time={state.breakDuration} title="Break Time" />
            </div>
            <div id="timer-container">
                <div id="time-display">
                    <div>{state.isWorking ? "Working" : "Break"}</div>
                    <div>{state.timeLeft.toString()}:00</div>
                </div>
                <Controls isCounting={state.isCounting} />
            </div>
        </div>
    );
}

export default PomodoroTimer;