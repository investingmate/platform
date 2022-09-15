/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC, useState} from 'react'
import {toAbsoluteUrl} from '../../../helpers'
import {useLang, setLanguage} from '../../../i18n/InvestingMatei18n'

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: toAbsoluteUrl('/media/flags/united-states.svg'),
  },
  {
    lang: 'es',
    name: 'Spanish',
    flag: toAbsoluteUrl('/media/flags/spain.svg'),
  },
  {
    lang: 'pt',
    name: 'Portuguese',
    flag: toAbsoluteUrl('/media/flags/brazil.svg'),
  },
]

const HomeLanguages: FC = () => {
  const [clicked, setClicked] = useState(false)
  const lang = useLang()
  const currentLanguage = languages.find((x) => x.lang === lang)
  return (
    <div className='home-menu menu-item px-5'>
      <a href='#' className='menu-link px-5' onClick={() => setClicked(!clicked)}>
        <span className='menu-title position-relative'>
          <span className='fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0 current-language'>
            {currentLanguage?.name}{' '}
            <img
              className='w-15px h-15px rounded-1 ms-2'
              src={currentLanguage?.flag}
              alt='metronic'
            />
          </span>
        </span>
      </a>

      <div
        className={
          !clicked
            ? 'menu-sub menu-sub-dropdown w-175px py-4'
            : 'menu-sub menu-sub-dropdown w-175px py-4 display'
        }
      >
        {languages.map((l) => (
          <div
            className='menu-item px-3'
            key={l.lang}
            onClick={() => {
              setClicked(false)
              setLanguage(l.lang)
            }}
          >
            <a
              href='#'
              className={clsx('menu-link d-flex px-5', {active: l.lang === currentLanguage?.lang})}
            >
              <span className='symbol symbol-20px me-4'>
                <img className='rounded-1' src={l.flag} alt='metronic' />
              </span>
              {l.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export {HomeLanguages}
