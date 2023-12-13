import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {axiosInstance} from "../axios/axios.jsx";
import useAuth from "../hooks/useAuth.jsx";


function Login() {
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const LOGIN_URL = "/auth/authenticate";

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage('');

        if (!formData.email.trim() || !formData.password.trim()) {
            setErrorMessage('Wszystkie pola są wymagane!');
            return;
        }

        try {
            const response = await axiosInstance.post(LOGIN_URL, formData);
            const token = response?.data?.token;
            const roles = response?.data?.roles;
            //TODO: usunąć hasło z kontekstu i nie używać go w kodzie.
            setAuth({ email: formData.email, password: formData.password, roles, token });
            navigate(from, {replace: true});

        } catch (error) {
            setFormData({
                email: '',
                password: '',
            });
            if (!error?.response) {
                setErrorMessage("Brak odpowiedzi serwera.");
            } else if (error.response?.status === 403) {
                setErrorMessage('Brak autoryzacji - sprawdź poprawność e-mail i hasła.');
            } else {
                setErrorMessage("Logowanie zakończone niepowodzeniem.");
            }
        }
    };

    return (
        <div className="card card-primary-body rounded-5 mx-auto"
             style={{marginTop: "15vh", marginBottom: "15vh", width: "70%"}}>
            <div className="row">
                <div className="col-lg-6 bg-login-image d-none d-lg-block">
                </div>
                <div className="col-lg-6">
                    <div className="p-5">
                        <div className="text-center">
                            <img src="/images/user_3.png" className="img-fluid shadow-img mb-4" alt="Logo"
                                 style={{maxHeight: '100px'}}/>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="p-2">
                                <input type="email" className="form-control" id="InputEmail"
                                       aria-describedby="emailHelp" placeholder="Podaj e-mail..."
                                       value={formData.email}
                                       onChange={(e) =>
                                           setFormData({...formData, email: e.target.value})}/>
                            </div>
                            <div className="p-2">
                                <input type="password" className="form-control"
                                       id="InputPassword" placeholder="Podaj hasło..."
                                       value={formData.password}
                                       onChange={(e) =>
                                           setFormData({...formData, password: e.target.value})}/>
                            </div>
                            <div className="p-3">
                                <div className="small">
                                    <input type="checkbox" className="form-check-input" id="RememberMe"/>
                                    <label className="ms-2" htmlFor="RememberMe">Zapamiętaj mnie</label>
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary shadow-lg mt-3 rounded-4">zaloguj
                                </button>
                            </div>
                        </form>
                        <hr/>
                        <div className="text-center d-none">
                            <a className="small" href="">Zmień hasło</a>
                        </div>
                        <div className="text-center">
                            <Link to="/register" className="link-wo-decoration">
                                <p className="small">Stwórz nowe konto</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {errorMessage && (
                <div className="alert alert-danger mt-3 text-center">{errorMessage}</div>
            )}
        </div>
    );
}

export default Login;