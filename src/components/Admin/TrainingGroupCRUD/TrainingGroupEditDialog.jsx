import React, {useEffect, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";
import putTrainingGroup from "../../../axios/training groups/putTrainingGroup.jsx";
import "/public/css/style.css";

const TrainingGroupEditDialog = ({
                                    visible,
                                    onHide,
                                    trainingGroup: initialTrainingGroup,
                                    onSuccess
                                }) => {

    const [trainingGroup, setTrainingGroup] = useState(
        initialTrainingGroup || { name: '', description: '' });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const axiosInstanceToken = useAxiosInstanceToken();

    useEffect(() => {
        if (visible) {
            setTrainingGroup(initialTrainingGroup);
            setSuccessMessage("");
            setErrorMessage("");
        }
    }, [visible]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setTrainingGroup(prevTrainingGroup =>
            ({...prevTrainingGroup, [name]: value}));
    };

    const handleSaveClick = () => {

        if (!trainingGroup.name.trim() ||
            !trainingGroup.description.trim()) {
            setErrorMessage('Wszystkie pola są wymagane!');
            return;
        }

        putTrainingGroup(axiosInstanceToken, trainingGroup, (message) => {
            setSuccessMessage(message);
            setErrorMessage("")
            onSuccess();
        }, setErrorMessage);
    }


    return (
        <Dialog header="Edycja grupy treningowej"
                visible={visible}
                className="responsive-dialog"
                onHide={onHide}>
            <hr/>
            <div className="p-2">
                <label htmlFor="inputName">Nazwa</label>
                <input type="text"
                       className="form-control"
                       name="name"
                       id="inputName"
                       value={trainingGroup.name}
                       onChange={handleInputChange}
                />
            </div>
            <div className="p-2">
                <label htmlFor="inputDescription">Opis</label>
                <input type="text"
                       className="form-control"
                       name="description"
                       id="inputDescription"
                       value={trainingGroup.description}
                       onChange={handleInputChange}
                />
            </div>
            <button type="button"
                    className="btn btn-primary shadow-lg mx-2 my-2 rounded-4"
                    onClick={handleSaveClick}>
                zapisz
            </button>
            <button type="button"
                    className="btn btn-primary shadow-lg mx-2 my-2 rounded-4"
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

export default TrainingGroupEditDialog;
