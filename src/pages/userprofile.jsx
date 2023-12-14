import {useState, useEffect} from "react";
import useAxiosInstanceToken from "../hooks/useAxiosInstanceToken.jsx";
import Calendar from "../components/Calendar.jsx";
import {Link} from "react-router-dom";

function UserProfile() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: null,
        email: "",
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const PROFILE_URL = "/users/profile";
    const axiosInstanceToken = useAxiosInstanceToken();


// POBIERANIE GETEM
        useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response =
                    await axiosInstanceToken.get(PROFILE_URL);

                const parsedDate = new Date(response.data.dob);
                setFormData({
                    ...formData,
                    dob: parsedDate,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                });


            } catch (error) {
                console.error("Błąd podczas pobierania danych z profilu:", error);
            }
        };
        fetchUserProfile();
    }, []);


// WYSYŁANIE POSTEM
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!formData.firstName.trim() ||
            !formData.lastName.trim() ||
            !formData.dob ||
            !formData.email.trim()) {
            setErrorMessage('Wszystkie pola są wymagane!');
            return;
        }

        try {
            const response =
                await axiosInstanceToken.put(PROFILE_URL, formData);
            setSuccessMessage('Aktualizacja profilu zakończona sukcesem!');

        } catch (error) {
            if (!error?.response) {
                setErrorMessage("Brak odpowiedzi serwera.")
            } else {
                setErrorMessage("Aktualizacja profilu zakończona niepowodzeniem.")
            }
        }
    };

    return (
        <div className="card card-primary-body rounded-5 mx-auto"
             style={{marginTop: "15vh", marginBottom: "15vh", width: "70%"}}>
            <div className="row flex-row justify-content-center">
                {/*<div className="col-lg-6 bg-registration-image d-none d-lg-block">*/}
                {/*</div>*/}
                <div className="col-lg-6">
                    <div className="p-5">
                        <div className="text-center">
                            <img src="/images/user_3.png" className="img-fluid shadow-img mb-4" alt="Logo"
                                 style={{maxHeight: '100px'}}/>
                            <hr/>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="p-2">
                                <label htmlFor="InputFirstName">Imię</label>
                                <input type="text" className="form-control"
                                       id="InputFirstName"
                                       value={formData.firstName}
                                       onChange={(e) =>
                                           setFormData({...formData, firstName: e.target.value})}/>
                            </div>
                            <div className="p-2">
                                <label htmlFor="InputLastName">Nazwisko</label>
                                <input type="text" className="form-control"
                                       id="InputLastName"
                                       value={formData.lastName}
                                       onChange={(e) =>
                                           setFormData({...formData, lastName: e.target.value})}/>
                            </div>
                            <div className="p-2">
                                    <label>Data urodzenia</label><br/>
                                    <Calendar
                                        selectedDate={formData.dob}
                                        onDateChange={(date) => setFormData({...formData, dob: date})}
                                    />
                            </div>
                            <div className="p-2">
                                <label htmlFor="InputEmail">E-mail</label>
                                <input type="email" className="form-control"
                                       id="InputEmail" disabled
                                       value={formData.email}
                                       onChange={(e) =>
                                           setFormData({...formData, email: e.target.value})}/>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary shadow-lg mt-3 rounded-4">
                                    aktualizuj
                                </button>
                            </div>
                        </form>
                        <hr/>
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

export default UserProfile;
