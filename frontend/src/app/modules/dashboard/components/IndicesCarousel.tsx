import React from 'react';
import { toAbsoluteUrl } from '../../../../_investingmate/helpers';

interface IIndicesCarousel {
  index: string;
  code: string;
  amount: number;
}

const IndexItem = (item: IIndicesCarousel) => {
  return (
    <div className='d-flex flex-stack mb-5 border-dashed p-3 pt-6 pb-6'>
      <div className='d-flex align-items-center me-2'>
        <div className='symbol symbol-50px me-3'>
          <div className='symbol-label'>
            <img src={toAbsoluteUrl('/media/asx/asx.png')} alt='logo' className='h-50' />
          </div>
        </div>
        <div>
          <p className='fs-6 text-gray-800 fw-bolder m-0'>{item.index}</p>
          <div className='fs-7 text-muted fw-bold mt-1'>{item.code}</div>
        </div>
      </div>
      <div className='badge badge-white fw-bold py-4 px-3 fs-3'>{item.amount}</div>
    </div>
  );
};

const indices: IIndicesCarousel[] = [
  {
    index: 'ASX 20',
    code: '^XTL',
    amount: 2000,
  },
  {
    index: 'ASX 50',
    code: '^XFL',
    amount: 5000,
  },
  {
    index: 'ASX 100',
    code: '^XTO',
    amount: 1000,
  },
  {
    index: 'ASX 200',
    code: '^XJO',
    amount: 2000,
  },
  {
    index: 'ASX 300',
    code: '^XKO',
    amount: 3000,
  },
];

const IndicesCarousel = indices.map((item, index) => {
  return {
    id: index,
    item: <IndexItem key={item.index} index={item.index} code={item.code} amount={item.amount} />,
  };
});

export { IndicesCarousel };
