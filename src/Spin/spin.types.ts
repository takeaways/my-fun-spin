export type Mode = "auto" | "select";
export type Option = {
  mode: Mode;
};

export type HandlerRef = {
  startSpin: () => void;
  stopSpin: () => void;
};
