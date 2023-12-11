import {useState} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";

import Header from "./pages/header.tsx";
import Footer from "./pages/footer.tsx";
import Login from "./pages/login.tsx";
import Home from "./pages/home.tsx";
import Registration from "./pages/registration.tsx";

function App() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <Router>
            <div className="App">
                <Header/>
                <div id="main-content-row" className="row main-content-row main-row-text">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Registration/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
