import {Link} from "react-router-dom";
import {useState, useContext} from "react";
import axiosInstance from "../axios/axios.tsx";
import AuthContext from "../context/AuthProvider.tsx";

function Login() {
    const {setAuth} = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const LOGIN_URL = "/auth/authenticate";

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage('');

        try {
            const response = await axiosInstance.post(LOGIN_URL, formData);
            setFormData({
                email: '',
                password: '',
            });
            console.log("SUKCES!")
        } catch (error) {
            setErrorMessage('błąd!');
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