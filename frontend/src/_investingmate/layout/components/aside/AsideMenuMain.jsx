/* eslint-disable react/jsx-no-target-blank */
import React from "react";
// import {useIntl} from 'react-intl'
import { KTSVG } from "../../../helpers";
// import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
import { AsideMenuItem } from "./AsideMenuItem";

export function AsideMenuMain() {
  // const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to="/dashboard"
        icon="/media/icons/duotune/art/art002.svg"
        // title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        title="Dashboard"
        fontIcon="bi-app-indicator"
      />
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Stocks
          </span>
        </div>
      </div>
      <AsideMenuItem
        to="/companies"
        icon="/media/icons/duotune/ecommerce/ecm008.svg"
        // title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        title="Companies"
        fontIcon="bi-app-indicator"
      />
      {/* <AsideMenuItemWithSub
        to="/crafted/widgets"
        title="Widgets"
        icon="/media/icons/duotune/general/gen025.svg"
        fontIcon="bi-layers"
      >
        <AsideMenuItem
          to="/crafted/widgets/lists"
          title="Lists"
          hasBullet={true}
        />
        <AsideMenuItem
          to="/crafted/widgets/statistics"
          title="Statistics"
          hasBullet={true}
        />
        <AsideMenuItem
          to="/crafted/widgets/charts"
          title="Charts"
          hasBullet={true}
        />
        <AsideMenuItem
          to="/crafted/widgets/mixed"
          title="Mixed"
          hasBullet={true}
        />
        <AsideMenuItem
          to="/crafted/widgets/tables"
          title="Tables"
          hasBullet={true}
        />
        <AsideMenuItem
          to="/crafted/widgets/feeds"
          title="Feeds"
          hasBullet={true}
        />
      </AsideMenuItemWithSub> */}
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Settings
          </span>
        </div>
      </div>
      {/* <AsideMenuItemWithSub
        to="/apps/chat"
        title="Chat"
        fontIcon="bi-chat-left"
        icon="/media/icons/duotune/communication/com012.svg"
      >
        <AsideMenuItem
          to="/apps/chat/private-chat"
          title="Private Chat"
          hasBullet={true}
        />
        <AsideMenuItem
          to="/apps/chat/group-chat"
          title="Group Chart"
          hasBullet={true}
        />
        <AsideMenuItem
          to="/apps/chat/drawer-chat"
          title="Drawer Chart"
          hasBullet={true}
        />
      </AsideMenuItemWithSub> */}
      <AsideMenuItem
        to="/apps/user-management/users"
        icon="/media/icons/duotune/communication/com006.svg"
        title="Profile"
        fontIcon="bi-layers"
      />
      <AsideMenuItem
        to="/apps/user-management/users"
        icon="/media/icons/duotune/general/gen051.svg"
        title="User management"
        fontIcon="bi-layers"
      />
      <div className="menu-item">
        <div className="menu-content">
          <div className="separator mx-1 my-4"></div>
        </div>
      </div>
      <div className="menu-item">
        <a
          target="_blank"
          className="menu-link"
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + "/docs/changelog"}
        >
          <span className="menu-icon">
            <KTSVG
              path="/media/icons/duotune/general/gen005.svg"
              className="svg-icon-2"
            />
          </span>
          <span className="menu-title">
            Changelog {process.env.REACT_APP_VERSION}
          </span>
        </a>
      </div>
    </>
  );
}
