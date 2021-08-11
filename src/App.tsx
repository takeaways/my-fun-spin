import React, { useMemo, useRef } from "react";

import Spin from "./Spin/spin.component";
import { HandlerRef } from "./Spin/spin.types";
function App() {
  const spinHandler = useRef<HandlerRef>(null);

  const handleStartSpin = () => {
    spinHandler.current?.startSpin();
  };

  const handleStopSpin = () => {
    spinHandler.current?.stopSpin();
  };

  const exampleItems = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((_, i) => i),
    []
  );

  return (
    <>
      <Spin ref={spinHandler} size={300} items={exampleItems} speed={10} />
      <button onClick={handleStartSpin}>Start</button>
      <button onClick={handleStopSpin}>Stop</button>
    </>
  );
}

export default App;
