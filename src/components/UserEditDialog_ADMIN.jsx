import React from 'react';
import { Dialog } from 'primereact/dialog';
import Calendar from "./Calendar.jsx";

const UserEditDialogAdmin = ({ visible,
                                 onHide,
                                 user,
                                 onFormSubmit,
                                 onInputChange,
                                 successMessage,
                                 errorMessage }) => {

    const parsedDate = new Date(user.dob);
    const roleOptions = [
        { id: 1, type: "ADMIN" },
        { id: 2, type: "TRAINER" },
        { id: 3, type: "STUDENT" }
    ];

    const handleRoleChange = (event) => {
        const selectedRoleTypes = Array.from(event.target.selectedOptions, option => option.value);
        const selectedRoles = roleOptions.filter(role => selectedRoleTypes.includes(role.type));
        onInputChange({...user, roles: selectedRoles});
    };

    const selectedRoleTypes = user.roles ? user.roles.map(role => role.type) : [];


    return (
        <Dialog header="Edycja użytkownika" visible={visible} style={{width: '50vw'}} onHide={onHide}>
            <hr/>
            <div className="p-2">
                <label htmlFor="InputFirstName">Imię</label>
                <input type="text" className="form-control"
                       id="InputFirstName"
                       value={user.firstName} onChange={(e) =>
                    onInputChange({...user, firstName: e.target.value})}/>
            </div>
            <div className="p-2">
                <label htmlFor="InputLastName">Nazwisko</label>
                <input type="text" className="form-control"
                       id="InputLastName"
                       value={user.lastName} onChange={(e) =>
                    onInputChange({...user, lastName: e.target.value})}/>
            </div>
            <div className="p-2">
                <label>Data urodzenia</label><br/>
                <Calendar
                    selectedDate={parsedDate}
                    onDateChange={(date) => onInputChange({...user, dob: date})}
                />
            </div>
            <div className="p-2">
                <label htmlFor="InputEmailName">E-mail</label>
                <input type="text" className="form-control"
                       id="InputEmailName"
                       value={user.email} onChange={(e) =>
                    onInputChange({...user, email: e.target.value})}/>
            </div>
            <div className="p-2">
                <label>Rola użytkownika</label>
                <select multiple className="form-control" value={selectedRoleTypes} onChange={handleRoleChange}>
                    {roleOptions.map(role => (
                        <option key={role.id} value={role.type}>
                            {role.type}
                        </option>
                    ))}
                </select>
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

export default UserEditDialogAdmin;
