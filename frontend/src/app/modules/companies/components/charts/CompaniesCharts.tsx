/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { BarChartsWidget } from '../../../../../_investingmate/partials/widges/charts/BarChartsWidget';
import { LineChartsWidget } from '../../../../../_investingmate/partials/widges/charts/LineChartsWidget';
import { CompaniesIndicator } from '../CompaniesIndicator';
import {useLocation} from "react-router-dom";
import {getCurrentCompany} from "../../core/GetCurrentCompany";
import {getCompanyIndicatorHistory, getHeadlineHistory} from "../../core/CompanyHelper";
import {Indicator} from "../../core/_models";

interface Props {
  label: string;
}

const CompaniesCharts = (props: Props) => {
  const { label } = props;
  const location = useLocation();
  const company = getCurrentCompany(location);
  let history: Indicator[] | undefined = getCompanyIndicatorHistory(company, label);

  // try to get history from headlines
  if(history.length === 0){
    history = getHeadlineHistory(company, label);
  }

  const max = history && history.length > 0 && history.reduce((previous, current) => {
    return current.amount > previous.amount ? current : previous;
  });

  const min = history && history.length > 0 && history.reduce((previous, current) => {
    return current.amount < previous.amount ? current : previous;
  });

  const avg = history && history.length > 0 && history.reduce((accumulator, object) => {
    return accumulator + object.amount;
  }, 0);

  const indicators = [
    {
      id: 1,
      label: 'Min',
      description: 'Here we can display a desc.',
      value: min && min.amount ? parseFloat(min.amount.toFixed(2)) : 0.00,
    },
    {
      id: 2,
      label: 'Max',
      description: 'Here we can display a desc.',
      value: max && max.amount ? parseFloat(max.amount.toFixed(2)) : 0.00,
    },
    {
      id: 3,
      label: 'Average',
      description: 'Here we can display a desc.',
      value: avg ? parseFloat((avg/(history && history.length ? history.length : 1)).toFixed(2)) : 0.00,
    },
    {
      id: 4,
      label: 'Current',
      description: 'Here we can display a desc.',
      value: history && history.length > 0 ? history[0].amount : 0,
    },
  ];

  const [isLineGraphEnabled, setIsLineGraphEnabled] = useState(false);

  return (
    <div className=''>
      <div className='card'>
        {/* begin::Header */}
        <div className='card-header border-bottom-0 pt-5'>
          <div className='card-title align-items-start flex-row'>
            <div
              className={
                !isLineGraphEnabled
                  ? 'btn btn-icon btn-light-primary btn-active-primary active btn-custom ms-2'
                  : 'btn btn-icon btn-light-primary btn-custom ms-2'
              }
              onClick={() => setIsLineGraphEnabled(!isLineGraphEnabled)}
            >
              <i className='fas fa-regular fa-chart-column fs-2'></i>
            </div>
            <div
              className={
                isLineGraphEnabled
                  ? 'btn btn-icon btn-light-primary btn-active-primary active btn-custom ms-2'
                  : 'btn btn-icon btn-light-primary btn-custom ms-2'
              }
              onClick={() => setIsLineGraphEnabled(!isLineGraphEnabled)}
            >
              <i className='fas fa-regular fa-chart-line fs-2'></i>
            </div>
          </div>

          {/* begin::Toolbar */}
          <div className='card-toolbar' data-im-buttons='true'>
            {indicators.map((item) => {
              return (
                <CompaniesIndicator
                  description={item.description}
                  value={item.value}
                  label={item.label}
                  key={item.id}
                  showGraph={false}
                />
              );
            })}
          </div>
          {/* end::Toolbar */}
        </div>
        {/* end::Header */}
      </div>
      <div className='modal-body'>
        {isLineGraphEnabled ? (
          <LineChartsWidget label={label} historyData={history ?? []}/>
        ) : (
          <BarChartsWidget label={label} historyData={history ?? []}/>
        )}
      </div>
    </div>
  );
};

export { CompaniesCharts };
