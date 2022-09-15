import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Auth} from 'aws-amplify'
import {Link, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import {onError} from '../../../../lib/errorLib'
import {useQuery} from '../../../../_investingmate/helpers'

const initialValues = {
  email: 'csalucasnascimento@gmail.com',
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
})

const initialValues2 = {
  email: '',
  confirmationCode: '',
  password: '',
  confirmPassword: '',
}

const schema2 = Yup.object().shape({
  confirmationCode: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(6, 'Maximum 6 symbols')
    .required('Confirmation Code is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
})

export function ForgotPassword() {
  const navigate = useNavigate()
  const query = useQuery()
  const email = query.get('email') ?? ''
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        await Auth.forgotPassword(values.email)
        setLoading(false)
        navigate(`/auth/forgot-password?email=${values.email}`)
      } catch (error) {
        onError(error)
        setLoading(false)
        setSubmitting(false)
        setStatus('The login detail is incorrect')
      }
    },
  })

  interface Values {
    email: string
    confirmationCode: string
    password: string
    confirmPassword: string
  }

  const formik2 = useFormik({
    initialValues: {
      ...initialValues2,
      email: email,
    },
    enableReinitialize: true,
    validationSchema: schema2,
    onSubmit: async (values: Values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(false)
      try {
        await Auth.forgotPasswordSubmit(values.email, values.confirmationCode, values.password)
        setHasErrors(false)
      } catch (error) {
        onError(error)
        setHasErrors(true)
        setLoading(false)
        setSubmitting(false)
        setStatus('The code is incorrect')
      }
    },
  })

  const renderForm = () => (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='im_login_password_reset_form'
      onSubmit={formik.handleSubmit}
    >
      <div className='text-center mb-10'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>Forgot Password?</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-400 fw-bold fs-4'>Enter your email to reset your password.</div>
        {/* end::Link */}
      </div>

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Email</label>
        <input
          type='email'
          placeholder=''
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        <button
          type='submit'
          id='im_password_reset_submit'
          className='btn btn-lg btn-primary fw-bolder me-4'
        >
          <span className='indicator-label'>Submit</span>
          {loading && (
            <span className='indicator-progress'>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='im_login_password_reset_form_cancel_button'
            className='btn btn-lg btn-light-primary fw-bolder'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Cancel
          </button>
        </Link>{' '}
      </div>
      {/* end::Form group */}
    </form>
  )

  const renderFormConfirm = () => (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='im_login_password_reset_form'
      onSubmit={formik2.handleSubmit}
    >
      <div className='text-center mb-10'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>Reset Password</h1>
        {/* end::Title */}
      </div>

      {/* begin::Title */}
      {hasErrors === true && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>
            Sorry, looks like there are some errors detected, please try again.
          </div>
        </div>
      )}

      {hasErrors === false && (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>
            Password reset successful. Please
            <Link to='/auth/login' className='link-primary fw-bolder' style={{marginLeft: '5px'}}>
              Sign In
            </Link>
          </div>
        </div>
      )}
      {/* end::Title */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Email</label>
        <input
          type='email'
          placeholder=''
          disabled
          {...formik2.getFieldProps('email')}
          className='form-control form-control-lg form-control-solid'
        />
      </div>
      {/* end::Form group */}

      {/* begin::Form group code */}
      <div className='fv-row mb-10'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Confirmation code</label>
        <input
          placeholder='Confirmation code'
          type='text'
          autoComplete='off'
          {...formik2.getFieldProps('confirmationCode')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik2.touched.confirmationCode && formik2.errors.confirmationCode,
            },
            {
              'is-valid': formik2.touched.confirmationCode && !formik2.errors.confirmationCode,
            }
          )}
        />
        {formik2.touched.confirmationCode && formik2.errors.confirmationCode && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik2.errors.confirmationCode}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className='mb-10 fv-row' data-im-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Password</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
              autoComplete='off'
              {...formik2.getFieldProps('password')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik2.touched.password && formik2.errors.password,
                },
                {
                  'is-valid': formik2.touched.password && !formik2.errors.password,
                }
              )}
            />
            {formik2.touched.password && formik2.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik2.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          <div
            className='d-flex align-items-center mb-3'
            data-im-password-meter-control='highlight'
          >
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
          </div>
          {/* end::Meter */}
        </div>
        <div className='text-muted'>
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
        <input
          type='password'
          placeholder='Password confirmation'
          autoComplete='off'
          {...formik2.getFieldProps('confirmPassword')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik2.touched.confirmPassword && formik2.errors.confirmPassword,
            },
            {
              'is-valid': formik2.touched.confirmPassword && !formik2.errors.confirmPassword,
            }
          )}
        />
        {formik2.touched.confirmPassword && formik2.errors.confirmPassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik2.errors.confirmPassword}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        <button
          type='submit'
          id='im_password_reset_submit'
          className='btn btn-lg btn-primary fw-bolder me-4'
          disabled={formik2.isSubmitting || !formik2.isValid}
        >
          <span className='indicator-label'>Submit</span>
          {loading && (
            <span className='indicator-progress'>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='im_login_password_reset_form_cancel_button'
            className='btn btn-lg btn-light-primary fw-bolder'
          >
            Cancel
          </button>
        </Link>{' '}
      </div>
      {/* end::Form group */}
    </form>
  )

  return <div className='Signup'>{!email ? renderForm() : renderFormConfirm()}</div>
}
