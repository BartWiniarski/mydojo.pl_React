import Axios from 'axios';
import {useState} from 'react';


function Registration() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Zapobiegamy domyślnej akcji przesyłania formularza

        try {
            // Wysyłamy dane do API w formie JSON
            const response = await Axios.post('http://localhost:8080/api/v1/auth/register', formData);

            // Tutaj możesz obsłużyć odpowiedź od serwera, np. wyświetlić komunikat o sukcesie
            console.log('Sukces:', response.data);
        } catch (error) {
            // Obsługa błędów, np. wyświetlenie komunikatu o błędzie
            console.error('Błąd:', error);
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
                            <a className="small" href="">Masz już konto? Zaloguj się!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;