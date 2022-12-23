import { IMCard } from '../../../_investingmate/helpers';
import { CompaniesHeader } from './components/header/CompaniesHeader';
import { FinancialsSummary } from './components/financials/FinancialsSummary';
import { IncomeStatement } from './components/financials/IncomeStatement';
import { CashFlow } from './components/financials/CashFlow';
import { BalanceSheet } from './components/financials/BalanceSheet';
import Accordion from 'react-bootstrap/Accordion';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { getCurrentCompany } from './core/GetCurrentCompany';
import React from 'react';

const CompanyFinancialsPage = () => {
  const intl = useIntl();
  const location = useLocation();
  const company = getCurrentCompany(location);

  return (
    <IMCard>
      <CompaniesHeader />
      <div className='card-body p-5 pt-6 pb-6 mb-xl-10'>
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>
              {intl.formatMessage({ id: 'COMPANIES.FINANCIALS_SUMMARY' })}
            </Accordion.Header>
            <Accordion.Body>
              <FinancialsSummary data={company.financials.summary} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>
              {intl.formatMessage({ id: 'COMPANIES.INCOME_STATEMENT' })}
            </Accordion.Header>
            <Accordion.Body>
              <IncomeStatement data={company.financials.income_statement} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='2'>
            <Accordion.Header>
              {intl.formatMessage({ id: 'COMPANIES.BALANCE_SHEET' })}
            </Accordion.Header>
            <Accordion.Body>
              <BalanceSheet data={company.financials.balance_sheet} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='3'>
            <Accordion.Header>{intl.formatMessage({ id: 'COMPANIES.CASH_FLOW' })}</Accordion.Header>
            <Accordion.Body>
              <CashFlow data={company.financials.cash_flow} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </IMCard>
  );
};

export default CompanyFinancialsPage;
