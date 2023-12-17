import {Fieldset} from 'primereact/fieldset';
import React, {useEffect, useState} from "react";
import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import TrainingGroupAddDialogAdmin from "../../../components/Admin/TrainingGroupCRUD/TrainingGroupAddDialogAdmin.jsx";
import TrainingGroupEditDialogAdmin from "../../../components/Admin/TrainingGroupCRUD/TrainingGroupEditDialogAdmin.jsx";
import TrainingGroupDeleteDialogAdmin
    from "../../../components/Admin/TrainingGroupCRUD/TrainingGroupDeleteDialogAdmin.jsx";
import TrainingGroupsSelect from "../../../components/Admin/TrainingGroupCRUD/TrainingGroupsSelect.jsx";
import TrainersMultiSelect from "../../../components/Admin/TrainingGroupCRUD/TrainersMultiSelect.jsx";
import StudentsMultiSelect from "../../../components/Admin/TrainingGroupCRUD/StudentsMultiSelect.jsx";


function AdminTrainingGroups() {
    const [availableTrainingGroups, setAvailableTrainingGroups] = useState([]);
    const [availableTrainers, setAvailableTrainers] = useState([]);
    const [availableStudents, setAvailableStudents] = useState([]);
    const [selectedTrainingGroup, setSelectedTrainingGroup] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedTrainers, setSelectedTrainers] = useState([])
    const [selectedStudents, setSelectedStudents] = useState(null)

    const [expandedRows, setExpandedRows] = useState(null);
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const axiosInstanceToken = useAxiosInstanceToken();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        schedule: ""
    });
    const daysOfWeekMap = {
        MONDAY: 'Poniedziałek',
        TUESDAY: 'Wtorek',
        WEDNESDAY: 'Środa',
        THURSDAY: 'Czwartek',
        FRIDAY: 'Piątek',
        SATURDAY: 'Sobota',
        SUNDAY: 'Niedziela'
    };


    useEffect(() => {
        fetchTrainingGroups();
        fetchTrainers();
        fetchStudents();
    }, [axiosInstanceToken]);

    useEffect(() => {
        if (!selectedGroup) {
            setSelectedTrainers([]);
            setSelectedStudents([]);
        } else {
            const group = availableTrainingGroups.find(group => group.id === selectedGroup);
            setSelectedTrainers(group.trainers);
            setSelectedStudents(group.students);
        }
    }, [selectedGroup, availableTrainingGroups]);


    const resetMessages = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleInputChange = (data) => {
        setFormData(data);
    };

    const handleCloseDialog = () => {
        resetMessages();
        setFormData({name: "", description: "", schedule: ""});
    }

// FETCHING TRAINING GROUPS
    const fetchTrainingGroups = async () => {
        try {
            const response =
                await axiosInstanceToken.get("/admin/trainingGroups");
            setAvailableTrainingGroups(response.data);
        } catch (error) {
            console.log(error);
        }
    }

// FETCHING TRAINERS
    const fetchTrainers = async () => {
        try {
            const response = await axiosInstanceToken.get("/admin/trainers");
            setAvailableTrainers(response.data);
        } catch (error) {
            console.error("Error fetching availableTrainers:", error);
        }
    };

// FETCHING STUDENTS
    const fetchStudents = async () => {
        try {
            const response = await axiosInstanceToken.get("/admin/students");
            setAvailableStudents(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

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

// UPDATE TRAINING GROUP BASIC
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

// UPDATE TRAINING GROUP DETAILS
    const handleUpdateTrainingGroupDetails = async (e) => {
        setSuccessMessage('');
        setErrorMessage('');

        const updatedTrainingGroup = {
            trainers: selectedTrainers,
            students: selectedStudents,
        };

        try {
            const response = await axiosInstanceToken.put(
                `/admin/trainingGroups/${selectedGroup}`,
                updatedTrainingGroup
            );
            setSuccessMessage('Aktualizacja grupy treningowej zakończona sukcesem!');
            fetchTrainingGroups();
        } catch (error) {
            if (!error?.response) {
                setErrorMessage('Brak odpowiedzi serwera');
            } else {
                setErrorMessage('Aktualizacja grupy treningowej zakończona niepowodzeniem');
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
            setSelectedGroup(null);
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
    const rowExpansion = (data) => {

        const getTrainerNameById = (trainerId) => {
            const trainer = availableTrainers.find((trainer) => trainer.id === trainerId);
            if (trainer) {
                return `${trainer.firstName} ${trainer.lastName}`;
            }
            return "Brak danych o trenerze";
        };

        return (
            <div className="p-3 card">
                <h5 className="fw-bold">{data.name}</h5>
                <hr/>
                <p>Opis grupy: {data.description}</p>
                <p>Lokalizacja: </p>
                <p>Harmonogram zajęć:
                    <ul>
                        {Object.entries(data.schedule).length > 0 ? (
                            Object.entries(data.schedule).map(([day, time]) => (
                                <li key={day}> {daysOfWeekMap[day] || day}: {time} </li>
                            ))
                        ) : (
                            <span> Brak harmonogramu zajęć</span>
                        )}
                    </ul>
                </p>
                <p>Trenerzy:
                    <ul>
                        {data.trainers.length > 0 ? (
                            data.trainers.map((trainerId) => (
                                <li key={trainerId}> {getTrainerNameById(trainerId)} </li>
                            ))
                        ) : (
                            <span> Brak trenerów</span>
                        )}
                    </ul>
                </p>
                <p>Liczba uczestników: {data.students.length !== 0 ? data.students.length : "Brak uczestników"}</p>

                <div className="text-left">
                    <button type="submit" className="btn btn-primary shadow-lg mx-2 rounded-4"
                            onClick={() => {
                                setSelectedTrainingGroup(data);
                                setFormData({
                                    name: data.name,
                                    description: data.description,
                                    schedule: data.schedule
                                });
                                setEditDialogVisible(true);
                            }}>
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
                            <DataTable value={availableTrainingGroups}
                                       expandedRows={expandedRows}
                                       onRowToggle={(e) => setExpandedRows(e.data)}
                                       rowExpansionTemplate={rowExpansion} dataKey="id"
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
                            <div>
                                <TrainingGroupsSelect
                                    availableTrainingGroups={availableTrainingGroups}
                                    selectedGroup={selectedGroup}
                                    setSelectedGroup={setSelectedGroup}
                                />
                            </div>
                            <hr/>
                            <div>
                                <TrainersMultiSelect
                                    availableTrainers={availableTrainers}
                                    selectedTrainers={selectedTrainers}
                                    setSelectedTrainers={setSelectedTrainers}
                                />
                            </div>
                            <hr/>
                            <div>
                                <StudentsMultiSelect
                                    availableStudents={availableStudents}
                                    selectedStudents={selectedStudents}
                                    setSelectedStudents={setSelectedStudents}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary shadow-lg mx-2 my-3 rounded-4"
                                    onClick={() => handleUpdateTrainingGroupDetails()}>
                                zapisz
                            </button>
                            {successMessage && (
                                <div className="alert alert-success mt-3 text-center rounded-4">{successMessage}</div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger mt-3 text-center">{errorMessage}</div>
                            )}
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
