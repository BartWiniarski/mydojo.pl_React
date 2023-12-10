
function Footer(){
    const currentYear = new Date().getFullYear();

    return(
        <div id="footer-row" className="row fixed-bottom">
            <div className="col">
                <div className="container-fluid footer-container">
                    <div id="footer-content" className="container text-center footer-text">
                        <span>Copyright &copy; BartWiniarski {currentYear}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;