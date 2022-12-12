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
                        key={item.name}
                        showGraph={true}
                      />
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
