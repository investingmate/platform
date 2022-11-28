/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {BarChartsWidget} from "../../../../../_investingmate/partials/widges/charts/BarChartsWidget";
import {LineChartsWidget} from "../../../../../_investingmate/partials/widges/charts/LineChartsWidget";
import {CompaniesIndicator} from "../CompaniesIndicator";

interface Props {
}

const indicators = [{
  id: 1,
  label: 'Min',
  description: 'Here we can display a desc.',
  value: 0.121
},{
  id: 2,
  label: 'Max',
  description: 'Here we can display a desc.',
  value: 0.124
},{
  id: 3,
  label: 'Average',
  description: 'Here we can display a desc.',
  value: 0.122
},{
  id: 4,
  label: 'Current',
  description: 'Here we can display a desc.',
  value: 0.123
}];

const CompaniesCharts = (props: Props) => {
  const [isLineGraphEnabled, setIsLineGraphEnabled] = useState(false);

  return (
    <div className=''>
      <div className='card'>
        {/* begin::Header */}
        <div className='card-header border-bottom-0 pt-5'>
          <div className='card-title align-items-start flex-row'>
            <div
              className={
                !isLineGraphEnabled ?
                  "btn btn-icon btn-light-primary btn-active-primary active btn-custom ms-2" :
                  "btn btn-icon btn-light-primary btn-custom ms-2"
              }
              onClick={()=>setIsLineGraphEnabled(!isLineGraphEnabled)}
            >
              <i className="fas fa-regular fa-chart-column fs-2"></i>
            </div>
            <div
              className={
                isLineGraphEnabled ?
                  "btn btn-icon btn-light-primary btn-active-primary active btn-custom ms-2" :
                  "btn btn-icon btn-light-primary btn-custom ms-2"
              }
              onClick={()=>setIsLineGraphEnabled(!isLineGraphEnabled)}
            >
              <i className="fas fa-regular fa-chart-line fs-2"></i>
            </div>
          </div>

          {/* begin::Toolbar */}
          <div className='card-toolbar' data-im-buttons='true'>
            {indicators.map(item => {
              return  (
                <CompaniesIndicator
                  description={item.description}
                  value={item.value}
                  label={item.label}
                  key={item.id}
                />
              )
            })}
          </div>
          {/* end::Toolbar */}
        </div>
        {/* end::Header */}
      </div>
      <div className="modal-body">
        {isLineGraphEnabled ? <LineChartsWidget/> : <BarChartsWidget/>}
      </div>
    </div>
  )
}

export {CompaniesCharts}
