import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AsideDefault } from './components/aside/AsideDefault';
import { Footer } from './components/Footer';
import { HeaderWrapper } from './components/header/HeaderWrapper';
import { ScrollTop } from './components/ScrollTop';
import { Content } from './components/Content';
import { useLocation } from 'react-router-dom';
import { MenuComponent } from '../assets/ts/components';
import { PageDataProvider } from './core/PageData';
import { ThemeModeProvider } from '../partials/layout/theme-mode/ThemeModeProvider';

const MasterLayout = () => {
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 500);
  }, [location.key]);

  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <div className='page d-flex flex-row flex-column-fluid'>
          <AsideDefault />
          <div className='wrapper d-flex flex-column flex-row-fluid' id='im_wrapper'>
            <HeaderWrapper />

            <div id='im_content' className='content d-flex flex-column flex-column-fluid'>
              <div className='post d-flex flex-column-fluid' id='im_post'>
                <Content>
                  <Outlet />
                </Content>
              </div>
            </div>
            <Footer />
          </div>
        </div>

        {/* begin:: Drawers */}
        {/* end:: Drawers */}

        {/* begin:: Modals */}
        {/* end:: Modals */}
        <ScrollTop />
      </ThemeModeProvider>
    </PageDataProvider>
  );
};

export { MasterLayout };
