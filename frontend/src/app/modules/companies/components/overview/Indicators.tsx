import React from 'react'
import {CustomCard} from "../../../../../components/CustomCard";
import {IndicatorGroup} from "../../core/_models";
import {CompaniesIndicator} from "../CompaniesIndicator";

interface IndicatorProps {
  indicatorsData: IndicatorGroup[]
}
const Indicators = (props: IndicatorProps) => {
  const { indicatorsData } = props
  return (
    <div className='card-body p-0'>
      {indicatorsData && indicatorsData.map(indicator => {
        return (
          <CustomCard key={indicator.name} title={indicator.name}>
            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  {indicator.indicators && indicator.indicators.map(item => {
                    return (
                      <CompaniesIndicator
                        description={item.description ? item.description : ''}
                        label={item.name}
                        value={item.amount}
                      >
                        <div
                          role="button"
                          onClick={()=>{}}
                          className="min-w-55px d-flex align-items-center justify-content-end"
                        >
                          <div
                            className="btn btn-icon btn-light-primary btn-custom"
                          >
                            <i className="fas fa-regular fa-chart-line fs-2"></i>
                          </div>
                        </div>
                      </CompaniesIndicator>
                    )
                  })}
                </div>
              </div>
            </div>
          </CustomCard>
        )
      })}
    </div>
  )
}

export {Indicators}
