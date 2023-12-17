import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import DatePicker from 'react-datepicker';
import DaysOfWeekSelect from "./DaysOfWeekSelect.jsx";


const TrainingGroupEditDialogAdmin = ({ visible,
                                 onHide,
                                 trainingGroup,
                                 onFormSubmit,
                                 onInputChange,
                                 successMessage,
                                 errorMessage }) => {

    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(new Date());
    const [schedule, setSchedule] = useState(trainingGroup.schedule || {});

    useEffect(() => {
        if (visible && trainingGroup.schedule) {
            setSchedule(trainingGroup.schedule);

            const entries = Object.entries(trainingGroup.schedule);
            if (entries.length > 0) {
                const [day, time] = entries[0];
                setSelectedDay(day);

                const [hours, minutes] = time.split(':');
                setSelectedHour(new Date(new Date().setHours(parseInt(hours), parseInt(minutes), 0)));
            }
        }
    }, [visible]);

    const handleDayChange = (day) => {
        setSelectedDay(day);
        const updatedSchedule = { ...schedule, [day]: schedule[day] || '' };
        setSchedule(updatedSchedule);
        onInputChange({ ...trainingGroup, schedule: updatedSchedule });
    };

    const handleHourChange = (date) => {
        setSelectedHour(date);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:00`;
        if (selectedDay) {
            const updatedSchedule = { ...schedule, [selectedDay]: formattedTime };
            setSchedule(updatedSchedule);
            onInputChange({ ...trainingGroup, schedule: updatedSchedule });
        }
    };


    return (
        <Dialog header="Edycja grupy treningowej" visible={visible} style={{width: '50vw'}} onHide={onHide}>
            <hr/>
            <div className="p-2">
                <input type="text"
                       className="form-control"
                       id="InputName"
                       placeholder="Podaj nazwę grupy..."
                       value={trainingGroup.name}
                       onChange={(e) =>
                           onInputChange({...trainingGroup, name: e.target.value})}/>
            </div>
            <div className="p-2">
                <input type="text"
                       className="form-control"
                       id="InputDescription"
                       placeholder="Podaj opis grupy..."
                       value={trainingGroup.description}
                       onChange={(e) =>
                           onInputChange({...trainingGroup, description: e.target.value})}/>
            </div>
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
            <button type="button" className="btn btn-primary shadow-lg mx-2 my-2 rounded-4"
                    onClick={onFormSubmit}>
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

export default TrainingGroupEditDialogAdmin;
