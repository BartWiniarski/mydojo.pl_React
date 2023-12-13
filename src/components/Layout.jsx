import {Outlet} from "react-router-dom";
import Header from "../pages/header.jsx";
import Footer from "../pages/footer.jsx";

const Layout = () => {
    return (
        <div className="App">
            <Header/>
            <div id="main-content-row" className="row main-content-row main-row-text">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}
export default Layout;