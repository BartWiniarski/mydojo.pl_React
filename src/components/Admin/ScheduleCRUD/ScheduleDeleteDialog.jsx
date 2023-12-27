import React, {useEffect, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";
import deleteSchedule from "../../../axios/schedules/deleteSchedule.jsx";


const ScheduleDeleteDialog = ({
                                  visible,
                                  onHide,
                                  availableVenues,
                                  schedule,
                                  onSuccess
                              }) => {

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const axiosInstanceToken = useAxiosInstanceToken();

    useEffect(() => {
        if (visible) {
            setSuccessMessage("");
            setErrorMessage("");
        }
    }, [visible]);

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

    const getVenueNameById = (venueId) => {
        const venue = availableVenues.find(
            (venue) => venue.id === venueId);
        if (venue) {
            return `${venue.name}`;
        }
        return "Brak danych o lokalizacji";
    }

    const handleDeleteClick = () => {
        deleteSchedule(axiosInstanceToken, schedule, (message) => {
            setSuccessMessage(message);
            onSuccess();
        }, setErrorMessage);
    }

    return (
        <Dialog header="Usuwanie jednostki treningowej"
                visible={visible}
                className="responsive-dialog"
                onHide={onHide}>
            <hr/>
            <div className="p-2">
                {schedule && <p>Czy na pewno usunąć jednostkę treningową
                    "{formatDayOfWeek(schedule.dayOfWeek)} - {' '}
                    {schedule.time} - {' '}
                    {getVenueNameById(schedule.venueId)}"?
                </p>}
            </div>
            <button type="button"
                    className="btn btn-danger shadow-lg mx-2 rounded-4"
                    onClick={handleDeleteClick}>
                usuń
            </button>
            <button type="button"
                    className="btn btn-primary shadow-lg mx-2 rounded-4"
                    onClick={onHide}>
                anuluj
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

export default ScheduleDeleteDialog;
