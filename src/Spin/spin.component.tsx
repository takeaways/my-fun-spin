import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from "react";
import clsx from "clsx";

import styles from "./spin.module.css";
import { randomColor } from "./spin.helper";
import { HandlerRef, Option } from "./spin.types";

type Props<Item> = {
  size: number;
  speed?: number;
  items?: Item[];
  time?: number;
  options?: Option;
};

function Spin<Item>(
  {
    size,
    items = [],
    speed = 5,
    time = 15000,
    options = { mode: "auto" },
  }: Props<Item>,
  ref: React.Ref<HandlerRef> | undefined
) {
  const { mode = "auto" } = options;

  const [spin, setSpin] = useState(false);
  const frameId = useRef(0);
  const timerId = useRef<NodeJS.Timeout>();
  const cleanTime = useRef<() => void>();
  const cleanTimeDown = useRef<() => void>();

  const startSpin = () => {
    setSpin(true);
  };
  const stopSpin = () => {
    setSpin(false);
  };

  const spinRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    startSpin,
    stopSpin,
  }));

  useEffect(() => {
    let acc = speed;
    let i = speed;
    const spinFrameHandler = (rotateSpeed: number) => {
      spinRef.current!.style.transform = `rotate(${rotateSpeed}deg)`;
      i += acc;

      frameId.current = requestAnimationFrame(() => spinFrameHandler(i));
    };

    if (spinRef.current) {
      if (spin) {
        requestAnimationFrame(() => spinFrameHandler(speed));
        cleanTime.current = speedUpControl();
        cleanTimeDown.current = speedDownControl();
        timerId.current = setTimeout(() => {
          setSpin(false);
        }, time);
      } else {
        cleanTime.current?.();
        cleanTimeDown.current?.();
      }
    }

    return () => {
      i = speed;
      clearTimeout(timerId.current!);
      cancelAnimationFrame(frameId.current);
    };

    function speedUpControl() {
      let t1 = setTimeout(() => {
        acc = speed * Math.random() * 5;
      }, time * 0.1);
      let t2 = setTimeout(() => {
        acc = speed;
      }, time * 0.3);
      let t3 = setTimeout(() => {
        acc = 2.2;
      }, time * 0.4);
      let t4 = setTimeout(() => {
        acc = 1.5;
      }, time * 0.45);
      let t5 = setTimeout(() => {
        acc = 1.2;
      }, time * 0.46);
      let t6 = setTimeout(() => {
        acc = 1;
      }, time * 0.47);
      let t7 = setTimeout(() => {
        acc = 0.5;
      }, time * 0.48);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
        clearTimeout(t6);
        clearTimeout(t7);
      };
    }
    function speedDownControl() {
      console.log("--");
      let t1 = setTimeout(() => {
        acc = -0.4;
      }, time * 0.5);
      let t2 = setTimeout(() => {
        acc = 0.2;
      }, time * 0.6);
      let t3 = setTimeout(() => {
        acc = -0.1;
      }, time * 0.7);
      let t4 = setTimeout(() => {
        acc = 0.1;
      }, time * 0.8);
      let t5 = setTimeout(() => {
        acc = 0.05;
      }, time * 0.9);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }
  }, [spin]);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        margin: "auto",
      }}
    >
      <div ref={spinRef} className={clsx([styles.container])}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={styles.box}
            style={{
              transform: `rotate(${(360 / items.length) * idx}deg) `,
              clip: `rect(0px, ${size}px, ${size}px, ${size / 2}px)`,
            }}
          >
            <div
              style={{
                transform: `rotate(${360 / items.length / 2}deg)`,
              }}
              className={styles.content}
            >
              {item}
            </div>
            <div
              className={styles.item}
              style={{
                backgroundColor: randomColor(),
                transform: `rotate(${360 / items.length}deg)`,
                clip: `rect(0px, ${size / 2}px, ${size}px, 0px)`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default forwardRef<HandlerRef, Props<number>>(Spin);
