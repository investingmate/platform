import {Link} from 'react-router-dom'
import {IMSVG} from '../../../../_investingmate/helpers'

const Companies = () => {
  return (
    <div className='card mb-5 mb-xl-10' id='im_profile_details_view'>
      <div className='card-header cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Headlines</h3>
        </div>

        <Link to='/crafted/account/settings' className='btn btn-primary align-self-center'>
          Edit Profile
        </Link>
      </div>

      <div className='card-body ps-3'>
        <div className='row mb-7'>
          <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

          <div className='col-lg-8'>
            <span className='fw-bolder fs-6 text-dark'>Max Smith</span>
          </div>
        </div>

        <div className='row mb-7'>
          <label className='col-lg-4 fw-bold text-muted'>Company</label>

          <div className='col-lg-8 fv-row'>
            <span className='fw-bold fs-6'>Keenthemes</span>
          </div>
        </div>

        <div className='row mb-7'>
          <label className='col-lg-4 fw-bold text-muted'>
            Contact Phone
            <i
              className='fas fa-exclamation-circle ms-1 fs-7'
              data-bs-toggle='tooltip'
              title='Phone number must be active'
            ></i>
          </label>

          <div className='col-lg-8 d-flex align-items-center'>
            <span className='fw-bolder fs-6 me-2'>044 3276 454 935</span>

            <span className='badge badge-success'>Verified</span>
          </div>
        </div>

        <div className='row mb-7'>
          <label className='col-lg-4 fw-bold text-muted'>Company Site</label>

          <div className='col-lg-8'>
            <a href='/#' className='fw-bold fs-6 text-dark text-hover-primary'>
              keenthemes.com
            </a>
          </div>
        </div>

        <div className='row mb-7'>
          <label className='col-lg-4 fw-bold text-muted'>
            Country
            <i
              className='fas fa-exclamation-circle ms-1 fs-7'
              data-bs-toggle='tooltip'
              title='Country of origination'
            ></i>
          </label>

          <div className='col-lg-8'>
            <span className='fw-bolder fs-6 text-dark'>Germany</span>
          </div>
        </div>

        <div className='row mb-7'>
          <label className='col-lg-4 fw-bold text-muted'>Communication</label>

          <div className='col-lg-8'>
            <span className='fw-bolder fs-6 text-dark'>Email, Phone</span>
          </div>
        </div>

        <div className='row mb-10'>
          <label className='col-lg-4 fw-bold text-muted'>Allow Changes</label>

          <div className='col-lg-8'>
            <span className='fw-bold fs-6'>Yes</span>
          </div>
        </div>

        <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
          <IMSVG
            path='icons/duotune/general/gen044.svg'
            className='svg-icon-2tx svg-icon-warning me-4'
          />
          <div className='d-flex flex-stack flex-grow-1'>
            <div className='fw-bold'>
              <h4 className='text-gray-800 fw-bolder'>We need your attention!</h4>
              <div className='fs-6 text-gray-600'>
                Your payment was declined. To start using tools, please
                <Link className='fw-bolder' to='/crafted/account/settings'>
                  {' '}
                  Add Payment Method
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Companies}
