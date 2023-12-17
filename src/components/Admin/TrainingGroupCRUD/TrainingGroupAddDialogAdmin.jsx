import React from 'react';
import {Dialog} from 'primereact/dialog';

const TrainingGroupAddDialogAdmin = ({
                                         visible,
                                         onHide,
                                         trainingGroup,
                                         onFormSubmit,
                                         onInputChange,
                                         successMessage,
                                         errorMessage
                                     }) => {

    trainingGroup = {
        name: trainingGroup.name || '',
        description: trainingGroup.description || '',
    };


    return (
        <Dialog header="Dodawanie nowej grupy treningowej" visible={visible} style={{width: '50vw'}} onHide={onHide}>
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
