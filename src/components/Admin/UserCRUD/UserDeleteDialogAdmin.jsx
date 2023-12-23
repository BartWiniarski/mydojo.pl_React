import React from 'react';
import { Dialog } from 'primereact/dialog';

const UserDeleteDialogAdmin = ({ visible,
                                   onHide,
                                   venue,
                                   onDelete,
                                   successMessage,
                                   errorMessage }) => {
    return (
        <Dialog header="Usuwanie użytkownika" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
            <hr />
            <div className="p-2">
                {venue && <p>Czy na pewno usunąć użytkownika {venue.firstName} {venue.lastName}?</p>}
            </div>
            <button type="button" className="btn btn-danger shadow-lg mx-2 rounded-4" onClick={onDelete}>
                usuń
            </button>
            <button type="button" className="btn btn-primary shadow-lg mx-2 rounded-4" onClick={onHide}>
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

export default UserDeleteDialogAdmin;
