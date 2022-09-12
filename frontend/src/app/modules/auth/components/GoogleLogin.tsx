import {Auth} from 'aws-amplify'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_investingmate/helpers'
import {useIntl} from "react-intl";

const GoogleLogin = () => {
  const intl = useIntl()

  const signIn = async () => {
    // @ts-ignore TODO check this later
    await Auth.federatedSignIn({provider: 'Google'})
  }

  return (
    <Link to='#'>
      <button
        className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'
        onClick={(e) => {
          e.preventDefault()
          signIn()
        }}
      >
        <img
          alt='Logo'
          src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
          className='h-20px me-3'
        />
        {intl.formatMessage({id: 'LOGIN.CONTINUE_WITH_GOOGLE'})}
      </button>
    </Link>
  )
}

export {GoogleLogin}
