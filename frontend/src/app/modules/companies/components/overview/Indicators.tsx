import React, { useState } from 'react';
import { CustomCard } from '../../../../../components/CustomCard';
import { IndicatorGroup } from '../../core/_models';
import { CompaniesIndicator } from '../CompaniesIndicator';
import { ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useIntl } from 'react-intl';
import { IndicatorsTable } from '../table/IndicatorsTable';

interface IndicatorProps {
  indicatorsData: IndicatorGroup[];
}
const Indicators = (props: IndicatorProps) => {
  const { indicatorsData } = props;
  const [isListEnabled, setIsListEnabled] = useState(false);
  const intl = useIntl();

  return (
    <div className='card-body p-0'>
      <div className='d-flex justify-content-end'>
        <ButtonGroup className='mb-0 btn-group-custom'>
          <Button
            className='border border-info min-w-140px'
            variant={isListEnabled ? 'outline-primary' : 'primary'}
            active={!isListEnabled}
            onClick={() => setIsListEnabled(false)}
          >
            <i className='bi bi-grid fs-2 me-2' />
            {intl.formatMessage({ id: 'COMPANIES.CURRENT' })}
          </Button>
          <Button
            className='border border-info min-w-140px'
            variant={!isListEnabled ? 'outline-primary' : 'primary'}
            active={isListEnabled}
            onClick={() => setIsListEnabled(true)}
          >
            <i className='bi bi-list-ul fs-2 me-2' />
            {intl.formatMessage({ id: 'COMPANIES.HISTORY' })}
          </Button>
        </ButtonGroup>
      </div>
      {!isListEnabled &&
        indicatorsData &&
        indicatorsData.map((indicator) => {
          return (
            <CustomCard key={indicator.name} title={indicator.name}>
              <div className='d-flex flex-wrap flex-stack'>
                <div className='d-flex flex-column pe-8'>
                  <div className='d-flex flex-wrap'>
                    {indicator.indicators &&
                      indicator.indicators.map((item) => {
                        return (
                          <CompaniesIndicator
                            description={item.description ? item.description : ''}
                            label={item.name}
                            value={item.amount}
                            key={item.name}
                            showGraph={true}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            </CustomCard>
          );
        })}
      {isListEnabled &&
        indicatorsData &&
        indicatorsData.map((indicator) => {
          return (
            <CustomCard title={indicator.name.toUpperCase()}>
              <IndicatorsTable indicators={indicator.indicators} />
            </CustomCard>
          );
        })}
    </div>
  );
};

export { Indicators };
