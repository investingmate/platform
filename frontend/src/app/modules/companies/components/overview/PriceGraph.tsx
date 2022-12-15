import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { getCurrentCompany } from '../../core/GetCurrentCompany';
import Modal from 'react-bootstrap/Modal';
import TradingViewWidget from 'react-tradingview-widget';

const PriceGraph = () => {
  const [isAdvancedEnabled, setIsAdvancedEnabled] = useState(false);
  const intl = useIntl();
  const location = useLocation();
  const company = getCurrentCompany(location);

  return (
    <div className='card-body p-0'>
      TODO
      <div className='d-flex justify-content-end'>
        <ButtonGroup className='mb-0 btn-group-custom'>
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
      </div>
      <Modal show={isAdvancedEnabled} fullscreen={true} onHide={() => setIsAdvancedEnabled(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            ({company.ticker}) - {company.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TradingViewWidget
            symbol='NASDAQ:AAPL' //`${company.exchange}:${company.ticker}`
            timezone='Australia/Sydney'
            withdateranges
            details
            calendar
            show_popup_button={false}
            popup_width={window.screen.width * 0.9 ?? '1000'}
            popup_height={window.screen.height * 0.8 ?? '650'}
            autosize={true}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export { PriceGraph };
