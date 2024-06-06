import './App.css'
import PomodoroTimer from './PomodoroTimer'

function App() {
  return (
    <>
      <div className='heading'>
        <h1>Pomodoro Timer</h1>
        <h2>Get Stuff Done!</h2>
      </div>
        <PomodoroTimer />
      <div style={{ fontSize: "0.8rem", marginTop: ".8em" }}>
        made by <a href="http://austin-weeks.github.io" target="_blank">austin weeks</a>
      </div>
    </>
  )
}

export default App
