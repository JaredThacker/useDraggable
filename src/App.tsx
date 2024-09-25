import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isClicked = useRef<Boolean>(false);

  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = (event: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = event.clientX;
      coords.current.startY = event.clientY;
    };

    const onMouseUp = (event: MouseEvent) => {
      isClicked.current = true;
      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetTop;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX =
        event.clientX - coords.current.startX + coords.current.lastX;
      const nextY =
        event.clientY - coords.current.startY + coords.current.lastY;
      box.style.left = `${nextX}px`;
      box.style.top = `${nextY}px`;
    };

    box.addEventListener("mousedown", onMouseDown);
    box.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      box.removeEventListener("mousedown", onMouseDown);
      box.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
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
