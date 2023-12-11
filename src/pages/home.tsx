function Home() {
    return (
        <>
            <div id="welcomelogo" className="col-12 justify-content-center mt-5">
                <div className="col">
                    <img src="/images/logo_1_1024_64.png" className="img-fluid shadow-img d-block mx-auto" alt="Logo"
                         style={{maxHeight: '600px'}}/>
                </div>
            </div>

            <div id="column-left" className="col-12 col-md-2 mt-md-3 column-left d-none">
                LEFT
            </div>
            <div id="column-right" className="col-12 col-md-10 ms-md-auto mt-md-auto column-right d-none">
                RIGHT - Landing page
            </div>
        </>
    );
}

export default Home;