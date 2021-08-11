import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  useMemo,
  useCallback,
} from "react";

import "./style.css";
import { randomColor } from "./spin.helper";
import { HandlerRef, Option } from "./spin.types";

type Props<Item> = {
  size: number;
  items?: Item[];
  time?: number;
  selected?: number;
  options?: Option;
  background?: object;
  onFinish?: (selectedIdx: number) => void;
};

function Spin<Item>(
  {
    size,
    items = [],
    time = 15000,
    selected = Math.round(Math.random() * items.length),
    background,
    onFinish,
  }: Props<Item>,
  ref: React.Ref<HandlerRef> | undefined
) {
  const spinRef = useRef<HTMLDivElement>(null);

  const offset = useRef(360 / items.length / 2);
  const rotateDeg = useMemo(() => {
    const pieceDeg = 360 / items.length;
    const start = (selected - 1) * pieceDeg;
    const end = selected * pieceDeg;
    const betweenDeg = start + Math.floor(Math.random() * (end - start));
    const rotate = 360 * Math.floor(3 + Math.random() * 100);
    const total = rotate - betweenDeg + offset.current;
    return total;
  }, []);

  const startSpin = useCallback(() => {
    if (spinRef.current) {
      spinRef.current.style.transition = `transform ${
        time / 1000
      }s ease-in-out`;
      spinRef.current.style.transform = `rotate(${rotateDeg}deg)`;
    }

    setTimeout(() => {
      onFinish && onFinish(selected);
    }, time);
  }, [items]);

  useImperativeHandle(ref, () => ({ startSpin }));

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        margin: "auto",
        userSelect: "none",
        borderRadius: "50%",
      }}
    >
      <div
        ref={spinRef}
        className={"container"}
        style={{
          ...background,
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className={"box"}
            style={{
              clip: `rect(0px, ${size}px, ${size}px, ${size / 2}px)`,
              transform: `rotate(${
                (360 / items.length) * idx - offset.current
              }deg)`,
            }}
          >
            <div
              style={{
                transform: `rotate(${360 / items.length / 2}deg)`,
              }}
              className={"content"}
            >
              {item}
            </div>
            <div
              className={"item"}
              style={{
                backgroundColor: randomColor(),
                // opacity: "0.9",
                clip: `rect(0px, ${size / 2}px, ${size}px, 0px)`,
                transform: `rotate(${360 / items.length}deg)`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const SpinItem: React.FC = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};
export default forwardRef<HandlerRef, Props<any>>(Spin);
