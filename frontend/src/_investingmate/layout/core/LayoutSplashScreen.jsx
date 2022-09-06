import { createContext, useContext, useEffect } from "react";

const LayoutSplashScreenContext = createContext(undefined);

const LayoutSplashScreen = ({ visible = true }) => {
  const setCount = useContext(LayoutSplashScreenContext);

  useEffect(() => {
    if (!visible) {
      return;
    }

    if (setCount) {
      setCount((prev) => {
        return prev + 1;
      });
    }

    return () => {
      if (setCount) {
        setCount((prev) => {
          return prev - 1;
        });
      }
    };
  }, [setCount, visible]);

  return null;
};

export { LayoutSplashScreen };
