
function Login(){
    return(
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
                        <form className="">
                            <div className="p-2">
                                <input type="email" className="form-control" id="InputEmail"
                                       aria-describedby="emailHelp" placeholder="Podaj e-mail..."/>
                            </div>
                            <div className="p-2">
                                <input type="password" className="form-control"
                                       id="InputPassword" placeholder="Podaj hasło..."/>
                            </div>
                            <div className="p-3">
                                <div className="small">
                                    <input type="checkbox" className="form-check-input" id="RememberMe"/>
                                    <label className="" htmlFor="RememberMe">Zapamiętaj mnie</label>
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary shadow-lg mt-3 rounded-4">zaloguj
                                </button>
                            </div>
                        </form>
                        <hr/>
                        <div className="text-center">
                            <a className="small" href="">Zmień hasło</a>
                        </div>
                        <div className="text-center">
                            <a className="small" href="">Stwórz nowe konto</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;