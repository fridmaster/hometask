import "./ControlBar.scss";
import { ReactNode } from "react";

function ControlBar({ children }: { children: ReactNode }) {
  return <div className="controlBarWrapper">{children}</div>;
}

export { ControlBar };
