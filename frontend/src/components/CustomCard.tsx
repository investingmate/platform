import React from 'react'

interface Props {
  children: React.ReactNode,
  title: string
}

const CustomCard = (props: Props) => {
  const { title, children } = props;
  return (
    <div className='card mt-0'>
      <div
        className='card-header border-0 cursor-pointer'
      >
        <div className='card-title m-0'>
          <h6 className='fw-bolder m-0'>
            {title}
          </h6>
        </div>
      </div>
      <div>
        <div className='card-body border-top p-9'>
          {children}
        </div>
      </div>
    </div>
  )
}

export {CustomCard}
