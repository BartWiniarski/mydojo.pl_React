
function Header({setShowLogin}) {
    const handleLoginClick = () => {
        setShowLogin(true);
    };

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-dark fixed-top p-0">
                <div className="d-flex justify-content-between navbar-container navbar-transparent w-100 navbar-text">
                    <div className="d-flex align-items-center">
                        <div>
                            <button className="navbar-toggler me-2 ms-2" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasDarkNavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div>
                            <a className="navbar-brand" href="#">
                                <img src="/images/logo_symbol_3.png" className="shadow-img" alt="Logo"
                                     style={{height: '3.15rem', verticalAlign: 'middle'}}/>
                                <span className="ms-2">myDojo.pl</span>
                            </a>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="btn-slideY" onClick={handleLoginClick}>zaloguj się</span>
                            <img src="/images/user_3.png" className="btn-slideY" alt="user" onClick={handleLoginClick}
                                 style={{height: '3.3rem', verticalAlign: 'middle'}}/>
                            <div className="btn-slideY">
                                {/*<span id="message-counter" className="notify-badge">3</span>*/}
                                <img src="/images/envelope_4.png" className="me-2" alt="envelope"
                                     style={{height: '3.5rem', verticalAlign: 'middle'}}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="offcanvas offcanvas-start rounded-end-4 offcanvas-color custom-offcanvas"
                     tabIndex="-1"
                     id="offcanvasDarkNavbar">
                    <div className="offcanvas-header offcanvas-header-white">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">MENU</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas">
                        </button>
                    </div>
                    <div className="offcanvas-body">
                        <img src="/images/fan_2.png" className="img-fluid shadow-img d-block mx-auto" alt="Logo"
                             style={{maxHeight: '100px'}}/>
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button"
                                   data-bs-toggle="dropdown">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li></li>
                        </ul>
                        <img src="/images/logo_1_1024_64.png" className="img-fluid shadow-img d-block mx-auto"
                             alt="Logo"
                             style={{maxHeight: '200px'}}/>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
