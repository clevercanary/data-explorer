import { useCallback, useEffect, useRef, useState } from "react";

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
  const [windowSize, setWindowSize] = useState<WindowSize>({
    height: 0,
    width: 0,
  });

  const onResize = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const { innerHeight, innerWidth } = window;
      setWindowSize({ height: innerHeight, width: innerWidth });
    }, 500);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return windowSize;
};
