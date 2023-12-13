import {useState, useEffect} from "react";
import useAxiosInstanceToken from "../hooks/useAxiosInstanceToken.jsx";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const axiosInstanceToken = useAxiosInstanceToken();

    useEffect(() => {
        let isMounted = true;

        const getFetch = async () => {
            try {
                const response =
                    await axiosInstanceToken.get("/admin/users");

                if (isMounted) {
                    setUsers(response.data);
                }
            } catch (error) {
                if (isMounted) {
                    console.log(error);
                }
            }
        }
        getFetch();

        return () => {
            isMounted = false;
        }

    }, [axiosInstanceToken]);

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3 card">
                <h5 className="fw-bold">{data.firstName} {data.lastName}</h5>
                <p className="fw-bold">Rola: {data.roles.map((role) => role.type).join(', ')}</p>
                <p>Email: {data.email}</p>
                <p>Data urodzenia: {data.dob}</p>
                <p>Wiek: {data.age}</p>
            </div>
        );
    };

    return (
        <>
            <div id="column-left" className="col-12 col-md-2 mt-md-3 column-left">
                <img src="/images/tree_with_spring_2.png" className="img-fluid shadow-img d-block mx-auto"
                     alt="Logo"
                     style={{maxHeight: '600px'}}/>
            </div>
            <div id="column-right" className="col-12 col-md-10 ms-md-auto mt-md-auto column-right">
                <h1 className="h3 mb-2">Lista użytkowników</h1>
                <hr/>
                <div className="card">
                    <DataTable value={users} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                               rowExpansionTemplate={rowExpansionTemplate} dataKey="id" className="p-datatable-striped">
                        <Column expander style={{width: '3em'}}/>
                        <Column field="firstName" header="Imię" sortable/>
                        <Column field="lastName" header="Nazwisko" sortable/>
                        <Column field="age" header="Wiek" sortable/>
                        <Column field="roles" header="Role" sortable
                                body={(rowData) => rowData.roles.map((role) => role.type).join(', ')}/>
                    </DataTable>
                </div>
                <hr/>
            </div>
        </>
    );
};
export default AdminUserList;