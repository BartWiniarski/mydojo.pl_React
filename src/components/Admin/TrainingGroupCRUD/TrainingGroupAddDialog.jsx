import React, {useEffect, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";
import postTrainingGroup from "../../../axios/training groups/postTrainingGroup.jsx";
import "/public/css/style.css";


const TrainingGroupAddDialog = ({
                                    visible,
                                    onHide,
                                    onSuccess
                                }) => {

    const [trainingGroup, setTrainingGroup] = useState(
        {name: "", description: ""});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const axiosInstanceToken = useAxiosInstanceToken();

    useEffect(() => {
        if (visible) {
            setTrainingGroup({name: "", description: ""});
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

        postTrainingGroup(axiosInstanceToken, trainingGroup, (message) => {
            setSuccessMessage(message);
            setErrorMessage("")
            onSuccess();
        }, setErrorMessage);
    }


    return (
        <Dialog header="Dodawanie nowej grupy treningowej"
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

export default TrainingGroupAddDialog;
