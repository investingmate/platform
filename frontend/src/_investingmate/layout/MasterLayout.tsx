import {Outlet} from 'react-router-dom'
import {Footer} from './components/Footer'
import {AsideDefault} from './components/aside/AsideDefault'
import {HeaderWrapper} from './components/header/HeaderWrapper'
import {Content} from './components/Content'

const MasterLayout = () => {
  return (
    <div className='page d-flex flex-row flex-column-fluid'>
      <AsideDefault />
      <div className='wrapper d-flex flex-column flex-row-fluid' id='im_wrapper'>
        <HeaderWrapper />

        <div id='im_content' className='content d-flex flex-column flex-column-fluid'>
          {/* <Toolbar /> */}
          <div className='post d-flex flex-column-fluid' id='im_post'>
            <Content>
              <Outlet />
            </Content>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export {MasterLayout}
