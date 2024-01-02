import React, {useEffect, useState} from "react";
import {Fieldset} from 'primereact/fieldset';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";
import getTrainingGroups from "../../../axios/training groups/getTrainingGroups.jsx";
import getTrainers from "../../../axios/trainers/getTrainers.jsx";
import getStudents from "../../../axios/students/getStudents.jsx";
import getVenues from "../../../axios/venues/getVenues.jsx";
import getSchedules from "../../../axios/schedules/getSchedules.jsx";
import putTrainingGroup from "../../../axios/training groups/putTrainingGroup.jsx";
import TrainingGroupAddDialog from "../../../components/Admin/TrainingGroupCRUD/TrainingGroupAddDialog.jsx";
import TrainingGroupEditDialog from "../../../components/Admin/TrainingGroupCRUD/TrainingGroupEditDialog.jsx";
import TrainingGroupDeleteDialog from "../../../components/Admin/TrainingGroupCRUD/TrainingGroupDeleteDialog.jsx";
import TrainingGroupsSelect from "../../../components/Admin/TrainingGroupSelects/TrainingGroupsSelect.jsx";
import TrainersMultiSelect from "../../../components/Admin/TrainingGroupSelects/TrainersMultiSelect.jsx";
import StudentsMultiSelect from "../../../components/Admin/TrainingGroupSelects/StudentsMultiSelect.jsx";
import ScheduleAddDialog from "../../../components/Admin/ScheduleCRUD/ScheduleAddDialog.jsx";
import ScheduleDeleteDialog from "../../../components/Admin/ScheduleCRUD/ScheduleDeleteDialog.jsx";
import ScheduleEditDialog from "../../../components/Admin/ScheduleCRUD/ScheduleEditDialog.jsx";


function TrainingGroups() {
    const [trainingGroupRefresh, setTrainingGroupRefresh] = useState(true);
    const [schedulesRefresh, setSchedulesRefresh] = useState(true);
    const [availableTrainingGroups, setAvailableTrainingGroups] = useState([]);
    const [availableTrainers, setAvailableTrainers] = useState([]);
    const [availableStudents, setAvailableStudents] = useState([]);
    const [availableVenues, setAvailableVenues] = useState([]);
    const [availableSchedules, setAvailableSchedules] = useState([]);

    const [selectedTrainingGroup, setSelectedTrainingGroup] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedGroupForSchedule, setSelectedGroupForSchedule] = useState(null);
    const [selectedGroupSchedules, setSelectedGroupSchedules] = useState(null);
    const [selectedTrainers, setSelectedTrainers] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const [expandedRows, setExpandedRows] = useState(null);
    const [addTrainingGroupDialogVisible, setAddTrainingGroupDialogVisible] = useState(false);
    const [editTrainingGroupDialogVisible, setEditTrainingGroupDialogVisible] = useState(false);
    const [deleteTrainingGroupDialogVisible, setDeleteTrainingGroupDialogVisible] = useState(false);
    const [addScheduleDialogVisible, setAddScheduleDialogVisible] = useState(false);
    const [editScheduleDialogVisible, setEditScheduleDialogVisible] = useState(false);
    const [deleteScheduleDialogVisible, setDeleteScheduleDialogVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const axiosInstanceToken = useAxiosInstanceToken();

    useEffect(() => {
        getTrainers(axiosInstanceToken, setAvailableTrainers);
        getStudents(axiosInstanceToken, setAvailableStudents);
        getVenues(axiosInstanceToken, setAvailableVenues);
        getSchedules(axiosInstanceToken, setAvailableSchedules);
    }, []);

    const daysOfWeekMap = {
        MONDAY: 'Poniedziałek',
        TUESDAY: 'Wtorek',
        WEDNESDAY: 'Środa',
        THURSDAY: 'Czwartek',
        FRIDAY: 'Piątek',
        SATURDAY: 'Sobota',
        SUNDAY: 'Niedziela'
    };

    const formatDayOfWeek = (dayOfWeek) => daysOfWeekMap[dayOfWeek] || dayOfWeek;

    const formatTime = (time) => {
        const timeParts = time.split(':');
        return `${timeParts[0]}:${timeParts[1]}`;
    };

    const getTrainerNameById = (trainerId) => {
        const trainer = availableTrainers.find(
            (trainer) => trainer.id === trainerId);
        if (trainer) {
            return `${trainer.firstName} ${trainer.lastName}`;
        }
        return "Brak danych o trenerze";
    };

    const getStudentNameById = (studentId) => {
        const student = availableStudents.find(
            (student) => student.id === studentId);
        if (student) {
            return `${student.firstName} ${student.lastName}`;
        }
        return "Brak danych o uczniu";
    };

    const getVenueNameById = (venueId) => {
        const venue = availableVenues.find(
            (venue) => venue.id === venueId);
        if (venue) {
            return `${venue.name}`;
        }
        return "Brak danych o lokalizacji";
    }

    const resetMessages = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };

    const refreshTrainingGroups = () => {
        setTrainingGroupRefresh(true);
    };

    const refreshSchedules = () => {
        setSchedulesRefresh(true);
    }

    const refreshAll = () => {
        refreshTrainingGroups();
        refreshSchedules();
    };

    useEffect(() => {
        if (trainingGroupRefresh) {
            getTrainingGroups(axiosInstanceToken, setAvailableTrainingGroups);
            setTrainingGroupRefresh(false);
        }
    }, [trainingGroupRefresh]);

    useEffect(() => {
        if (schedulesRefresh) {
            getSchedules(axiosInstanceToken, setAvailableSchedules);
            setSchedulesRefresh(false);
        }
    }, [schedulesRefresh]);

    useEffect(() => {
        if (!selectedGroup) {
            setSelectedTrainers([]);
            setSelectedStudents([]);
        } else {
            const group = availableTrainingGroups.find(
                group => group.id === selectedGroup);
            setSelectedTrainers(group.trainersId);
            setSelectedStudents(group.studentsId);
        }
    }, [selectedGroup, availableTrainingGroups]);

    useEffect(() => {
        if (!selectedGroupForSchedule) {
            setSelectedGroupSchedules([]);
        } else {
            const filteredSchedules = availableSchedules.filter(
                schedule => schedule.trainingGroupId === selectedGroupForSchedule);
            setSelectedGroupSchedules(filteredSchedules);
        }
    }, [selectedGroupForSchedule, availableSchedules]);

    const handleUpdateTrainingGroupUsers = () => {

        let updatedTrainingGroup = {
            id: selectedGroup,
            trainersId: selectedTrainers,
            studentsId: selectedStudents,
        };

        putTrainingGroup(axiosInstanceToken, updatedTrainingGroup, (message) => {
            setSuccessMessage(message);
            setErrorMessage("")
            setTrainingGroupRefresh(true);
        }, setErrorMessage);

    };

    const handleEditSchedule = (schedule) => {
        setSelectedSchedule(schedule);
        setEditScheduleDialogVisible(true);
    };

    const handleDeleteSchedule = (schedule) => {
        setSelectedSchedule(schedule);
        setDeleteScheduleDialogVisible(true);
    };

// TABLE ROW EXPAND
    const rowExpansion = (data) => {

        return (
            <div className="p-3 card">
                <h5 className="fw-bold">{data.name}</h5>
                <hr/>
                <p>Opis grupy: {data.description}</p>
                <p>Harmonogram zajęć: </p>
                <div>
                    <ul>
                        {availableSchedules.filter(schedule => schedule.trainingGroupId === data.id)
                            .map((schedule, index) => (
                                <li key={index}>
                                    {formatDayOfWeek(schedule.dayOfWeek)}, {' '}
                                    {formatTime(schedule.time)}, {' '}
                                    {getVenueNameById(schedule.venueId)}
                                </li>
                            ))}
                    </ul>
                </div>
                <p>Liczba uczestników:
                    {' '}{data.studentsId.length !== 0 ?
                        data.studentsId.length : "Brak uczniów"}
                </p>
                <p>Trenerzy:</p>
                <div>
                    <ul>
                        {data.trainersId.length > 0 ? (
                            data.trainersId.map((trainerId,index) => (
                                <li key={index}> {getTrainerNameById(trainerId)} </li>
                            ))
                        ) : (
                            <span> Brak trenerów</span>
                        )}
                    </ul>
                </div>
                <p>Uczestnicy:</p>
                <div>
                    <ul>
                        {data.studentsId.length > 0 ? (
                            data.studentsId.map((studentId,index) => (
                                <li key={index}> {getStudentNameById(studentId)} </li>
                            ))
                        ) : (
                            <span> Brak uczniów</span>
                        )}
                    </ul>
                </div>
                <div className="text-left">
                    <button type="submit"
                            className="btn btn-primary btn-sm shadow-lg mx-2 rounded-4"
                            onClick={() => {
                                setSelectedTrainingGroup(data);
                                setEditTrainingGroupDialogVisible(true);
                            }}>
                        edytuj
                    </button>
                    <button type="submit"
                            className="btn btn-danger btn-sm shadow-lg mx-2 rounded-4"
                            onClick={() => {
                                setSelectedTrainingGroup(data);
                                setDeleteTrainingGroupDialogVisible(true);
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
                <img src="/images/kimono_3.png"
                     className="img-fluid shadow-img d-block mx-auto mt-5"
                     alt="Logo"
                     style={{maxHeight: '600px'}}/>
            </div>
            <div id="column-right"
                 className="col-12 col-md-10 ms-md-auto mt-md-auto column-right">
                <h1 className="h3 mb-2">Grupy treningowe</h1>
                <hr/>
                <button type="button"
                        className="btn btn-primary shadow-lg my-3 rounded-4"
                        onClick={() => setAddTrainingGroupDialogVisible(true)}>
                    dodaj nową grupę
                </button>
                <div className="card">
                    <div className="">
                        <hr/>
                        <Fieldset legend="Wszystkie grupy"
                                  toggleable collapsed={true}>
                            <hr/>
                            <DataTable value={availableTrainingGroups}
                                       expandedRows={expandedRows}
                                       onRowToggle={(e) =>
                                           setExpandedRows(e.data)}
                                       rowExpansionTemplate={rowExpansion}
                                       dataKey="id"
                                       className="p-datatable-striped">
                                <Column expander style={{width: '3em'}}/>
                                <Column field="name" header="Nazwa grupy" sortable/>
                                <Column field="description" header="Opis grupy" sortable/>
                            </DataTable>
                        </Fieldset>
                        <hr/>
                    </div>
                    <div className="">
                        <Fieldset legend="Zarządzaj harmonogramami"
                                  toggleable collapsed={true}>
                            <hr/>
                            <div>
                                <TrainingGroupsSelect
                                    availableTrainingGroups={availableTrainingGroups}
                                    selectedGroup={selectedGroupForSchedule}
                                    setSelectedGroup={(group) => {
                                        resetMessages();
                                        setSelectedGroupForSchedule(group);
                                    }}
                                />
                                <hr/>
                                <DataTable value={selectedGroupSchedules}
                                           dataKey="id"
                                           className="p-datatable-striped">
                                    <Column field="dayOfWeek" header="Dzień"
                                            body={(rowData) => formatDayOfWeek(rowData.dayOfWeek)}/>
                                    <Column field="time" header="Godzina"
                                            body={(rowData) => formatTime(rowData.time)}/>
                                    <Column field="venueId" header="Lokalizacja"
                                            body={(rowData) => getVenueNameById(rowData.venueId)}/>
                                    <Column header="Akcje" body={(rowData) => (
                                        <>
                                            <button type="button"
                                                    className="btn btn-primary btn-sm shadow-lg mx-2 rounded-4"
                                                    onClick={() => handleEditSchedule(rowData)}>
                                                edytuj
                                            </button>
                                            <button type="button"
                                                    className="btn btn-danger btn-sm shadow-lg mx-2 rounded-4"
                                                    onClick={() => handleDeleteSchedule(rowData)}>
                                                usuń
                                            </button>
                                        </>
                                    )}/>
                                </DataTable>
                            </div>
                            <hr/>
                            {selectedGroupForSchedule && (
                                <button type="button"
                                        className="btn btn-primary shadow-lg my-3 rounded-4"
                                        onClick={() =>
                                            setAddScheduleDialogVisible(true)
                                        }>
                                    dodaj nową jednostkę treningową
                                </button>
                            )}
                            {successMessage && (
                                <div className="alert alert-success mt-3 text-center rounded-4">{successMessage}</div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger mt-3 text-center">{errorMessage}</div>
                            )}
                        </Fieldset>
                        <hr/>
                    </div>
                    <div className="">
                        <Fieldset legend="Zarządzaj uczestnikami"
                                  toggleable collapsed={true}>
                            <hr/>
                            <div>
                                <TrainingGroupsSelect
                                    availableTrainingGroups={availableTrainingGroups}
                                    selectedGroup={selectedGroup}
                                    setSelectedGroup={(group) => {
                                        resetMessages();
                                        setSelectedGroup(group);
                                    }}
                                />
                            </div>
                            <hr/>
                            <div>
                                <TrainersMultiSelect
                                    availableTrainers={availableTrainers}
                                    selectedTrainers={selectedTrainers}
                                    setSelectedTrainers={(trainers) => {
                                        resetMessages();
                                        setSelectedTrainers(trainers);
                                    }}
                                />
                            </div>
                            <hr/>
                            <div>
                                <StudentsMultiSelect
                                    availableStudents={availableStudents}
                                    selectedStudents={selectedStudents}
                                    setSelectedStudents={(students) => {
                                        resetMessages();
                                        setSelectedStudents(students);
                                    }}
                                />
                            </div>
                            <button type="submit"
                                    className="btn btn-primary shadow-lg mx-2 my-3 rounded-4"
                                    onClick={() => handleUpdateTrainingGroupUsers()}>
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
                <TrainingGroupAddDialog
                    visible={addTrainingGroupDialogVisible}
                    onHide={() => {
                        setAddTrainingGroupDialogVisible(false);
                    }}
                    onSuccess={refreshTrainingGroups}
                />
                <TrainingGroupEditDialog
                    visible={editTrainingGroupDialogVisible}
                    onHide={() => {
                        setEditTrainingGroupDialogVisible(false);
                    }}
                    trainingGroup={selectedTrainingGroup}
                    onSuccess={refreshTrainingGroups}
                />
                <TrainingGroupDeleteDialog
                    visible={deleteTrainingGroupDialogVisible}
                    onHide={() => {
                        setDeleteTrainingGroupDialogVisible(false);
                    }}
                    trainingGroup={selectedTrainingGroup}
                    onSuccess={refreshTrainingGroups}
                />
                <ScheduleAddDialog
                    visible={addScheduleDialogVisible}
                    availableVenues={availableVenues}
                    trainingGroupId={selectedGroupForSchedule}
                    onHide={() => {
                        setAddScheduleDialogVisible(false);
                    }}
                    onSuccess={refreshAll}
                />
                <ScheduleEditDialog
                    visible={editScheduleDialogVisible}
                    schedule={selectedSchedule}
                    availableVenues={availableVenues}
                    trainingGroupId={selectedGroupForSchedule}
                    onHide={() => {
                        setEditScheduleDialogVisible(false);
                    }}
                    onSuccess={refreshAll}

                />
                <ScheduleDeleteDialog
                    visible={deleteScheduleDialogVisible}
                    schedule={selectedSchedule}
                    availableVenues={availableVenues}
                    onHide={() => {
                        setDeleteScheduleDialogVisible(false);
                    }}
                    onSuccess={refreshAll}
                />
            </div>
        </>
    );
}

export default TrainingGroups;
