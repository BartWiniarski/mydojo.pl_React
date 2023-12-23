import React, {useEffect, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";
import putVenue from "../../../axios/venues/putVenue.jsx";


const VenueEditDialog = ({
                             visible,
                             onHide,
                             venue: initialVenue,
                             onSuccess
                         }) => {

    const [venue, setVenue] = useState(initialVenue);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const axiosInstanceToken = useAxiosInstanceToken();


    useEffect(() => {
        if (visible) {
            setVenue(initialVenue);
            setSuccessMessage("");
            setErrorMessage("");
        }
    }, [visible]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setVenue(prevVenue => ({...prevVenue, [name]: value}));
    };

    const handleSaveClick = () => {
        putVenue(axiosInstanceToken, venue, (message) => {
            setSuccessMessage(message);
            onSuccess();
        }, setErrorMessage);
    }

    return (
        <Dialog header="Dodawanie nowej lokalizacji"
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
                       value={venue.name}
                       onChange={handleInputChange}
                />
            </div>
            <div className="p-2">
                <label htmlFor="inputAddress">Adres</label>
                <input type="text"
                       className="form-control"
                       name="address"
                       id="inputAddress"
                       value={venue.address}
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

export default VenueEditDialog;
