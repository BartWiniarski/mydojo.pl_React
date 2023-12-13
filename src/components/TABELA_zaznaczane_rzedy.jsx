import {useState, useEffect} from "react";
import useAxiosInstanceToken from "../hooks/useAxiosInstanceToken.jsx";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
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

    const [selectedUsers, setSelectedUsers] = useState(null);
    const [rowClick, setRowClick] = useState(true);

    return (
        <>
            <div id="column-left" className="col-12 col-md-2 mt-md-3  column-left">
                <img src="/images/tree_with_spring_2.png" className="img-fluid shadow-img d-block mx-auto"
                     alt="Logo"
                     style={{maxHeight: '600px'}}/>
            </div>
            <div id="column-right" className="col-12 col-md-10 ms-md-auto mt-md-auto column-right">
                <h1 className="h3 mb-2">Lista użytkowników</h1>
                <hr/>
                <div className="card">
                    <InputSwitch checked={rowClick} onChange=
                        {(e) => setRowClick(e.value)} />
                    <DataTable value={users}
                               removableSort
                               selection={selectedUsers}
                               onSelectionChange={(e) => setSelectedUsers(e.value)} dataKey="id"
                               tableStyle={{ minWidth: '50rem' }}>
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="id" sortable></Column>
                        <Column field="firstName" header="Imię" sortable></Column>
                        <Column field="lastName" header="Nazwisko" sortable></Column>
                        <Column field="roles" header="Role" sortable body={(rowData) => (
                            rowData.roles.map((role) => role.type).join(', ')
                        )} />
                        <Column field="email" header="E-mail"></Column>
                        <Column field="age" header="Wiek" sortable></Column>
                        <Column field="dob" header="Data urodzenia" sortable></Column>
                    </DataTable>
                </div>

                <hr/>

            </div>
        </>
    );
};
export default AdminUserList;