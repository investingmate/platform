import React from 'react';
import { useIntl } from 'react-intl';
import { CustomCard } from '../../../../components/CustomCard';

const NewsSection = () => {
  const intl = useIntl();
  return (
    <div className='mt-3'>
      <CustomCard title={intl.formatMessage({ id: 'COMPANIES.NEWS' })}>
        <>TODO</>
      </CustomCard>
    </div>
  );
};

export { NewsSection };
