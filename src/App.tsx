import React, { useRef, useState } from "react";

import Spin, { SpinItem } from "./Spin/spin.component";
import { HandlerRef } from "./Spin/spin.types";
import bg from "./roulette.png";
function App() {
  const [howMany, setHowMany] = useState(45);
  const [done, setDone] = useState(false);

  const spinHandlerRef = useRef<HandlerRef>(null);

  const handleStartSpin = () => {
    if (done) {
      window.location.reload();
      return;
    }
    spinHandlerRef.current?.startSpin();
  };

  const handleSpinComplete = (selectedIdx: number) => {
    setDone(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        paddingTop: "45px",
        width: "500px",
        margin: "auto",
        backgroundColor: "#eee",
      }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          clip: "rect(15px, 45px, 45px, -15px)",
          position: "absolute",
          top: 0,
          left: "250px",
          transform: "translateX(-50%)",
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "red",
            transform: "rotate(45deg)",
          }}
        ></div>
      </div>
      <Spin
        ref={spinHandlerRef}
        size={500}
        // selected={5}
        time={10000}
        items={exampleItems(howMany)}
        onFinish={handleSpinComplete}
        background={{
          backgroundImage: `url('${bg}')`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        style={{
          padding: "2rem",
        }}
      >
        <input
          type="range"
          id="slider"
          min="0"
          max="100"
          step="1"
          value={howMany}
          onChange={(e) => {
            setHowMany(Number(e.target.value));
          }}
        />
        <button onClick={handleStartSpin}>
          ( {howMany} ){done ? "again" : "Pick"}
        </button>
      </div>
    </div>
  );
}

const exampleItems = (count: number) =>
  Array(count)
    .fill(0)
    .map((_, i) => (
      <SpinItem key={i}>
        <div
          style={{
            height: "30px",
            width: "30px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            lineHeight: "30px",
          }}
        >
          {i + 1}
        </div>
      </SpinItem>
    ));

export default App;
