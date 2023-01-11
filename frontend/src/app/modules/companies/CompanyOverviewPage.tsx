import { IMCard } from '../../../_investingmate/helpers';
import { CompaniesHeader } from './components/header/CompaniesHeader';
import { useLocation } from 'react-router-dom';
import { getCurrentCompany } from './core/GetCurrentCompany';
import { PriceGraph } from './components/overview/PriceGraph';
import { CorporateOverviewComponent } from './components/overview/CorporateOverview';
import { DividendHistory } from './components/overview/DividendHistory';
import { Indicators } from './components/overview/Indicators';
import Accordion from 'react-bootstrap/Accordion';
import { useIntl } from 'react-intl';

const CompanyOverviewPage = () => {
  const intl = useIntl();

  const location = useLocation();
  const company = getCurrentCompany(location);

  return (
    <IMCard className='pb-5 table-responsive'>
      <CompaniesHeader />
      <div className='card-body p-5 pt-6 pb-6 mb-xl-10'>
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>{intl.formatMessage({ id: 'COMPANIES.CORPORATE' })}</Accordion.Header>
            <Accordion.Body>
              <CorporateOverviewComponent overview={company.corporate_overview} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>
              {intl.formatMessage({ id: 'COMPANIES.PRICE_GRAPH' })}
            </Accordion.Header>
            <Accordion.Body>
              <PriceGraph />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='2'>
            <Accordion.Header>
              {intl.formatMessage({ id: 'COMPANIES.INDICATORS' })}
            </Accordion.Header>
            <Accordion.Body>
              <Indicators indicatorsData={company.indicators_group} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='3'>
            <Accordion.Header>
              {intl.formatMessage({ id: 'COMPANIES.DIVIDEND_HISTORY' })}
            </Accordion.Header>
            <Accordion.Body>
              <DividendHistory />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </IMCard>
  );
};

export default CompanyOverviewPage;
