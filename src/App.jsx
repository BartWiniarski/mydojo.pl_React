import { Route, Routes, Link} from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import Registration from "./pages/registration.jsx";
import DashboardAdmin from "./pages/dashboardAdmin.jsx";
import Missing from "./pages/missing.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import DashboardTrainer from "./pages/dashboardTrainer.jsx";
import DashboardStudent from "./pages/dashboardStudent.jsx";
import Forbidden from "./pages/forbidden.jsx";
import UserProfile from "./pages/userprofile.jsx";


function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/*public*/}
                <Route path="/" element={<Home/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Registration/>}/>
                <Route path="forbidden" element={<Forbidden/>}/>
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
                <Route element={<RequireAuth allowedRoles={["ADMIN","TRAINER","STUDENT"]}/>}>
                    <Route path="profile" element={<UserProfile/>}/>
                </Route>

            </Route>
        </Routes>
    );
}

export default App;