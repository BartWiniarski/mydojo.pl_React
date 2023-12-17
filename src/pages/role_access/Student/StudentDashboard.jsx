import TestFetchStudent from "../../../components/Student/TestFetchStudent.jsx";

function StudentDashboard() {
    return (
        <>
            <div id="column-left" className="col-12 col-md-2 mt-md-3  column-left">
                <img src="/images/tree_with_spring_1.png" className="img-fluid shadow-img d-block mx-auto"
                     alt="Logo"
                     style={{maxHeight: '600px'}}/>
            </div>
            <div id="column-right" className="col-12 col-md-10 ms-md-auto mt-md-auto column-right">
                <h1 className="text-center">DASHBOARD STUDENT</h1>
                <TestFetchStudent/>
            </div>
        </>
    );
}

export default StudentDashboard;