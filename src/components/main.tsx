import Login from "./login.tsx";
import Registration from "./registration.tsx";

function Main({showLogin, setShowLogin}){
    return(
        <div id="main-content-row" className="row main-content-row main-row-text">
            {showLogin && <Login />}
            <Registration/>
        </div>
    );
}

export default Main;