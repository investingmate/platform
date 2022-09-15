import React from "react";

const Header = () => {
  return (
    <div
      className="header-menu align-items-stretch"
      data-kt-drawer="true"
      data-kt-drawer-name="header-menu"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle="#im_header_menu_mobile_toggle"
      data-kt-swapper="true"
      data-kt-swapper-mode="prepend"
      data-kt-swapper-parent="{default: '#im_body', lg: '#im_header_nav'}"
    >
      <div
        className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch"
        id="#im_header_menu"
        data-kt-menu="true"
      ></div>
    </div>
  );
};

export { Header };