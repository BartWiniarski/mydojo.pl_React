import AdminTestFetch from "../components/AdminTestFetch.tsx"

function DashboardAdmin() {

        return (
            <>
                <div id="column-left" className="col-12 col-md-2 mt-md-3  column-left">
                    LEFT
                </div>
                <div id="column-right" className="col-12 col-md-10 ms-md-auto mt-md-auto column-right">
                    <h1 className="text-center">DASHBOARD ADMIN</h1>
                    <AdminTestFetch/>
                </div>
            </>
        );
    }

export default DashboardAdmin;