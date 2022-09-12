import {useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Auth} from 'aws-amplify'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../core/Auth'
import {GoogleLogin} from './GoogleLogin'
import {onError} from '../../../../lib/errorLib'
import {toAbsoluteUrl, useQuery} from '../../../../_investingmate/helpers'
import {useIntl} from "react-intl";

const initialValues = {
  email: 'csalucasnascimento@gmail.com',
  password: 'Aus.2013!',
}

const initialValues2 = {
  confirmationCode: '',
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const schema2 = Yup.object().shape({
  confirmationCode: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(6, 'Maximum 6 symbols')
    .required('Confirmation code is required'),
})

async function resendConfirmationCode(email: string) {
  try {
    await Auth.resendSignUp(email)
  } catch (error) {
    onError(error)
  }
}

export function Login() {
  const intl = useIntl()
  const navigate = useNavigate()
  const query = useQuery()
  const email = query.get('email') ?? ''
  const [loading, setLoading] = useState(false)
  const {setCurrentUser} = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {username} = await Auth.signIn(values.email, values.password)
        setCurrentUser(username)
      } catch (error: any) {
        if (error.code === 'UserNotConfirmedException') {
          navigate(`/auth/login?email=${values.email}`)
          // The error happens if the user didn't finish the confirmation step when signing up
          // In this case you need to resend the code and confirm the user
          // About how to resend the code and confirm the user, please check the signUp part
        } else if (error.code === 'PasswordResetRequiredException') {
          navigate(`/auth/forgot-password?email=${values.email}`)
          // The error happens when the password is reset in the Cognito console
          // In this case you need to call forgotPassword to reset the password
          // Please check the Forgot Password part.
        } else if (error.code === 'NotAuthorizedException') {
          // The error happens when the incorrect password is provided
          setStatus('The incorrect password is provided!')
        } else if (error.code === 'UserNotFoundException') {
          setStatus('Supplied username/email does not exist!')
          // The error happens when the supplied username/email does not exist in the Cognito user pool
        }
        onError(error)
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  const formik2 = useFormik({
    initialValues: {
      ...initialValues2,
    },
    validationSchema: schema2,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        await Auth.confirmSignUp(email, values.confirmationCode)
        // const { username } = await Auth.signIn(user.username, user.password);
        // setCurrentUser(username);
        navigate(`/auth/login`)
      } catch (error) {
        onError(error)
        setStatus('The confirmation code is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  const renderFormConfirm = () => (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='im_confirmation_login_form'
      onSubmit={formik2.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='mb-10 text-center'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>Confirm Login</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-400 fw-bold fs-4'>
          Don't have the code?
          <Link
            to='#'
            className='link-primary fw-bolder'
            style={{marginLeft: '5px'}}
            onClick={(e) => {
              e.preventDefault()
              resendConfirmationCode(email)
            }}
          >
            Resend code
          </Link>
        </div>
        {/* end::Link */}
      </div>
      {/* end::Heading */}

      {/* begin::Action */}
      <button type='button' className='btn btn-light-primary fw-bolder w-100 mb-10'>
        <img
          alt='Logo'
          src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
          className='h-20px me-3'
        />
        Sign in with Google
      </button>
      {/* end::Action */}

      <div className='d-flex align-items-center mb-10'>
        <div className='border-bottom border-gray-300 mw-50 w-100'></div>
        <span className='fw-bold text-gray-400 fs-7 mx-2'>OR</span>
        <div className='border-bottom border-gray-300 mw-50 w-100'></div>
      </div>

      {formik2.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik2.status}</div>
        </div>
      )}

      {/* begin::Form group ConfirmationCode */}
      <div className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirmation code</label>
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

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='im_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik2.isSubmitting || !formik2.isValid}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='im_confirmation_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )

  const renderForm = () => {
    return (
      <form
        className='form w-100'
        onSubmit={formik.handleSubmit}
        noValidate
        id='im_login_signin_form'
      >
        {/* begin::Heading */}
        <div className='text-center mb-10'>
          <h1 className='text-dark mb-3'>{intl.formatMessage({id: 'LOGIN.SIGN_IN_TO_INVESTINGMATE'})}</h1>
          <div className='text-gray-400 fw-bold fs-4'>
            {intl.formatMessage({id: 'LOGIN.NEW_HERE'})}{' '}
            <Link to='/auth/registration' className='link-primary fw-bolder'>
              {intl.formatMessage({id: 'LOGIN.CREATE_AN_ACCOUNT'})}
            </Link>
          </div>
        </div>
        {/* begin::Heading */}

        {formik.status && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        )}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label className='form-label fs-6 fw-bolder text-dark'>
            {intl.formatMessage({id: 'LOGIN.EMAIL'})}
          </label>
          <input
            placeholder={intl.formatMessage({id: 'LOGIN.EMAIL'})}
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.email && formik.errors.email},
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
            type='email'
            name='email'
            autoComplete='off'
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <div className='d-flex justify-content-between mt-n5'>
            <div className='d-flex flex-stack mb-2'>
              {/* begin::Label */}
              <label className='form-label fw-bolder text-dark fs-6 mb-0'>
                {intl.formatMessage({id: 'LOGIN.PASSWORD'})}
              </label>
              {/* end::Label */}
              {/* begin::Link */}
              <Link
                to='/auth/forgot-password'
                className='link-primary fs-6 fw-bolder'
                style={{marginLeft: '5px'}}
              >
                {intl.formatMessage({id: 'LOGIN.FORGOT_PASSWORD'})}
              </Link>
              {/* end::Link */}
            </div>
          </div>
          <input
            type='password'
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.password && formik.errors.password,
              },
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              }
            )}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Action */}
        <div className='text-center'>
          <button
            type='submit'
            id='im_sign_in_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>
              {intl.formatMessage({id: 'LOGIN.CONTINUE'})}
            </span>
            }
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
              {intl.formatMessage({id: 'LOGIN.PLEASE_WAIT'})}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
            )}
          </button>

          {/* begin::Separator */}
          <div className='text-center text-muted text-uppercase fw-bolder mb-5'>
            {intl.formatMessage({id: 'LOGIN.OR'})}
          </div>
          {/* end::Separator */}

          {/* begin::Google link */}
          <GoogleLogin />
          {/* end::Google link */}
        </div>
        {/* end::Action */}
      </form>
    )
  }

  return <div className='Login'>
    {!email ? renderForm() : renderFormConfirm()}
  </div>
}
