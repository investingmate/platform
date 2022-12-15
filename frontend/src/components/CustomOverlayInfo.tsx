import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface CustomOverlayInfoProps {
  description: string;
  title?: string;
}

const CustomOverlayInfo = (props: CustomOverlayInfoProps) => {
  const { title = 'Info', description } = props;
  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement='top'
      overlay={
        <Popover>
          <Popover.Header as='h3'>
            <strong>{title}</strong>
          </Popover.Header>
          <Popover.Body>{description}</Popover.Body>
        </Popover>
      }
    >
      <div role='button' className='min-w-35px d-flex align-items-center justify-content-end'>
        <div className='btn-icon d-flex justify-content-center'>
          <i className='bi bi-question-circle mx-2 fs-4 text-gray-800' />
        </div>
      </div>
    </OverlayTrigger>
  );
};

export { CustomOverlayInfo };
