interface SettingsProps {
    time: number;
}
function Settings({ time }: SettingsProps) {
    return (
        <div id="session-settings">
            <div>{time}:00</div>
            <div>&lt;</div>
            <div>&gt;</div>
        </div>
    );
}

function PomodoroTimer() {
    return (
        <div id="timer">
            <div id="timer-settings">
                <Settings time={25} />
                <Settings time={5} />
            </div>
            <div id="timer-display">
                <div>25:00</div>
            </div>
            <div id="timer-controls">
                <div>&gt;</div>
                <div>||</div>
                <div>?</div>
            </div>
        </div>
    );
}

export default PomodoroTimer;