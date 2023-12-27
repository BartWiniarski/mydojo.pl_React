import React, {useEffect, useState} from "react";
import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";
import {Dialog} from "primereact/dialog";
import Calendar from "../../Calendar.jsx";
import putUser from "../../../axios/users/putUser.jsx";

const UserEditDialog = ({
                            visible,
                            onHide,
                            user: initialUser,
                            onSuccess
                        }) => {

    const [user, setUser] = useState(initialUser);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const axiosInstanceToken = useAxiosInstanceToken();

    const parsedDate = new Date(user.dob);

    const roleOptions = [
        {id: 1, type: "ADMIN"},
        {id: 2, type: "TRAINER"},
        {id: 3, type: "STUDENT"}
    ];

    const selectedRoleTypes = user.roles ? user.roles.map(role => role.type) : [];

    useEffect(() => {
        if (visible) {
            setUser(initialUser);
            setSuccessMessage("");
            setErrorMessage("");
        }
    }, [visible]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser(prevUser =>
            ({...prevUser, [name]: value}));
    };

    const handleSaveClick = () => {

        if (!user.firstName.trim() ||
            !user.lastName.trim() ||
            !user.dob ||
            !user.email.trim() ||
            user.roles.length === 0
        ) {
            setErrorMessage('Wszystkie pola są wymagane!');
            return;
        }

        putUser(axiosInstanceToken, user, (message) => {
            setSuccessMessage(message);
            setErrorMessage("");
            onSuccess();
        }, setErrorMessage);
    }

    const handleRoleChange = (event) => {
        const selectedRoleTypes =
            Array.from(event.target.selectedOptions, option =>
                option.value);
        const selectedRoles = roleOptions.filter(role =>
            selectedRoleTypes.includes(role.type));
        setUser({...user, roles: selectedRoles});
    };


    return (
        <Dialog header="Dodawanie nowego użykownika"
                visible={visible}
                className="responsive-dialog"
                onHide={onHide}>
            <hr/>
            <div className="p-2">
                <label htmlFor="InputFirstName">Imię</label>
                <input type="text"
                       name="firstName"
                       className="form-control"
                       id="InputFirstName"
                       value={user.firstName}
                       onChange={handleInputChange}
                />
            </div>
            <div className="p-2">
                <label htmlFor="InputLastName">Nazwisko</label>
                <input type="text"
                       name="lastName"
                       className="form-control"
                       id="InputLastName"
                       value={user.lastName}
                       onChange={handleInputChange}
                />
            </div>
            <div className="p-2">
                <label>Data urodzenia</label><br/>
                <Calendar
                    selectedDate={parsedDate}
                    onDateChange={(date) => setUser({...user, dob: date})}
                />
            </div>
            <div className="p-2">
                <label htmlFor="InputEmail">E-mail</label>
                <input type="email"
                       name="email"
                       className="form-control"
                       id="InputEmailName"
                       value={user.email}
                       onChange={handleInputChange}
                />
            </div>
            <div className="p-2">
                <label>Rola użytkownika</label>
                <select multiple className="form-control"
                        value={selectedRoleTypes}
                        onChange={handleRoleChange}>
                    {roleOptions.map(role => (
                        <option key={role.id} value={role.type}>
                            {role.type}
                        </option>
                    ))}
                </select>
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


export default UserEditDialog;
