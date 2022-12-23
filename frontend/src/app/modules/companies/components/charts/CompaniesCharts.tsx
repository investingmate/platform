/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { BarChartsWidget } from '../../../../../_investingmate/partials/widges/charts/BarChartsWidget';
import { LineChartsWidget } from '../../../../../_investingmate/partials/widges/charts/LineChartsWidget';
import { CompaniesIndicator } from '../CompaniesIndicator';
import { useLocation } from 'react-router-dom';
import { getCurrentCompany } from '../../core/GetCurrentCompany';
import { getCompanyIndicatorHistory, getHeadlineHistory } from '../../core/CompanyHelper';
import { Indicator } from '../../core/_models';
import { numberFormatter } from '../../../../../utils/HelperFunctions';

interface Props {
  label: string;
}

const CompaniesCharts = (props: Props) => {
  const { label } = props;
  const location = useLocation();
  const company = getCurrentCompany(location);
  const [isLineGraphEnabled, setIsLineGraphEnabled] = useState(true);
  const [history, setHistory] = useState<Indicator[] | undefined>(
    getCompanyIndicatorHistory(company, label)
  );

  useEffect(() => {
    let historySelected = history;
    // try to get history from headlines
    if (label.includes('Day')) {
      historySelected = company.price_data_history.day;
    } else if (label.includes('3m')) {
      historySelected = company.price_data_history.three_months;
    } else if (label.includes('6m')) {
      historySelected = company.price_data_history.six_months;
    } else if (label.includes('1yr')) {
      historySelected = company.price_data_history.one_year;
    } else if (label.includes('5yrs')) {
      historySelected = company.price_data_history.five_years;
    } else if (label.includes('10yrs')) {
      historySelected = company.price_data_history.ten_years;
    } else if (historySelected && historySelected.length === 0) {
      historySelected = getHeadlineHistory(company, label);
    }
    setHistory(historySelected);
  }, [label]);

  const max =
    history &&
    history.length > 0 &&
    history.reduce((previous, current) => {
      return current.amount > previous.amount ? current : previous;
    });

  const min =
    history &&
    history.length > 0 &&
    history.reduce((previous, current) => {
      return current.amount < previous.amount ? current : previous;
    });

  const avg =
    history &&
    history.length > 0 &&
    history.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);

  const indicators = [
    {
      id: 1,
      label: 'Current',
      description: 'Here we can display a desc.',
      value: history && history.length > 0 ? numberFormatter(history[0].amount) : 0,
    },
    {
      id: 2,
      label: 'Minimum',
      description: 'Here we can display a desc.',
      value: min && min.amount ? numberFormatter(min.amount) : 0.0,
    },
    {
      id: 3,
      label: 'Maximum',
      description: 'Here we can display a desc.',
      value: max && max.amount ? numberFormatter(max.amount) : 0.0,
    },
    {
      id: 4,
      label: 'Average',
      description: 'Here we can display a desc.',
      value: avg ? numberFormatter(avg / (history && history.length ? history.length : 1)) : 0.0,
    },
  ];

  return (
    <div className=''>
      <div className='card'>
        {/* begin::Header */}
        <div className='card-header border-bottom-0 pt-5'>
          <div className='card-title align-items-start flex-row'>
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
      {history && history.length > 0 && label ? (
        <div className='modal-body'>
          {isLineGraphEnabled ? (
            <LineChartsWidget label={label} data={history} />
          ) : (
            <BarChartsWidget label={label} data={history} />
          )}
        </div>
      ) : null}
    </div>
  );
};

export { CompaniesCharts };
