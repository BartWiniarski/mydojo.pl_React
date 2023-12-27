import React, {useEffect, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import DaysOfWeekSelect from "../ScheduleSelects/DaysOfWeekSelect.jsx";
import VenueSelect from "../ScheduleSelects/VenueSelect.jsx";
import DatePicker from "react-datepicker";
import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";
import postSchedule from "../../../axios/schedules/postSchedule.jsx";

const ScheduleAddDialog = ({
                               visible,
                               onHide,
                               availableVenues,
                               onSuccess
                           }) => {

    const [schedule, setSchedule] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(new Date());
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const axiosInstanceToken = useAxiosInstanceToken();

    useEffect(() => {
        if (visible) {
            setSchedule({});
            setSelectedDay(null);
            setSelectedHour(null);
            setSelectedVenue(null);
            setSuccessMessage("");
            setErrorMessage("");
        }
    }, [visible]);

    const handleInputChange = (updatedValue) => {
        setSchedule(prevSchedule => ({...prevSchedule, ...updatedValue}));
    };

    useEffect(() => {
        if (selectedDay && schedule[selectedDay]) {
            const [hours, minutes] = schedule[selectedDay].split(':');
            setSelectedHour(new Date(new Date().setHours(parseInt(hours), parseInt(minutes), 0)));
        }
    }, [selectedDay, schedule]);

    const handleDayChange = (day) => {
        setSelectedDay(day);
        const updatedValue = {[day]: schedule[day] || ''};
        handleInputChange(updatedValue);
    };

    const handleHourChange = (date) => {
        setSelectedHour(date);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:00`;
        if (selectedDay) {
            const updatedValue = {[selectedDay]: formattedTime};
            handleInputChange(updatedValue);
        }
    };

    const handleSaveClick = () => {

        // if (!schedule.dayOfWeek.trim() ||
        //     !schedule.time.trim()) {
        //     setErrorMessage('Wszystkie pola są wymagane!');
        //     return;
        // }

        postSchedule(axiosInstanceToken, schedule, (message) => {
            setSuccessMessage(message);
            setErrorMessage("")
            onSuccess();
        }, setErrorMessage);
    }

    return (
        <Dialog header="Dodawanie nowej jednostki treningowej"
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

export default ScheduleAddDialog;
