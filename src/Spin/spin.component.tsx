import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from "react";
import clsx from "clsx";

import styles from "./spin.module.css";

type Props<Item> = {
  size: number;
  speed?: number;
  items?: Item[];
};

function Spin<Item>(
  { size, items = [], speed = 5 }: Props<Item>,
  ref: React.Ref<unknown> | undefined
) {
  const [spin, setSpin] = useState(false);
  const frameId = useRef(0);

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
    let i = speed;

    const spinFrameHandler = (rotateSpeed: number) => {
      spinRef.current!.style.transform = `rotate(${rotateSpeed}deg)`;
      i += speed;
      // if (i >= 100 && i < 300) {
      //   i += 20;
      // } else if (i >= 300 && i < 400) {
      //   i += 30;
      // } else if (i >= 400 && i < 700) {
      //   i += 2;
      // } else if (i >= 700) {
      //   i += 1;
      // }
      frameId.current = requestAnimationFrame(() => spinFrameHandler(i));
    };

    if (spinRef.current) {
      if (spin) {
        requestAnimationFrame(() => spinFrameHandler(speed));
        setTimeout(() => {
          cancelAnimationFrame(frameId.current);
          setSpin(false);
        }, 7000);
      }
    }

    return () => {
      cancelAnimationFrame(frameId.current);
    };
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

export default forwardRef(Spin);

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;
