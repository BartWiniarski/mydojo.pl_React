import React, {useEffect, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import DaysOfWeekSelect from "../ScheduleSelects/DaysOfWeekSelect.jsx";
import VenueSelect from "../ScheduleSelects/VenueSelect.jsx";
import DatePicker from "react-datepicker";
import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";
import putSchedule from "../../../axios/schedules/putSchedule.jsx";

const ScheduleEditDialog = ({
                                visible,
                                onHide,
                                availableVenues,
                                schedule,
                                onSuccess,
                                trainingGroupId
                            }) => {

    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(new Date());
    const [formattedHour, setFormattedHour] = useState(null);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const axiosInstanceToken = useAxiosInstanceToken();

    useEffect(() => {
        if (visible) {
            setSelectedDay(schedule.dayOfWeek);
            setSelectedVenue(schedule.venueId);
            setSuccessMessage("");
            setErrorMessage("");

            if (schedule.time) {
                const [hours, minutes] = schedule.time.split(':');
                const date = new Date();
                date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
                setSelectedHour(date);
                handleHourChange(date);
            } else {
                setSelectedHour(null);
                setFormattedHour(null);
            }
        }
    }, [visible, schedule]);

    const handleDayChange = (day) => {
        setSelectedDay(day);
    };

    const handleHourChange = (date) => {
        setSelectedHour(date);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        setFormattedHour(`${hours}:${minutes}:00`);
    };

    const handleSaveClick = () => {

        if (!selectedDay || !selectedHour || !selectedVenue) {
            setErrorMessage('Wszystkie pola są wymagane!');
            return;
        }

        const newSchedule = {
            dayOfWeek: selectedDay,
            time: formattedHour,
            venueId: selectedVenue,
            trainingGroupId: trainingGroupId,
            id: schedule.id
        };

        putSchedule(axiosInstanceToken, newSchedule, (message) => {
            setSuccessMessage(message);
            setErrorMessage("")
            onSuccess();
        }, setErrorMessage);
    }

    return (
        <Dialog header="Edycja jednostki treningowej"
                visible={visible}
                className="responsive-dialog"
                onHide={onHide}>
            <hr/>
            <div className="p-2">
                <DaysOfWeekSelect
                    selectedDay={selectedDay}
                    setSelectedDay={handleDayChange}
                />
            </div>
            <div className="p-2">
                <label>Wybierz godzinę:</label>
                <div className="customDatePickerWidth">
                    <DatePicker
                        className="form-control"
                        selected={selectedHour}
                        onChange={handleHourChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Godzina"
                        dateFormat="HH:mm"
                    />
                </div>
            </div>
            <div className="p-2">
                <VenueSelect
                    availableVenues={availableVenues}
                    selectedVenue={selectedVenue}
                    setSelectedVenue={setSelectedVenue}
                />
            </div>
            <button type="button" className="btn btn-primary shadow-lg mx-2 my-2 rounded-4"
                    onClick={handleSaveClick}>
                zapisz
            </button>
            <button type="button" className="btn btn-primary shadow-lg mx-2 my-2 rounded-4"
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

export default ScheduleEditDialog;
