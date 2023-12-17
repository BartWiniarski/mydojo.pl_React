import React, {useState} from 'react';
import {Dialog} from 'primereact/dialog';
import DaysOfWeekSelect from "./DaysOfWeekSelect.jsx";

const TrainingGroupAddDialogAdmin = ({
                                         visible,
                                         onHide,
                                         trainingGroup,
                                         onFormSubmit,
                                         onInputChange,
                                         successMessage,
                                         errorMessage
                                     }) => {

    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState('');


    trainingGroup = {
        name: trainingGroup.name || '',
        description: trainingGroup.description || '',
        day: selectedDay || '',
        hour: selectedHour || '',
    };


    return (
            <Dialog header="Dodawanie nowej grupy treningowej" visible={visible} style={{width: '50vw'}}
                    onHide={onHide}>
                <hr/>
                <div className="p-2">
                    <input type="text" className="form-control"
                           id="InputName" placeholder="Podaj nazwę grupy..."
                           value={trainingGroup.name} onChange={(e) =>
                        onInputChange({...trainingGroup, name: e.target.value})}/>
                </div>
                <div className="p-2">
                    <input type="text" className="form-control"
                           id="InputDescription" placeholder="Podaj opis grupy..."
                           value={trainingGroup.description} onChange={(e) =>
                        onInputChange({...trainingGroup, description: e.target.value})}/>
                </div>
                <div className="p-2">
                    <div>
                        <DaysOfWeekSelect
                            selectedDay={selectedDay}
                            setSelectedDay={setSelectedDay}
                        />
                    </div>
                </div>
                <div className="p-2">
                    <div>
                        <label>Wybierz godzinę:</label>
                    </div>
                </div>
                <button type="button" className="btn btn-primary shadow-lg mx-2 my-2 rounded-4" onClick={onFormSubmit}>
                    zapisz
                </button>
                <button type="button" className="btn btn-primary shadow-lg mx-2 my-2 rounded-4" onClick={onHide}>
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

export default TrainingGroupAddDialogAdmin;
