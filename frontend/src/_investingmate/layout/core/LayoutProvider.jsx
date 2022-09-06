import { createContext, useContext, useState, useEffect } from "react";
import { DefaultLayoutConfig } from "./DefaultLayoutConfig";
import {
  getEmptyCssClasses,
  getEmptyCSSVariables,
  getEmptyHTMLAttributes,
  LayoutSetup,
} from "./LayoutSetup";

const LayoutContext = createContext({
  config: DefaultLayoutConfig,
  classes: getEmptyCssClasses(),
  attributes: getEmptyHTMLAttributes(),
  cssVariables: getEmptyCSSVariables(),
  setLayout: (config) => {},
});

const enableSplashScreen = () => {
  const splashScreen = document.getElementById("splash-screen");
  if (splashScreen) {
    splashScreen.style.setProperty("display", "flex");
  }
};

const disableSplashScreen = () => {
  const splashScreen = document.getElementById("splash-screen");
  if (splashScreen) {
    splashScreen.style.setProperty("display", "none");
  }
};

const LayoutProvider = ({ children }) => {
  const [config, setConfig] = useState(DefaultLayoutConfig);
  const [classes, setClasses] = useState(LayoutSetup.classes);
  const [attributes, setAttributes] = useState(LayoutSetup.attributes);
  const [cssVariables, setCSSVariables] = useState(LayoutSetup.cssVariables);

  const setLayout = (_themeConfig) => {
    enableSplashScreen();
    const bodyClasses = Array.from(document.body.classList);
    bodyClasses.forEach((cl) => document.body.classList.remove(cl));
    LayoutSetup.updatePartialConfig(_themeConfig);
    setConfig(Object.assign({}, LayoutSetup.config));
    setClasses(LayoutSetup.classes);
    setAttributes(LayoutSetup.attributes);
    setCSSVariables(LayoutSetup.cssVariables);
    setTimeout(() => {
      disableSplashScreen();
    }, 500);
  };

  const value = {
    config,
    classes,
    attributes,
    cssVariables,
    setLayout,
  };

  useEffect(() => {
    disableSplashScreen();
  }, []);

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export { LayoutContext, LayoutProvider };

export function useLayout() {
  return useContext(LayoutContext);
}
