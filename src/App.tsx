import {useState} from "react";
import Header from "./components/header.tsx";
import Main from "./components/main.tsx";
import Footer from "./components/footer.tsx";

import GoogleFontLoader from 'react-google-font-loader';

function App(){
    const [showLogin, setShowLogin] = useState(false);

    return(
        <div className="">
            <GoogleFontLoader fonts={[{ font: 'Poppins', weights: [400, 700] }]} />
            <Header setShowLogin={setShowLogin} />
            <Main showLogin={showLogin} />
            <Footer/>
        </div>
    );
}

export default App;
