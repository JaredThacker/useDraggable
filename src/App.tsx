import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isClicked = useRef<Boolean>(false);

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = () => {
      isClicked.current = true;
    };

    const onMouseUp = () => {
      isClicked.current = true;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isClicked.current) return;

      box.style.top = `${event.clientY}px`;
      box.style.left = `${event.clientX}px`;
    };

    box.addEventListener("mousedown", onMouseDown);
    box.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    const cleanup = () => {
      box.removeEventListener("mousedown", onMouseDown);
      box.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };

    return cleanup;
  }, []);
  return (
    <main>
      <div ref={containerRef} className="container">
        <div ref={boxRef} className="box"></div>
      </div>
    </main>
  );
}

export default App;
