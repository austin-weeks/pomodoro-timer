import { ArrowFatDown, ArrowFatUp, Pause, Play } from "@phosphor-icons/react";
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
                    <span className="button"><ArrowFatDown weight="bold" /></span>
                </div>
                <div>
                    <span className="button"><ArrowFatUp weight="bold" /></span>
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
            <div className="button">
                {isCounting ? <Pause className="button" weight="bold" /> : <Play className="button" weight="bold" />}
            </div>
            <div>?</div>
        </div>
    );
}

function PomodoroTimer() {
    const startingState = {
        workDuration: 25,
        breakDuration: 5,
        isCounting: false
    };
    const [state, setState] = useState(startingState);

    return (
        <div id="timer">
            <div id="timer-settings">
                <Settings time={state.workDuration} title="Work Time" />
                <Settings time={state.breakDuration} title="Break Time" />
            </div>
            <div id="timer-display">
                <div>25:00</div>
            </div>
            <Controls isCounting={state.isCounting} />
        </div>
    );
}

export default PomodoroTimer;