import React, { useEffect, useRef } from "react";

function useDraggable(id: string) {
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
    const target = document.getElementById(id);
    if (!target) throw new Error("Element does not exist");
    const container = target?.parentElement;
    if (!container) throw new Error("No parent element");

    const onMouseDown = (event: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = event.clientX;
      coords.current.startY = event.clientY;
    };

    const onMouseUp = (event: MouseEvent) => {
      isClicked.current = true;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX =
        event.clientX - coords.current.startX + coords.current.lastX;
      const nextY =
        event.clientY - coords.current.startY + coords.current.lastY;
      target.style.left = `${nextX}px`;
      target.style.top = `${nextY}px`;
    };

    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, [id]);
}

export default useDraggable;
