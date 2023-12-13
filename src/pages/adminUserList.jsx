import {useState, useEffect} from "react";
import useAxiosInstanceToken from "../hooks/useAxiosInstanceToken.jsx";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Dialog} from 'primereact/dialog';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const axiosInstanceToken = useAxiosInstanceToken();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: null,
        email: "",
    });

    useEffect(() => {
        fetchUsers();
    }, [axiosInstanceToken]);

    useEffect(() => {
        if (selectedUser) {
            setFormData({
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                dob: selectedUser.dob,
                email: selectedUser.email,
            });
        }
    }, [selectedUser]);


// POBIERANIE GETEM
    const fetchUsers = async () => {
        try {
            const response =
                await axiosInstanceToken.get("/admin/users");
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }


// WYSYŁANIE PUTEM
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!formData.firstName.trim() ||
            !formData.lastName.trim() ||
            !formData.dob ||
            !formData.email.trim()) {
            setErrorMessage('Wszystkie pola są wymagane!');
            return;
        }

        try {
            const response =
                await axiosInstanceToken.put(`/admin/users/${selectedUser.id}`, formData);
            setSuccessMessage('Aktualizacja profilu zakończona sukcesem!');
            fetchUsers();
            // setEditDialogVisible(false);
        } catch (error) {
            if (!error?.response) {
                setErrorMessage("Brak odpowiedzi serwera.")
            } else if (error.response?.status === 409) {
                setErrorMessage('Użytkownik o podanym e-mail już istnieje!');
            } else {
                setErrorMessage("Aktualizacja profilu zakończona niepowodzeniem.")
            }
        }
    };

// ROZWIJANIE WIERSZA
    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3 card">
                <h5 className="fw-bold">{data.firstName} {data.lastName}</h5>
                <p className="fw-bold">Rola: {data.roles.map((role) => role.type).join(', ')}</p>
                <p>Email: {data.email}</p>
                <p>Data urodzenia: {data.dob}</p>
                <p>Wiek: {data.age}</p>
                <div className="text-left">
                    <button type="submit" className="btn btn-primary shadow-lg mt-3 rounded-4" onClick={() => {
                        setSelectedUser(data);
                        setEditDialogVisible(true);
                    }}>
                        edytuj
                    </button>
                </div>
            </div>
        );
    };

// MODAL / DIALOG
    const renderEditDialog = () => {

        return (
            <Dialog header="Edycja użytkownika" visible={editDialogVisible} style={{width: '50vw'}}
                    onHide={() => {
                        setEditDialogVisible(false)
                        setSuccessMessage('')
                        setErrorMessage('')
                    }}>
                <div className="p-2">
                    <label htmlFor="InputFirstName">Imię</label>
                    <input type="text" className="form-control"
                           id="InputFirstName"
                           value={formData.firstName} onChange={(e) =>
                        setFormData({...formData, firstName: e.target.value})}/>
                </div>
                {/* ... (TODO:Pozostałe pola formularza) */}
                <button type="button" className="btn btn-primary shadow-lg mt-3 rounded-4" onClick={handleFormSubmit}>
                    zapisz
                </button>
                {successMessage && (
                    <div className="alert alert-success mt-3 text-center rounded-4">{successMessage}</div>
                )}
                {errorMessage && (
                    <div className="alert alert-danger mt-3 text-center">{errorMessage}</div>
                )}
            </Dialog>
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
                    {renderEditDialog()}
                </div>
                <hr/>
            </div>
        </>
    );
}
export default AdminUserList;