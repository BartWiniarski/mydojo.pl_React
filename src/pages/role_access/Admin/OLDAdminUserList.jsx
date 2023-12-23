import {useEffect, useState} from "react";
import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import UserAddDialog from "../../../components/Admin/UserCRUD/UserAddDialog.jsx";
import UserEditDialogAdmin from "../../../components/Admin/UserCRUD/UserEditDialogAdmin.jsx";
import UserDeleteDialog from "../../../components/Admin/UserCRUD/UserDeleteDialog.jsx";

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const axiosInstanceToken = useAxiosInstanceToken();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: null,
        email: "",
        roles: "",
        enabled: ""
    });

    const resetMessages = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleInputChange = (data) => {
        setFormData(data);
    };

    useEffect(() => {
        fetchUsers();
    }, [axiosInstanceToken]);

    useEffect(() => {
        if (selectedUser) {
            setFormData({
                id: selectedUser.id,
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                dob: selectedUser.dob,
                email: selectedUser.email,
                roles: selectedUser.roles,
                enabled: selectedUser.enabled
            });
        }
    }, [selectedUser]);


// FETCHING USERS
    const fetchUsers = async () => {
        try {
            const response =
                await axiosInstanceToken.get("/admin/users");
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

// ADDING NEW USER
    const handleNewUser = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!formData.firstName.trim() ||
            !formData.lastName.trim() ||
            !formData.dob ||
            !formData.email.trim() ||
            !formData.roles) {
            setErrorMessage('Wszystkie pola są wymagane!');
            return;
        }

        try {
            const response =
                await axiosInstanceToken.post("/admin/users", formData);
            setSuccessMessage('Nowy użytkownik dodany!');
            fetchUsers();
        } catch (error) {
            if (!error?.response) {
                setErrorMessage("Brak odpowiedzi serwera")
            } else if (error.response?.status === 409) {
                setErrorMessage('Użytkownik o podanym e-mail już istnieje!');
            } else {
                setErrorMessage("Dodwanie nowego użytkownika zakończone niepowodzeniem")
            }
        }
    };

// UPDATE USER
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!formData.firstName.trim() ||
            !formData.lastName.trim() ||
            !formData.dob ||
            !formData.email.trim() ||
            !formData.roles) {
            setErrorMessage('Wszystkie pola są wymagane!');
            return;
        }

        try {
            const response =
                await axiosInstanceToken.put(`/admin/users/${selectedUser.id}`, formData);
            setSuccessMessage('Aktualizacja profilu zakończona sukcesem!');
            fetchUsers();
        } catch (error) {
            if (!error?.response) {
                setErrorMessage("Brak odpowiedzi serwera")
            } else if (error.response?.status === 409) {
                setErrorMessage('Użytkownik o podanym e-mail już istnieje!');
            } else {
                setErrorMessage("Aktualizacja profilu zakończona niepowodzeniem")
            }
        }
    };

// DELETE USER
    const handleDeleteUser = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response =
                await axiosInstanceToken.delete(`/admin/users/${selectedUser.id}`, formData);
            setSuccessMessage('Użytkownik usunięty');
            fetchUsers();
        } catch (error) {
            if (!error?.response) {
                setErrorMessage("Brak odpowiedzi serwera")
            } else {
                setErrorMessage("Usunięcie użytkownika zakończone niepowodzeniem")
            }
        }
    };

// CHANGE USER STATUS
    const handleUserStatusChange = async (selectedUser) => {
        try {
            const response =
                await axiosInstanceToken.post(`/admin/users/status/${selectedUser.id}`);
            fetchUsers();
        } catch (error) {
            if (!error?.response) {
                setErrorMessage("Brak odpowiedzi serwera")
            } else {
                setErrorMessage("Zmiana statusu użytkownika zakończona niepowodzeniem")
            }
        }
    };

// TABLE ROW EXPAND
    const rowExpansion = (data) => {
        return (
            <div className="p-3 card">
                <h5 className="fw-bold">{data.firstName} {data.lastName}</h5>
                <hr/>
                <p className="fw-bold">Rola: {data.roles.map((role) => role.type).join(', ')}</p>
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
                                setSelectedUser(data);
                                setEditDialogVisible(true);
                            }}>
                        edytuj
                    </button>
                    {data.enabled ?
                        <button type="submit" className="btn btn-danger shadow-lg mx-2 rounded-4"
                                onClick={() => {
                                    handleUserStatusChange(data)
                                }}>
                            zablokuj
                        </button>
                        :
                        <button type="submit" className="btn btn-success shadow-lg mx-2 rounded-4"
                                onClick={() => {
                                    handleUserStatusChange(data)
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
                    <DataTable value={users} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                               rowExpansionTemplate={rowExpansion} dataKey="id" className="p-datatable-striped">
                        <Column expander style={{width: '3em'}}/>
                        <Column field="firstName" header="Imię" sortable/>
                        <Column field="lastName" header="Nazwisko" sortable/>
                        <Column field="roles" header="Role" sortable
                                body={(rowData) => rowData.roles.map((role) => role.type).join(', ')}/>
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
                            resetMessages();
                        }}
                        user={formData}
                        onFormSubmit={handleNewUser}
                        onInputChange={handleInputChange}
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                    />
                    <UserEditDialogAdmin
                        visible={editDialogVisible}
                        onHide={() => {
                            setEditDialogVisible(false);
                            resetMessages();
                        }}
                        user={formData}
                        onFormSubmit={handleUpdateUser}
                        onInputChange={handleInputChange}
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                    />
                    <UserDeleteDialog
                        visible={deleteDialogVisible}
                        onHide={() => {
                            setDeleteDialogVisible(false);
                            resetMessages();
                        }}
                        venue={selectedUser}
                        onDelete={handleDeleteUser}
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                    />
                </div>
                <hr/>
            </div>
        </>
    );
}
export default AdminUserList;