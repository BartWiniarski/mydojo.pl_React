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
                <div className="mt-5 ">
                    <h4>Poznaj funkcjonalność</h4>
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
                            <br/>e-mail: uczen@uczen
                            <br/>hasło: uczen
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Home;