import AdminTestFetch from "../components/AdminTestFetch.jsx"

function DashboardAdmin() {

        return (
            <>
                <div id="column-left" className="col-12 col-md-2 mt-md-3  column-left">
                    <img src="/images/tree_with_spring_2.png" className="img-fluid shadow-img d-block mx-auto"
                         alt="Logo"
                         style={{maxHeight: '600px'}}/>
                </div>
                <div id="column-right" className="col-12 col-md-10 ms-md-auto mt-md-auto column-right">
                    <h1 className="text-center">DASHBOARD ADMIN</h1>
                    <AdminTestFetch/>
                </div>
            </>
        );
    }

export default DashboardAdmin;