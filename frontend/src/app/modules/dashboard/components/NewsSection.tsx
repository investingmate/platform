import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { CustomCard } from '../../../../components/CustomCard';
import { IMSVG } from '../../../../_investingmate/helpers';
import Modal from 'react-bootstrap/Modal';
import { dateFormatter } from '../../../../utils/HelperFunctions';

interface INews {
  id: number;
  title: string;
  date: string;
  content: string;
  image: string;
}

// TODO refactor this based on the data provider integration
const news: INews[] = [
  {
    id: 1,
    title: 'Lorem Ipsum is simply dummy text',
    date: '2023-01-04T10:00:00+11:00',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    image: 'https://images.theconversation.com/files/418661/original/file-20210831-15-1kbdcjx.jpg',
  },
  {
    id: 2,
    title: 'Lorem Ipsum is simply dummy text',
    date: '2023-01-03T10:00:00+11:00',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    image: 'https://content.api.news/v3/images/bin/2bd49aa3a8f3730189a9da78036ea5d1',
  },
  {
    id: 3,
    title: 'Lorem Ipsum is simply dummy text',
    date: '2023-01-02T10:00:00+11:00',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    image: 'https://images.theconversation.com/files/418661/original/file-20210831-15-1kbdcjx.jpg',
  },
  {
    id: 4,
    title: 'Lorem Ipsum is simply dummy text',
    date: '2023-01-01T10:00:00+11:00',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    image: 'https://content.api.news/v3/images/bin/2bd49aa3a8f3730189a9da78036ea5d1',
  },
];

const NewsSection = () => {
  const intl = useIntl();
  const [currentNews, setCurrentNews] = useState<INews | undefined>(undefined);
  return (
    <div className=''>
      <CustomCard title={intl.formatMessage({ id: 'COMPANIES.NEWS' })}>
        <div className='card card-xl-stretch'>
          <div className='card-body p-0'>
            {news.map((item) => {
              return (
                <div
                  key={item.id}
                  className='d-flex align-items-sm-center mb-7 border-bottom-dashed border-bottom-1 border-gray-300 pb-6'
                >
                  <div className='symbol symbol-60px symbol-2by3 me-4'>
                    <div
                      className='symbol-label'
                      style={{
                        backgroundImage: `url(${item.image})`,
                      }}
                    />
                  </div>
                  <div className='d-flex flex-row-fluid align-items-center flex-wrap my-lg-0 me-2'>
                    <div className='flex-grow-1 my-lg-0 my-2 me-2'>
                      <div
                        className='text-gray-800 fw-bold text-hover-primary fs-6'
                        onClick={() => setCurrentNews(item)}
                        role='button'
                      >
                        {item.title}
                      </div>
                      <span className='text-muted fw-semibold d-block pt-1'>
                        {dateFormatter(item.date, 'dddd, MMMM Do YYYY')}
                      </span>
                    </div>
                    <div className='d-flex align-items-center'>
                      <div
                        onClick={() => setCurrentNews(item)}
                        role='button'
                        className='btn btn-icon btn-light-primary btn-sm border-0'
                      >
                        <IMSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-2 svg-icon-primary'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CustomCard>
      <Modal show={currentNews !== undefined} onHide={() => setCurrentNews(undefined)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentNews && currentNews.title ? currentNews.title : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={currentNews?.image}
            alt={currentNews?.title}
            className='w-100 mb-6 border-radius-small h-300px'
          />
          <p>{currentNews?.content}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export { NewsSection };
