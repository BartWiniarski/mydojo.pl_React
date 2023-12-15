import { Fieldset } from 'primereact/fieldset';
import React, {useEffect, useState} from "react";
import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import UserAddDialogAdmin from "../../../components/Admin/UserCRUD/AdminUserAddDialog.jsx";
import TrainingGroupAddDialogAdmin from "../../../components/Admin/TrainingGroupCRUD/AdminTrainingGroupAddDialog.jsx";


function AdminTrainingGroups() {
    const [expandedRows, setExpandedRows] = useState(null);
    const [trainingGroups, setTrainingGroups] = useState([]);
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectedTrainingGroup, setSelectedTrainingGroup] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const axiosInstanceToken = useAxiosInstanceToken();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: null,
    });

    useEffect(() => {
        fetchTrainingGroups();
    }, [axiosInstanceToken]);

    const resetMessages = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleInputChange = (data) => {
        setFormData(data);
    };

// FETCHING TRAINING GROUPS
    const fetchTrainingGroups = async () => {
        try {
            const response =
                await axiosInstanceToken.get("/admin/trainingGroups");
            setTrainingGroups(response.data);
        } catch (error) {
            console.log(error);
        }
    }


// ADDING NEW TRAINING GROUP
    const handleNewTrainingGroup = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        // if (!formData.firstName.trim() ||
        //     !formData.lastName.trim() ||
        //     !formData.dob ||
        //     !formData.email.trim() ||
        //     !formData.roles ) {
        //     setErrorMessage('Wszystkie pola są wymagane!');
        //     return;
        // }

        try {
            const response =
                await axiosInstanceToken.post("/admin/trainingGroups", formData);
            setSuccessMessage('Nowa grupa treningowa dodana!');
            fetchTrainingGroups();
        } catch (error) {
            if (!error?.response) {
                setErrorMessage("Brak odpowiedzi serwera")
            // } else if (error.response?.status === 409) {
            //     setErrorMessage('Użytkownik o podanym e-mail już istnieje!');
            } else {
                setErrorMessage("Dodwanie nowej grupy treningowej zakończone niepowodzeniem")
            }
        }
    };


// TABLE ROW EXPAND
    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3 card">
                <h5 className="fw-bold">{data.name}</h5>
                <hr/>
                <p>Opis grupy: {data.description}</p>

                <div className="text-left">
                    <button type="submit" className="btn btn-primary shadow-lg mx-2 rounded-4">
                        edytuj
                    </button>
                    <button type="submit" className="btn btn-primary shadow-lg mx-2 rounded-4">
                        usuń
                    </button>
                </div>
            </div>
        );
    };


    return (
        <>
            <div id="column-left" className="col-12 col-md-2 mt-md-3  column-left">
                <img src="/images/kimono_3.png" className="img-fluid shadow-img d-block mx-auto"
                     alt="Logo"
                     style={{ maxHeight: '600px' }} />
            </div>
            <div id="column-right" className="col-12 col-md-10 ms-md-auto mt-md-auto column-right">
                <h1 className="text-center">Grupy treningowe</h1>
                <hr/>
                <button type="button" className="btn btn-primary shadow-lg my-3 rounded-4"
                        onClick={() => setAddDialogVisible(true)}>
                    dodaj nową grupe
                </button>
                <div className="card">
                    <div className="">
                        <Fieldset legend="Wszystkie grupy" toggleable>
                            <DataTable value={trainingGroups}
                                       expandedRows={expandedRows}
                                       onRowToggle={(e) => setExpandedRows(e.data)}
                                       rowExpansionTemplate={rowExpansionTemplate} dataKey="id"
                                       className="p-datatable-striped">
                                <Column expander style={{width: '3em'}}/>
                                <Column field="name" header="Nazwa grupy" sortable/>
                                <Column field="description" header="Opis grupy" sortable/>
                            </DataTable>
                        </Fieldset>
                    </div>
                    <div className="">
                        <Fieldset legend="Zarządzaj grupami" toggleable>
                            TBD
                        </Fieldset>
                    </div>
                </div>
                <TrainingGroupAddDialogAdmin
                    visible={addDialogVisible}
                    onHide={() => {
                        setAddDialogVisible(false);
                        resetMessages();}}
                    trainingGroup={formData}
                    onFormSubmit={handleNewTrainingGroup}
                    onInputChange={handleInputChange}
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                />
            </div>
        </>
    );
}

export default AdminTrainingGroups;
