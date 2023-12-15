import { Route, Routes, Link} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./pages/public_access/login.jsx";
import Home from "./pages/home.jsx";
import Registration from "./pages/public_access/registration.jsx";
import AdminDashboard from "./pages/role_access/Admin/AdminDashboard.jsx";
import Missing from "./pages/public_access/missing.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import TrainerDashboard from "./pages/role_access/Trainer/TrainerDashboard.jsx";
import StudentDashboard from "./pages/role_access/Student/StudentDashboard.jsx";
import Forbidden from "./pages/public_access/forbidden.jsx";
import UserProfile from "./pages/role_access/UserProfile.jsx";
import AdminUserList from "./pages/role_access/Admin/AdminUserList.jsx";
import AdminTrainingGroups from "./pages/role_access/Admin/AdminTrainingGroups.jsx";


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
                    <Route path="adminDashboard" element={<AdminDashboard/>}/>
                    <Route path="adminUserList" element={<AdminUserList/>}/>
                    <Route path="adminTrainingGroups" element={<AdminTrainingGroups/>}/>
                </Route>
                <Route element={<RequireAuth allowedRoles={["TRAINER"]}/>}>
                    <Route path="trainerDashboard" element={<TrainerDashboard/>}/>
                </Route>
                <Route element={<RequireAuth allowedRoles={["STUDENT"]}/>}>
                    <Route path="studentDashboard" element={<StudentDashboard/>}/>
                </Route>
                <Route element={<RequireAuth allowedRoles={["ADMIN","TRAINER","STUDENT"]}/>}>
                    <Route path="profile" element={<UserProfile/>}/>
                </Route>

            </Route>
        </Routes>
    );
}

export default App;