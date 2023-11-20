import { useEffect, useRef, useState } from "react";

export interface WindowSize {
  height: number;
  width: number;
}

/**
 * Listens to window resize event and returns window height and width values.
 * @returns window height and width values.
 */
export const useWindowResize = (): WindowSize => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize());

  useEffect(() => {
    /**
     * Resize event fired; window size recalculated.
     */
    const onResize = (): void => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setWindowSize(getWindowSize());
      }, 200);
    };
    // Add resize event listener.
    window.addEventListener("resize", onResize);
    return () => {
      // Remove resize event listener.
      window.removeEventListener("resize", onResize);
      // Clear timeout.
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return windowSize;
};

/**
 * Returns window height and width.
 * @returns window height and width.
 */
function getWindowSize(): WindowSize {
  const { innerHeight, innerWidth } = window;
  return { height: innerHeight, width: innerWidth };
}
