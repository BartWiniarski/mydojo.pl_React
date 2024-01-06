import { useState, useEffect } from "react";

function Home() {

    const [isLogoHiding, setIsLogoHiding] = useState(false);
    const [isLogoHidden, setIsLogoHidden] = useState(false);
    const [isTextShowing, setIsTextShowing] = useState(false);

    useEffect(() => {
        if (isLogoHiding) {
            setTimeout(() => {
                setIsLogoHidden(true);
                setIsTextShowing(true);
            }, 400);
        }
    }, [isLogoHiding]);

    const handleClick = () => {
        setIsLogoHiding(true);
    };

    return (
        <>
            <div id="welcomelogo"
                 className={`col-12 justify-content-center mt-5 ${isLogoHiding ? 'logo-hide' : ''} ${isLogoHidden ? 'd-none' : ''}`}
                 onClick={handleClick}>
                <div className="col">
                    <img src="/images/logo_1_1024_64.png" className="img-fluid shadow-img d-block mx-auto" alt="Logo"
                         style={{maxHeight: '600px'}}/>
                </div>
            </div>

            <div id="column-landing"
                 className={`col-12 ms-3 me-3 column-landing ${isTextShowing ? 'text-unhide' : 'text-hide'} ${!isLogoHidden ? 'd-none' : ''}`}
                 style={{width: '99%'}}>
                <div>
                    <div className="d-flex justify-content-center">
                        <img src="/images/logo_symbol_3.png" className="shadow-img" alt="Logo"
                             style={{height: '3.15rem', verticalAlign: 'middle'}}/>
                        <h1 className="ms-2">myDojo.pl</h1>
                    </div>
                    <h4 className="text-center mt-3">Twoja cyfrowa szkoła sztuk walki</h4>
                    <hr/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mt-5">
                            <div>
                                <h4 className="text-center">Poznaj funkcjonalność</h4>
                                <hr/>
                                <ul className="mt-4">
                                    <li className="mb-3">
                                        Zaloguj się jako administrator:
                                        <br/>e-mail: admin@admin
                                        <br/>hasło: admin
                                    </li>
                                    <li className="mb-3">
                                        Zaloguj się jako trener:
                                        <br/>e-mail: trener@trener
                                        <br/>hasło: trener
                                    </li>
                                    <li className="mb-3">
                                        Zaloguj się jako uczeń:
                                        <br/>e-mail: student@student
                                        <br/>hasło: student
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div>
                                <img src="/images/logo_1_1024_64.png" className="img-fluid shadow-img d-block mx-auto"
                                     alt="board"
                                     style={{maxHeight: '300px'}}/>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <div>
                                <h4 className="text-center">Wersja 0.1.1</h4>
                                <hr/>
                                <ul className="mt-4">
                                    <li className="mb-3">
                                        Integracja z API v.0.1.0 (api.mydojo.pl)
                                    </li>
                                    <li className="mb-3">
                                        Autoryzacja z użyciem czasowego tokenu JWS
                                    </li>
                                    <li className="mb-3">
                                        Logowanie i rejestracja użytkownika
                                    </li>
                                    <li className="mb-3">
                                        Aktualizacja danych profilu przez użytkownika
                                    </li>
                                    <li className="mb-3">
                                        Administrator:
                                        <br/>- zarządzanie użytkownikami - CRUD
                                        <br/>- blokowanie dostępu dla użytkownika
                                        <br/>- tworzenie nowych lokalizacji treningowych
                                        <br/>- zarządzanie grupami treningowymi - CRUD
                                        <br/>- zarządzanie harmonogramami treningowymi
                                        <br/>- zarządzanie uczniami i studentami wewnątrz grupy treningowej
                                    </li>
                                    <li className="mb-3">
                                        Trener:
                                        <br/>- podgląd przypisanych grup treningowych
                                    </li>
                                    <li className="mb-3">
                                        Uczeń:
                                        <br/>- podgląd przypisanych grup treningowych
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;