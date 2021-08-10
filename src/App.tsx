import React, { useMemo, useRef } from "react";

import Spin from "./Spin/spin.component";
function App() {
  const spinHandler = useRef<{
    startSpin: () => void;
    stopSpin: () => void;
  }>();

  const handleStartSpin = () => {
    spinHandler.current?.startSpin();
  };

  const handleStopSpin = () => {
    spinHandler.current?.stopSpin();
  };

  const exampleItems = useMemo(
    () =>
      Array(4)
        .fill(0)
        .map((_, i) => i),
    []
  );

  return (
    <>
      <Spin ref={spinHandler} size={300} items={exampleItems} speed={1000} />
      <button onClick={handleStartSpin}>Start</button>
      <button onClick={handleStopSpin}>Stop</button>
    </>
  );
}

export default App;
