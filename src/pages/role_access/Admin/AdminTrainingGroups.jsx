import {Fieldset} from 'primereact/fieldset';
import React, {useEffect, useState} from "react";
import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import TrainingGroupAddDialogAdmin from "../../../components/Admin/TrainingGroupCRUD/TrainingGroupAddDialogAdmin.jsx";
import TrainingGroupEditDialogAdmin from "../../../components/Admin/TrainingGroupCRUD/TrainingGroupEditDialogAdmin.jsx";
import TrainingGroupDeleteDialogAdmin
    from "../../../components/Admin/TrainingGroupCRUD/TrainingGroupDeleteDialogAdmin.jsx";
import StudentsPickList from "../../../components/Admin/TrainingGroupCRUD/StudentsPickList.jsx";
import StudentsMultiSelect from "../../../components/Admin/TrainingGroupCRUD/StudentsMultiSelect.jsx";

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

    const handleEditClick = (groupData) => {
        setFormData(groupData);
        setEditDialogVisible(true);
    };

    const handleCloseDialog = () => {
        resetMessages();
        setFormData({name: "", description: "", date: null});
    }

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

        if (!formData.name.trim() ||
            !formData.description.trim()) {
            setErrorMessage('Wszystkie pola są wymagane!');
            return;
        }

        try {
            const response =
                await axiosInstanceToken.post("/admin/trainingGroups", formData);
            setSuccessMessage('Nowa grupa treningowa dodana!');
            fetchTrainingGroups();
        } catch (error) {
            if (!error?.response) {
                setErrorMessage("Brak odpowiedzi serwera")
            } else {
                setErrorMessage("Dodwanie nowej grupy treningowej zakończone niepowodzeniem")
            }
        }
    };

// UPDATE TRAINING GROUP
    const handleUpdateTrainingGroup = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!formData.name.trim() ||
            !formData.description.trim()) {
            setErrorMessage('Wszystkie pola są wymagane!');
            return;
        }

        try {
            const response =
                await axiosInstanceToken.put(`/admin/trainingGroups/${selectedTrainingGroup.id}`, formData);
            setSuccessMessage('Aktualizacja grupy treningowej zakończona sukcesem!');
            fetchTrainingGroups();
        } catch (error) {
            if (!error?.response) {
                setErrorMessage("Brak odpowiedzi serwera")
            } else {
                setErrorMessage("Aktualizacja grupy treningowej zakończona niepowodzeniem")
            }
        }
    };

// DELETE TRAINING GROUP
    const handleDeleteTrainingGroup = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response =
                await axiosInstanceToken.delete(`/admin/trainingGroups/${selectedTrainingGroup.id}`, formData);
            setSuccessMessage('Grupa treningowa usunięta');
            fetchTrainingGroups();
        } catch (error) {
            if (!error?.response) {
                setErrorMessage("Brak odpowiedzi serwera")
            } else {
                setErrorMessage("Usunięcie grupy treningowej zakończone niepowodzeniem")
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
                <p>Lokalizacja: </p>
                <p>Prowadzący: </p>

                <div className="text-left">
                    <button type="submit" className="btn btn-primary shadow-lg mx-2 rounded-4"
                            onClick={() => handleEditClick(data)}>
                        edytuj
                    </button>
                    <button type="submit" className="btn btn-primary shadow-lg mx-2 rounded-4"
                            onClick={() => {
                                setSelectedTrainingGroup(data);
                                setDeleteDialogVisible(true);
                            }}>
                        usuń
                    </button>
                </div>
            </div>
        )
    };


    return (
        <>
            <div id="column-left" className="col-12 col-md-2 mt-md-3  column-left">
                <img src="/images/kimono_3.png" className="img-fluid shadow-img d-block mx-auto mt-5"
                     alt="Logo"
                     style={{maxHeight: '600px'}}/>
            </div>
            <div id="column-right" className="col-12 col-md-10 ms-md-auto mt-md-auto column-right">
                <h1 className="h3 mb-2">Grupy treningowe</h1>
                <hr/>
                <button type="button" className="btn btn-primary shadow-lg my-3 rounded-4"
                        onClick={() => setAddDialogVisible(true)}>
                    dodaj nową grupe
                </button>
                <div className="card">
                    <div className="">
                        <hr/>
                        <Fieldset legend="Wszystkie grupy" toggleable collapsed={true}>
                            <hr/>
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
                        <hr/>
                    </div>
                    <div className="">
                        <Fieldset legend="Zarządzaj grupami" toggleable collapsed={true}>
                            <hr/>
                            {/*<div>*/}
                            {/*    <StudentsPickList/>*/}
                            {/*</div>*/}
                            {/*<hr/>*/}
                            <div>
                                <StudentsMultiSelect/>
                            </div>
                            <button type="submit" className="btn btn-primary shadow-lg mx-2 my-3 rounded-4">
                                zapisz
                            </button>
                        </Fieldset>
                        <hr/>
                    </div>
                </div>
                <TrainingGroupAddDialogAdmin
                    visible={addDialogVisible}
                    onHide={() => {
                        setAddDialogVisible(false);
                        handleCloseDialog()
                    }}
                    trainingGroup={formData}
                    onFormSubmit={handleNewTrainingGroup}
                    onInputChange={handleInputChange}
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                />
                <TrainingGroupEditDialogAdmin
                    visible={editDialogVisible}
                    onHide={() => {
                        setEditDialogVisible(false)
                        handleCloseDialog()
                    }}
                trainingGroup={formData}
                onFormSubmit={handleUpdateTrainingGroup}
                onInputChange={handleInputChange}
                successMessage={successMessage}
                errorMessage={errorMessage}
                />
                <TrainingGroupDeleteDialogAdmin
                    visible={deleteDialogVisible}
                    onHide={() => {
                        setDeleteDialogVisible(false);
                        resetMessages();
                    }}
                    trainingGroup={selectedTrainingGroup}
                    onDelete={handleDeleteTrainingGroup}
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                />
            </div>
        </>
    );
}

export default AdminTrainingGroups;
