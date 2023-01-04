/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { IMSVG, toAbsoluteUrl } from '../../../helpers';
import { useLayout } from '../../core';
import { DefaultTitle } from './page-title/DefaultTitle';
import { Topbar } from './Topbar';
import { Header } from './Header';
import { PathsConstants } from '../../../../utils/PathsConstants';

export function HeaderWrapper() {
  const { config, classes, attributes } = useLayout();
  const { header, aside } = config;

  return (
    <div
      id='im_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch shadow')}
      {...attributes.headerMenu}
    >
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {/* begin::Aside mobile toggle */}
        {aside.display && (
          <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='im_aside_mobile_toggle'
            >
              <IMSVG path='/media/icons/duotune/abstract/abs015.svg' className='svg-icon-2x mt-1' />
            </div>
          </div>
        )}
        {/* end::Aside mobile toggle */}
        {/* begin::Logo */}
        {!aside.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link to={`/${PathsConstants.DASHBOARD}`} className='d-lg-none'>
              <img
                alt='Logo'
                src={toAbsoluteUrl('/media/logos/logo_purple.svg')}
                className='h-30px'
              />
            </Link>
          </div>
        )}
        {/* end::Logo */}

        {aside.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link to='/' className='d-lg-none'>
              <img
                alt='Logo'
                src={toAbsoluteUrl('/media/logos/logo_purple.svg')}
                className='h-30px'
              />
            </Link>
          </div>
        )}

        {/* begin::Wrapper */}
        <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
          {/* begin::Navbar */}
          {header.left === 'menu' && (
            <div className='d-flex align-items-stretch' id='im_header_nav'>
              <Header />
            </div>
          )}

          {header.left === 'page-title' && (
            <div className='d-flex align-items-center' id='im_header_nav'>
              <DefaultTitle />
            </div>
          )}

          <div className='d-flex align-items-stretch flex-shrink-0'>
            <Topbar />
          </div>
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  );
}
