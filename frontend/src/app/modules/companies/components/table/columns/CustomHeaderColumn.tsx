import { CSSProperties, FC } from 'react';
import { ColumnInstance } from 'react-table';
// import {User} from '../../core/_models'

type Props = {
  column: ColumnInstance;
  style?: CSSProperties | undefined;
};

const CustomHeaderColumn: FC<Props> = ({ column, style }) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th style={style} {...column.getHeaderProps()}>
        {column.render('Header')}
      </th>
    ) : (
      column.render('Header')
    )}
  </>
);

export { CustomHeaderColumn };
