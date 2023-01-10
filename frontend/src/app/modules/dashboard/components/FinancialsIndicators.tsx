import React from 'react';
import {EconomicMarketOverview} from "./EconomicMarketOverview";
// import { CustomCarousel } from '../../../../components/Carousel';
// import { CompaniesIndicator } from '../../companies/components/CompaniesIndicator';

// const items = [
//   {
//     id: 1,
//     item: <CompaniesIndicator description='test 1' label='test 1' value={1.0} showGraph={false} />,
//   },
// ];

const FinancialsIndicators = () => {
  return (
    <div className='mt-0 mb-3'>
      <div className='row g-5'>
        <div className='col-lg-4'>
          <div className='card card-custom card-stretch mb-5'>
            {/*<div className='card-header'>*/}
            {/*  <h5 className='card-title fw-bolder'>Widget Title</h5>*/}
            {/*</div>*/}
            {/*<div className='card-body'>Lorem Ipsum is simply dummy text</div>*/}
            {/*<div className='card-body d-flex justify-content-center align-items-center w-100'>*/}
            {/*<CustomCarousel variant='dark' items={items} />*/}
            {/*</div>*/}
            <EconomicMarketOverview className='card' color='primary' />
          </div>
        </div>

        <div className='col-lg-4'>
          <div className='card card-custom card-stretch-50 mb-5'>
            <div className='card-header'>
              <h5 className='card-title fw-bolder'>Widget Title</h5>
            </div>
            <div className='card-body'>Lorem Ipsum is simply dummy text</div>
          </div>

          <div className='card card-custom card-stretch-50  mb-5'>
            <div className='card-header'>
              <h5 className='card-title fw-bolder'>Widget Title</h5>
            </div>
            <div className='card-body'>Lorem Ipsum is simply dummy text</div>
          </div>
        </div>

        <div className='col-lg-4'>
          <div className='card card-custom card-stretch-33  mb-5'>
            <div className='card-header'>
              <h5 className='card-title fw-bolder'>Widget Title</h5>
            </div>
            <div className='card-body'>Lorem Ipsum is simply dummy text</div>
          </div>

          <div className='card card-custom card-stretch-33  mb-5'>
            <div className='card-header'>
              <h5 className='card-title fw-bolder'>Widget Title</h5>
            </div>
            <div className='card-body'>Lorem Ipsum is simply dummy text</div>
          </div>

          <div className='card card-custom card-stretch-33 mb-5'>
            <div className='card-header'>
              <h5 className='card-title fw-bolder'>Widget Title</h5>
            </div>
            <div className='card-body'>Lorem Ipsum is simply dummy text</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FinancialsIndicators };
