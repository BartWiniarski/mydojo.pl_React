import Login from "./login.tsx";

function Main({showLogin, setShowLogin}){
    return(
        <div id="main-content-row" className="row main-content-row main-row-text">
            {showLogin && <Login />}
        </div>
    );
}

export default Main;