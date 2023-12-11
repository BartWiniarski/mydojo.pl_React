import {useState} from "react";
import { Route, Routes, Link} from "react-router-dom";

import Layout from "./components/Layout.tsx";
import Login from "./pages/login.tsx";
import Home from "./pages/home.tsx";
import Registration from "./pages/registration.tsx";
import DashboardAdmin from "./pages/dashboardAdmin.tsx";
import Missing from "./pages/missing.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import DashboardTrainer from "./pages/dashboardTrainer.tsx";
import DashboardStudent from "./pages/dashboardStudent.tsx";
import Forbidden from "./pages/forbidden.tsx";


function App() {
    // const [showLogin, setShowLogin] = useState(false);

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/*public*/}
                <Route path="/" element={<Home/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Registration/>}/>
                <Route path="/forbidden" element={<Forbidden/>}/>
                <Route path="*" element={<Missing/>}/>

                {/*protected*/}
                <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
                    <Route path="dashboardAdmin" element={<DashboardAdmin/>}/>
                </Route>
                <Route element={<RequireAuth allowedRoles={["TRAINER"]}/>}>
                    <Route path="dashboardTrainer" element={<DashboardTrainer/>}/>
                </Route>
                <Route element={<RequireAuth allowedRoles={["STUDENT"]}/>}>
                    <Route path="dashboardStudent" element={<DashboardStudent/>}/>
                </Route>

            </Route>
        </Routes>
    );
}

export default App;
