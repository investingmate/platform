/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {IHeadline} from "../core/_models";
import {customStringfy} from "../../../../utils/HelperFunctions";
import {Modal} from "react-bootstrap";
import {CompaniesCharts} from "./charts/CompaniesCharts";

interface Props {
  headline: IHeadline | undefined,
  modalStatus: boolean,
  setModalStatus: (status: boolean) => void
}

const CompaniesModal = (props: Props) => {
  const { headline, modalStatus, setModalStatus } = props;

  return (
    <div className='card mb-5 mb-xl-10'>
      {modalStatus &&
        <Modal
          aria-hidden='true'
          dialogClassName='modal-dialog modal-dialog-centered'
          show={modalStatus}
          onHide={()=>setModalStatus(false)}
          centered
          size="lg"
        >
          <div className="modal-content">
            <div className="modal-header">
              {headline && headline.label && <h5 className="modal-title">{customStringfy(headline.label)}</h5>}
              <div
                className="btn btn-icon btn-light-primary btn-custom ms-2"
                onClick={()=>setModalStatus(false)}
                aria-label="Close"
              >
                <i className="fas fa-regular fa-close fs-2"></i>
              </div>
            </div>
            {headline && headline.label && <CompaniesCharts label={customStringfy(headline.label)}/>}
          </div>
        </Modal>
      }
    </div>
  )
}

export {CompaniesModal}
