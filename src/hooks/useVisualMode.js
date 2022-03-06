import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace = false) {
    if (newMode !== mode) {
      setMode(newMode);
      replace ? (history[history.length - 1] = newMode) : history.push(newMode);
      setHistory([...history]);
    }
  }
  function back() {
    history.pop()
    setHistory(history)
    setMode(history[history.length - 1])
  }
  return { mode, transition, back };
}
