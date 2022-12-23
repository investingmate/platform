import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { getCurrentCompany } from '../../core/GetCurrentCompany';
import Modal from 'react-bootstrap/Modal';
import { CompaniesCharts } from '../charts/CompaniesCharts';
import { customStringfy } from '../../../../../utils/HelperFunctions';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

const graphOptions = [
  {
    id: 1,
    label: 'Day',
    status: true,
  },
  {
    id: 2,
    label: '3m',
    status: false,
  },
  {
    id: 3,
    label: '6m',
    status: false,
  },
  {
    id: 4,
    label: '1yr',
    status: false,
  },
  {
    id: 5,
    label: '5yrs',
    status: false,
  },
  {
    id: 6,
    label: '10yrs',
    status: false,
  },
];

const PriceGraph = () => {
  const [isAdvancedEnabled, setIsAdvancedEnabled] = useState(false);
  const [buttonsOptions, setButtonsOptions] = useState(graphOptions);
  const enabled = buttonsOptions.filter((item) => item.status);
  const intl = useIntl();
  const location = useLocation();
  const company = getCurrentCompany(location);

  const handleButtonEnabled = (btnId: number) => {
    const buttonsUpdate = buttonsOptions.map((btn) => {
      btn.status = btn.id === btnId;
      return btn;
    });
    setButtonsOptions(buttonsUpdate);
  };
  return (
    <div className='card-body p-0'>
      <CompaniesCharts
        label={enabled.length > 0 ? customStringfy(`Price - ${enabled[0].label}`) : ''}
      />
      <div className='d-flex justify-content-end'>
        <ButtonGroup className='mb-0 btn-group-custom me-6'>
          <Button
            className='border border-info min-w-140px'
            variant={isAdvancedEnabled ? 'outline-primary' : 'primary'}
            active={!isAdvancedEnabled}
            onClick={() => setIsAdvancedEnabled(false)}
          >
            <i className='fas fa-chart-line fs-2 me-2' />
            {intl.formatMessage({ id: 'COMPANIES.BASIC' })}
          </Button>
          <Button
            className='border border-info min-w-140px'
            variant={!isAdvancedEnabled ? 'outline-primary' : 'primary'}
            active={isAdvancedEnabled}
            onClick={() => setIsAdvancedEnabled(true)}
          >
            <i className='fas fa-chart-area fs-2 me-2' />
            {intl.formatMessage({ id: 'COMPANIES.ADVANCED' })}
          </Button>
        </ButtonGroup>
        <ButtonGroup className='mb-0 d-flex btn-group-custom-small'>
          {buttonsOptions.map((btn) => {
            return (
              <Button
                key={btn.id}
                className='border border-info p-2'
                variant={!btn.status ? 'outline-primary' : 'primary'}
                active={btn.status}
                onClick={() => handleButtonEnabled(btn.id)}
              >
                {btn.label}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
      <Modal show={isAdvancedEnabled} fullscreen={true} onHide={() => setIsAdvancedEnabled(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            ({company.ticker}) - {company.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdvancedRealTimeChart theme='light' autosize />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export { PriceGraph };
