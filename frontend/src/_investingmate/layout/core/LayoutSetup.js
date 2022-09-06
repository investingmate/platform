import { DefaultLayoutConfig } from "./DefaultLayoutConfig";

export function getLayout() {
  return DefaultLayoutConfig;
}

function setLayout(config) {}

export function getEmptyCssClasses() {
  return {
    header: [],
    headerContainer: [],
    headerMobile: [],
    headerMenu: [],
    aside: [],
    asideMenu: [],
    asideToggle: [],
    toolbar: [],
    toolbarContainer: [],
    content: [],
    contentContainer: [],
    footerContainer: [],
    sidebar: [],
    pageTitle: [],
  };
}

export function getEmptyHTMLAttributes() {
  return {
    asideMenu: new Map(),
    headerMobile: new Map(),
    headerMenu: new Map(),
    headerContainer: new Map(),
    pageTitle: new Map(),
  };
}

export function getEmptyCSSVariables() {
  return {
    body: new Map(),
  };
}

export class LayoutSetup {
  static isLoaded = false;
  static config = getLayout();
  static classes = getEmptyCssClasses();
  static attributes = getEmptyHTMLAttributes();
  static cssVariables = getEmptyCSSVariables();

  static initCSSClasses() {
    LayoutSetup.classes = getEmptyCssClasses();
  }

  static initHTMLAttributes() {
    LayoutSetup.attributes = Object.assign({}, getEmptyHTMLAttributes());
  }

  static initCSSVariables() {
    LayoutSetup.cssVariables = getEmptyCSSVariables();
  }

  static initLayout(config) {
    Array.from(document.body.attributes).forEach((attr) => {
      document.body.removeAttribute(attr.name);
    });
    document.body.setAttribute("style", "");
    document.body.setAttribute("id", "kt_body");
    if (config.main?.body?.backgroundImage) {
      document.body.style.backgroundImage = `url('${config.main.body.backgroundImage}')`;
    }

    if (config.main?.body?.class) {
      document.body.classList.add(config.main.body.class);
    }
  }

  static initHeader(config) {
    LayoutSetup.classes.headerContainer.push(
      config.width === "fluid" ? "container-fluid" : "container"
    );

    if (config.fixed.desktop) {
      document.body.classList.add("header-fixed");
    }

    if (config.fixed.tabletAndMobile) {
      document.body.classList.add("header-tablet-and-mobile-fixed");
    }
  }

  static initToolbar(config) {
    if (!config.display) {
      return;
    }

    document.body.classList.add("toolbar-enabled");
    LayoutSetup.classes.toolbarContainer.push(
      config.width === "fluid" ? "container-fluid" : "container"
    );

    if (config.fixed.desktop) {
      document.body.classList.add("toolbar-fixed");
    }

    if (config.fixed.tabletAndMobileMode) {
      document.body.classList.add("toolbar-tablet-and-mobile-fixed");
    }

    // Height setup
    const type = config.layout;
    const typeOptions = config.layouts[type];
    if (typeOptions) {
      let bodyStyles = "";
      if (typeOptions.height) {
        bodyStyles += ` --im-toolbar-height: ${typeOptions.height};`;
      }

      if (typeOptions.heightAndTabletMobileMode) {
        bodyStyles += ` --im-toolbar-height-tablet-and-mobile: ${typeOptions.heightAndTabletMobileMode};`;
      }
      document.body.setAttribute("style", bodyStyles);
    }
  }

  static initPageTitle(config) {
    if (!config.display) {
      return;
    }

    if (config.direction === "column") {
      this.classes.pageTitle.push("flex-column");
      this.classes.pageTitle.push("align-items-start");
    } else {
      this.classes.pageTitle.push("align-items-center");
      this.classes.pageTitle.push("flex-wrap");
    }
    this.classes.pageTitle.push("me-3");

    if (config.responsive) {
      this.classes.pageTitle.push("mb-5");
      this.classes.pageTitle.push("mb-lg-0");

      LayoutSetup.attributes.pageTitle.set("data-kt-swapper", true);
      LayoutSetup.attributes.pageTitle.set("data-kt-swapper-mode", "prepend");
      LayoutSetup.attributes.pageTitle.set(
        "data-kt-swapper-parent",
        `{ default: '#kt_content_container', '${config.responsiveBreakpoint}': '${config.responsiveTarget}'}`
      );
    }
  }

  static initContent(config) {
    LayoutSetup.classes.contentContainer.push(
      config.width === "fluid" ? "container-fluid" : "container"
    );
    // if (Theme::getOption('layout', 'content/container-class')) {
    // 	Theme::addHtmlClass('content-container', Theme::getOption('layout', 'content/container-class'));
    // }
  }

  static initAside(config) {
    // Check if aside is displayed
    if (!config.display) {
      return;
    }

    // Enable Aside
    document.body.classList.add("aside-enabled");
    LayoutSetup.classes.aside.push(`aside-${config.theme}`);

    // Fixed Aside
    if (config.fixed) {
      document.body.classList.add("aside-fixed");
    }

    // Default minimized
    if (config.minimized) {
      document.body.setAttribute("data-kt-aside-minimize", "on");
    }

    // Hoverable on minimize
    if (config.hoverable) {
      LayoutSetup.classes.aside.push("aside-hoverable");
    }
  }

  static initAsideMenu(config) {}

  static initFooter(config) {
    LayoutSetup.classes.footerContainer.push(
      `container${config.width === "fluid" ? "-fluid" : ""}`
    );
  }

  static initConfig(config) {
    if (config.main?.darkSkinEnabled) {
      document.body.classList.add("dark-skin");
    }

    // Init layout
    LayoutSetup.initLayout(config);
    if (config.main?.type !== "default") {
      return;
    }

    LayoutSetup.initHeader(config.header);
    LayoutSetup.initPageTitle(config.pageTitle);
    LayoutSetup.initToolbar(config.toolbar);
    LayoutSetup.initContent(config.content);
    LayoutSetup.initAside(config.aside);
    LayoutSetup.initFooter(config.footer);
    LayoutSetup.initAsideMenu(config.aside);
  }

  static updatePartialConfig(fieldsToUpdate) {
    const config = LayoutSetup.config;
    const updatedConfig = { ...config, ...fieldsToUpdate };
    LayoutSetup.initCSSClasses();
    LayoutSetup.initCSSVariables();
    LayoutSetup.initHTMLAttributes();
    LayoutSetup.isLoaded = false;
    LayoutSetup.config = updatedConfig;
    LayoutSetup.initConfig(Object.assign({}, updatedConfig));
    LayoutSetup.isLoaded = true; // remove loading there
    return updatedConfig;
  }

  static setConfig(config) {
    setLayout(config);
  }

  static bootstrap = (() => {
    LayoutSetup.updatePartialConfig(LayoutSetup.config);
  })();
}
