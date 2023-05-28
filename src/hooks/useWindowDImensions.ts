import { useState, useEffect } from "react";

interface IDimension {
  width: number;
  height: number;
}
const getWindowDimensions = (window: Window): IDimension => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useWindowDimensions = () => {
  const MEDIUM_SCREEN_SIZE = 745;
  const LARGE_SCREEN_SIZE = 1024;
  const XLARGE_SCREEN_SIZE = 1440;

  const [windowDimensions, setWindowDimensions] = useState<IDimension>({
    width: 0,
    height: 0,
  });

  // To solve inconsistency of mobile viewheight
  const [viewHeight, setViewHeight] = useState<number>(0);

  useEffect(() => {
    setWindowDimensions(getWindowDimensions(window));
    function handleResize() {
      setWindowDimensions(getWindowDimensions(window));
    }

    setViewHeight(window.innerHeight * 0.01);

    window.addEventListener(`resize`, handleResize);
    return () => window.removeEventListener(`resize`, handleResize);
  }, []);

  return {
    windowDimensions,
    MEDIUM_SCREEN_SIZE,
    LARGE_SCREEN_SIZE,
    XLARGE_SCREEN_SIZE,
    viewHeight,
  };
};

export default useWindowDimensions;
