/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {IMSVG} from '../../../../_investingmate/helpers'
import {customStringfy} from "../../../../utils/HelperFunctions";
import {CustomOverlayInfo} from "../../../../components/CustomOverlayInfo";
import {IHeadline} from "../core/_models";
import {CompaniesModal} from "./CompaniesModal";

interface Props {
  description: string | undefined;
  value: number;
  label: string;
  status?: string;
  showGraph: boolean
}

const CompaniesIndicator = (props: Props) => {
  const { description, value, label, status, showGraph } = props;

  const [modal, setModal] = useState(false);
  const [headline, setHeadline] = useState<IHeadline | undefined>(undefined);

  const handleModal = (headline: IHeadline | undefined) => {
    console.log('headline', headline)
    if(headline) {
      setModal(true)
      setHeadline(headline)
    }
  }

  return (
    <div className='d-flex align-items-center justify-content-between border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
      <CompaniesModal modalStatus={modal} setModalStatus={setModal} headline={headline} />
      <div>
        <div className='d-flex align-items-center'>
          {status === 'UP' &&
            <IMSVG
              path='/media/icons/duotune/arrows/arr066.svg'
              className='svg-icon-3 svg-icon-success me-2'
            />
          }
          {status === 'DOWN' &&
            <IMSVG
              path='/media/icons/duotune/arrows/arr065.svg'
              className='svg-icon-3 svg-icon-danger me-2'
            />
          }
          <div className='fs-2 fw-bolder'>{value}</div>

          <CustomOverlayInfo description={description ?? ''} />
        </div>
        <div className='fw-bold fs-6 text-gray-800'>{customStringfy(label)}</div>
      </div>
      {showGraph && (
        <div
        role="button"
        onClick={()=>handleModal({label, value})}
        className="min-w-55px d-flex align-items-center justify-content-end"
      >
        <div
          className="btn btn-icon btn-light-primary btn-custom"
        >
          <i className="fas fa-regular fa-chart-line fs-2"></i>
        </div>
      </div>
      )
    }
    </div>
  )
}

export {CompaniesIndicator}
