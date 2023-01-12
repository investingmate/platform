import React from 'react';
import { EconomicMarketOverview } from './EconomicMarketOverview';
import { CustomCarousel } from '../../../../components/Carousel';
import { IndicesCarousel } from './IndicesCarousel';

const FinancialsIndicators = () => {
  return (
    <div className='mt-0 mb-3'>
      <div className='row g-5'>
        <div className='col-lg-4'>
          <div className='card card-custom card-stretch mb-5'>
            <EconomicMarketOverview className='card' color='primary' />
          </div>
        </div>

        <div className='col-lg-4'>
          <div className='card card-custom card-stretch-50 mb-5'>
            <div className='card-header'>
              <h5 className='card-title fw-bolder'>Indices</h5>
            </div>
            <div className='card-body pe-2 ps-2'>
              <CustomCarousel variant='dark' items={IndicesCarousel} />
            </div>
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
