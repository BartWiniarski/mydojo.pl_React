import React, {useEffect, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";
import deleteVenue from "../../../axios/venues/deleteVenue.jsx";


const VenueDeleteDialog = ({
                                   visible,
                                   onHide,
                                   venue,
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

    const handleDeleteClick = () => {
        deleteVenue(axiosInstanceToken, venue, (message) => {
            setSuccessMessage(message);
            onSuccess();
        }, setErrorMessage);
    }

    return (
        <Dialog header="Usuwanie lokalizacji"
                visible={visible}
                className="responsive-dialog"
                onHide={onHide}>
            <hr/>
            <div className="p-2">
                {venue && <p>Czy na pewno usunąć lokalizacje {venue.name} ?</p>}
            </div>
            <button type="button" className="btn btn-danger shadow-lg mx-2 rounded-4"
                    onClick={handleDeleteClick}>
                usuń
            </button>
            <button type="button" className="btn btn-primary shadow-lg mx-2 rounded-4"
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

export default VenueDeleteDialog;
