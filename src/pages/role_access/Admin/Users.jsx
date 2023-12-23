import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";
import {useEffect, useState} from "react";
import getUsers from "../../../axios/users/getUsers.jsx";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import UserAddDialog from "../../../components/Admin/UserCRUD/UserAddDialog.jsx";
import UserDeleteDialog from "../../../components/Admin/UserCRUD/UserDeleteDialog.jsx";
import postStatus from "../../../axios/users/postStatus.jsx";


function Users() {

    const axiosInstanceToken = useAxiosInstanceToken();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [usersRefresh, setUsersRefresh] = useState(true)
    const [expandedRows, setExpandedRows] = useState(null);
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [editDialogVisible, setEditDialogVisible] = useState(false);


    const refreshUsers = () => {
        setUsersRefresh(true);
    };

    const handleUserStatusChange = (user) => {
        postStatus(axiosInstanceToken, user, () => {
            refreshUsers();
        });
    };

    useEffect(() => {
        if (usersRefresh) {
            getUsers(axiosInstanceToken, setUsers);
            setUsersRefresh(false);
        }
    }, [usersRefresh]);


    const rowExpansion = (data) => {
        return (
            <div className="p-3 card">
                <h5 className="fw-bold">{data.firstName} {data.lastName}</h5>
                <hr/>
                <p className="fw-bold">Rola:
                    {data.roles.map
                    ((role) => role.type).join(', ')
                    }
                </p>
                <p>Email: {data.email}</p>
                <p>Data urodzenia: {data.dob}</p>
                <p>Wiek: {data.age}</p>
                <p>Status: {data.enabled ?
                    <span className="badge bg-success">aktywny</span>
                    : <span className="badge bg-danger">zablokowany</span>}
                </p>
                <div className="text-left">
                    <button type="submit" className="btn btn-primary shadow-lg mx-2 rounded-4"
                            onClick={() => {
                                // setSelectedUser(data);
                                // setEditDialogVisible(true);
                            }}>
                        edytuj
                    </button>
                    {data.enabled ?
                        <button type="submit" className="btn btn-danger shadow-lg mx-2 rounded-4"
                                onClick={() => {
                                    handleUserStatusChange(data);
                                }}>
                            zablokuj
                        </button>
                        :
                        <button type="submit" className="btn btn-success shadow-lg mx-2 rounded-4"
                                onClick={() => {
                                    handleUserStatusChange(data);
                                }}>
                            aktywuj
                        </button>}
                    <button type="submit" className="btn btn-primary shadow-lg mx-2 rounded-4"
                            onClick={() => {
                                setSelectedUser(data);
                                setDeleteDialogVisible(true);
                            }}>
                        usuń
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div id="column-left" className="col-12 col-md-2 mt-md-3 column-left ">
                <img src="/images/meditating_1.png" className="img-fluid shadow-img d-block mx-auto mt-5"
                     alt="Logo"
                     style={{maxHeight: '600px'}}/>
            </div>
            <div id="column-right" className="col-12 col-md-10 ms-md-auto mt-md-auto column-right">
                <h1 className="h3 mb-2">Lista użytkowników</h1>
                <hr/>
                <button type="button" className="btn btn-primary shadow-lg my-3 rounded-4"
                        onClick={() => setAddDialogVisible(true)}>
                    dodaj nowego użytkownika
                </button>
                <div className="card">
                    <DataTable value={users}
                               expandedRows={expandedRows}
                               onRowToggle={(e) =>
                                   setExpandedRows(e.data)}
                               rowExpansionTemplate={rowExpansion}
                               dataKey="id"
                               className="p-datatable-striped">
                        <Column expander style={{width: '3em'}}/>
                        <Column field="firstName" header="Imię" sortable/>
                        <Column field="lastName" header="Nazwisko" sortable/>
                        <Column field="roles" header="Role" sortable
                                body={(rowData) =>
                                    rowData.roles.map(
                                        (role) => role.type).join(', ')
                                }/>
                        <Column field="enabled" header="Status" sortable
                                body={(rowData) => (
                                    rowData.enabled
                                        ? <span className="badge bg-success">aktywny</span>
                                        : <span className="badge bg-danger">zablokowany</span>
                                )}
                        />
                    </DataTable>
                    <UserAddDialog
                        visible={addDialogVisible}
                        onHide={() => {
                            setAddDialogVisible(false);
                        }}
                        onSuccess={refreshUsers}
                    />
                    {/*<UserEditDialogAdmin*/}
                    {/*    visible={editDialogVisible}*/}
                    {/*    onHide={() => {*/}
                    {/*        setEditDialogVisible(false);*/}
                    {/*        resetMessages();*/}
                    {/*    }}*/}
                    {/*    user={formData}*/}
                    {/*    onFormSubmit={handleUpdateUser}*/}
                    {/*    onInputChange={handleInputChange}*/}
                    {/*    successMessage={successMessage}*/}
                    {/*    errorMessage={errorMessage}*/}
                    {/*/>*/}
                    <UserDeleteDialog
                        visible={deleteDialogVisible}
                        onHide={() => {
                            setDeleteDialogVisible(false);
                        }}
                        user={selectedUser}
                        onSuccess={refreshUsers}
                    />
                </div>
                <hr/>
            </div>
        </>
    );
}

export default Users;