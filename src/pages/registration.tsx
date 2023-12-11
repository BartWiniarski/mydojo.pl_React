import axiosInstance from "../axios/axios.tsx";
import {useState} from 'react';
import {Link} from "react-router-dom";

function Registration() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const REGISTER_URL = "/auth/register";

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setSuccessMessage('');
        setErrorMessage('');

        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password.trim()) {
            setErrorMessage('Wszystkie pola są wymagane!');
            return;
        }

        try {
            const response = await axiosInstance.post(REGISTER_URL, formData);
            setSuccessMessage('Rejestracja zakończona sukcesem!');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            });

        } catch (error) {
            if (!error?.response) {
                setErrorMessage("Brak odpowiedzi serwera.")
            } else if (error.response?.status === 409) {
                setErrorMessage('Użytkownik o podanym e-mail już istnieje!');
            } else {
                setErrorMessage("Rejestracja zakończona niepowodzeniem.")
            }
        }
    };

    return (
        <div className="card card-primary-body rounded-5 mx-auto"
             style={{marginTop: "15vh", marginBottom: "15vh", width: "70%"}}>
            <div className="row">
                <div className="col-lg-6 bg-registration-image d-none d-lg-block">
                </div>
                <div className="col-lg-6">
                    <div className="p-5">
                        <div className="text-center">
                            <img src="/images/user_3.png" className="img-fluid shadow-img mb-4" alt="Logo"
                                 style={{maxHeight: '100px'}}/>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="p-2">
                                <input type="text" className="form-control"
                                       id="InputFirstName" placeholder="Podaj imię..."
                                       value={formData.firstName}
                                       onChange={(e) =>
                                           setFormData({...formData, firstName: e.target.value})}/>
                            </div>
                            <div className="p-2">
                                <input type="text" className="form-control"
                                       id="InputLastName" placeholder="Podaj nazwisko..."
                                       value={formData.lastName}
                                       onChange={(e) =>
                                           setFormData({...formData, lastName: e.target.value})}/>
                            </div>
                            <div className="p-2">
                                <input type="email" className="form-control"
                                       id="InputEmail" placeholder="Podaj e-mail..."
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
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary shadow-lg mt-3 rounded-4">utwórz
                                </button>
                            </div>
                        </form>
                        <hr/>
                        <div className="text-center">
                            <Link to="/login" className="link-wo-decoration">
                                <p className="small">Masz już konto? Zaloguj się!</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {successMessage && (
                <div className="alert alert-success mt-3 text-center rounded-4">{successMessage}</div>
            )}
            {errorMessage && (
                <div className="alert alert-danger mt-3 text-center">{errorMessage}</div>
            )}
        </div>
    );
}

export default Registration;