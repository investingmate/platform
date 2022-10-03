// @ts-nocheck
import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {TwoStepsCell} from './TwoStepsCell'
// import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {User} from '../../core/_models'

const companiesColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Sector' className='min-w-125px' />,
    accessor: 'sector',
  },
  // {
  //   Header: (props) => (
  //     <CustomHeader tableProps={props} title='Last login' className='min-w-125px' />
  //   ),
  //   id: 'last_login',
  //   Cell: ({...props}) => <UserLastLoginCell last_login={props.data[props.row.index].last_login} />,
  // },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Market cap' className='min-w-125px' />
    ),
    id: 'two_steps',
    Cell: ({...props}) => <TwoStepsCell two_steps={props.data[props.row.index].two_steps} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Last price' className='min-w-125px' />
    ),
    accessor: 'last_price',
  },
  // {
  //   Header: (props) => (
  //     <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
  //   ),
  //   id: 'actions',
  //   Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  // },
]

export {companiesColumns}
