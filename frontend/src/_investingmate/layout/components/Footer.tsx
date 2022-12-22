const Footer = () => {
  return (
    <div className='footer py-4 px-4 d-flex flex-lg-column' id='im_footer'>
      {/* begin::Container */}
      <div className={`d-flex flex-column flex-md-row align-items-center justify-content-between`}>
        {/* begin::Copyright */}
        <div className='text-dark order-2 order-md-1'>
          <span className='text-muted fw-bold me-2'>{new Date().getFullYear()} &copy;</span>
          <a href='https://investingmate.com.au/' target='_blank' className='text-gray-800 text-hover-primary' rel="noreferrer">
            Investing Mate
          </a>
        </div>
        {/* end::Copyright */}

        {/* begin::Nav */}
        <ul className='menu menu-gray-600 menu-hover-primary fw-bold order-1'>
          <li className='menu-item'>
            <a href='https://investingmate.com.au/' target='_blank' className='menu-link pe-0 pe-2' rel="noreferrer">
              Contact
            </a>
          </li>
        </ul>
        {/* end::Nav */}
      </div>
      {/* end::Container */}
    </div>
  );
};

export { Footer };
