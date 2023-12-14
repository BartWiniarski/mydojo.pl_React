import {useNavigate, Link} from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import AdminUserList from "./adminUserList.jsx";


function Header() {
    const {auth, setAuth} = useAuth();
    const isLoggedIn = auth.token;
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        navigate('/');
    }

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-dark fixed-top p-0">
                <div className="d-flex justify-content-between navbar-container navbar-transparent w-100 navbar-text">
                    <div className="d-flex align-items-center" style={{width: "100%"}}>
                        <div>
                            <button className="navbar-toggler me-2 ms-2" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasDarkNavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div>
                            <Link to="/" className="link-wo-decoration">
                                <div className="navbar-brand">
                                    <img src="/images/logo_symbol_3.png" className="shadow-img" alt="Logo"
                                         style={{height: '3.15rem', verticalAlign: 'middle'}}/>
                                    <span className="ms-2">myDojo.pl</span>
                                </div>
                            </Link>
                        </div>
                        <div className="d-flex align-items-center ms-auto">
                            {!isLoggedIn ? (
                                <>
                                    <Link to="/login" className="btn-slideY link-wo-decoration">zaloguj się</Link>
                                    <Link to="/login">
                                        <img src="/images/user_3.png" className="btn-slideY" alt="user"
                                             style={{height: '3.3rem', verticalAlign: 'middle'}}/>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    {/*TODO: zamienić role na imię kiedy funkcjonalnośc powstanie*/}
                                    <div className="">Osu {auth.roles}!</div>
                                    <Link to="/profile">
                                        <img src="/images/user_3.png" className="btn-slideY" alt="user"
                                             style={{height: '3.3rem', verticalAlign: 'middle'}}/>
                                    </Link>
                                </>
                            )}

                            <div className="btn-slideY p-2">
                                <span id="message-counter" className="notify-badge">3</span>
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
                        <hr/>
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link active">Strona Główna</Link>
                                    </li>

                                    {auth.roles && auth.roles.includes("ADMIN") && (
                                        <li className="nav-item">
                                            <Link to="/dashboardAdmin" className="nav-link active">Panel administratora</Link>
                                            <Link to="/adminUserList" className="nav-link active">Lista użytkowników</Link>

                                        </li>
                                    )}

                                    {auth.roles && auth.roles.includes("TRAINER") && (
                                        <li className="nav-item">
                                            <Link to="/dashboardTrainer" className="nav-link active">Panel trenera</Link>
                                        </li>
                                    )}

                                    {auth.roles && auth.roles.includes("STUDENT") && (
                                        <li className="nav-item">
                                            <Link to="/dashboardStudent" className="nav-link active">Panel ucznia</Link>
                                        </li>
                                    )}

                                    <li className="nav-item">
                                        <Link to="" onClick={logout} className="nav-link active">Wyloguj</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link active">Strona Główna</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link">Logowanie</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/register" className="nav-link">Rejestracja</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                        <hr/>
                        <img src="/images/logo_1_1024_64.png" className=" img-fluid shadow-img d-block mx-auto"
                             alt=" Logo"
                             style={{maxHeight: '200px'}}/>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
