import React, { FC } from 'react';
import { PageLink, usePageData } from '../../core/PageData';
import { Link } from 'react-router-dom';
import { useLayout } from '../../core';

const Header: FC = () => {
  const { pageTitle, pageDescription, pageBreadcrumbs } = usePageData();
  const { config } = useLayout();
  return (
    <div
      className='header-menu align-items-stretch'
      data-im-drawer='true'
      data-im-drawer-name='header-menu'
      data-im-drawer-activate='{default: true, lg: false}'
      data-im-drawer-overlay='true'
      data-im-drawer-width="{default:'200px', '300px': '250px'}"
      data-im-drawer-direction='end'
      data-im-drawer-toggle='#im_header_menu_mobile_toggle'
      data-im-swapper='true'
      data-im-swapper-mode='prepend'
      data-im-swapper-parent="{default: '#im_body', lg: '#im_header_nav'}"
    >
      <div
        className='menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch'
        id='#im_header_menu'
        data-im-menu='true'
      >
        {/*<MenuInner />*/}
        {/* begin::Title */}
        {pageTitle && (
          <h1 className='d-flex align-items-center text-dark fw-bolder my-1 fs-3'>
            {pageTitle}
            {pageDescription && config.pageTitle && config.pageTitle.description && (
              <>
                <span className='h-20px border-gray-200 border-start ms-3 mx-2'></span>
                <small className='text-muted fs-7 fw-bold my-1 ms-1'>{pageDescription}</small>
              </>
            )}
          </h1>
        )}
        {/* end::Title */}

        {pageBreadcrumbs &&
          pageBreadcrumbs.length > 0 &&
          config.pageTitle &&
          config.pageTitle.breadCrumbs && (
            <>
              {config.pageTitle.direction === 'row' && (
                <span className='h-100 border-gray-200 border-start mx-4' />
              )}
              <ul className='breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1'>
                {Array.from(pageBreadcrumbs).map((item: PageLink, index) => (
                  <li
                    className={`breadcrumb-item ${
                      !item.isSeparator && item.isActive && 'text-dark'
                    } ${!item.isSeparator && !item.isActive && 'text-muted'}`}
                    key={`${item.path}${index}`}
                  >
                    {!item.isSeparator ? (
                      <Link className='text-muted text-hover-primary' to={item.path}>
                        {item.title}
                      </Link>
                    ) : (
                      <span className='bullet bg-gray-200 w-5px h-2px' />
                    )}
                  </li>
                ))}
                <li className='breadcrumb-item text-dark'>{pageTitle}</li>
              </ul>
            </>
          )}
      </div>
    </div>
  );
};

export { Header };
