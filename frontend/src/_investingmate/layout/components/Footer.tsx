const Footer = () => {
  return (
    <div className='footer py-4 px-4 d-flex flex-lg-column' id='im_footer'>
      {/* begin::Container */}
      <div className={`d-flex flex-column flex-md-row align-items-center justify-content-between`}>
        {/* begin::Copyright */}
        <div className='text-dark order-2 order-md-1'>
          <span className='text-muted fw-bold me-2'>{new Date().getFullYear()} &copy;</span>
          <a href='/#' className='text-gray-800 text-hover-primary'>
            Investing Mate
          </a>
        </div>
        {/* end::Copyright */}

        {/* begin::Nav */}
        <ul className='menu menu-gray-600 menu-hover-primary fw-bold order-1'>
          <li className='menu-item'>
            <a href='/#' className='menu-link pe-0 pe-2'>
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
