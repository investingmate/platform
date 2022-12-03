import React from 'react'

interface Props {
  children: React.ReactNode,
  title: string
}

const CustomCard = (props: Props) => {
  const { title, children } = props;
  return (
    <div className='card'>
      <div
        className='card-header border-0 cursor-pointer'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>
            {title}
          </h3>
        </div>
      </div>
      <div>
        <div className='card-body border-top p-9'>
          <div className='d-flex rounded border-dashed border border-dashed p-6'>
            <div className='d-flex flex-stack flex-grow-1'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {CustomCard}
