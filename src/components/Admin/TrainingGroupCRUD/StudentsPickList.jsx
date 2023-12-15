import React, { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';
import {axiosInstanceToken} from "../../../axios/axios.jsx";

function StudentsPickList() {
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstanceToken.get("/admin/students");
            setSource(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
    };

    const itemTemplate = (student) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <div className="flex-1 flex flex-column gap-2">
                    <span className="font-bold">{student.firstName} {student.lastName}</span>
                </div>
            </div>
        );
    };

    return (
            <PickList
                source={source}
                target={target}
                onChange={onChange}
                itemTemplate={itemTemplate}
                filter
                filterBy="firstName,lastName"
                // breakpoint="1400px"
                sourceHeader="Dostępni uczniowie"
                targetHeader="Przypisani uczniowie"
                sourceStyle={{ height: '12rem' }}
                targetStyle={{ height: '12rem' }}
                sourceFilterPlaceholder="Search by name"
                targetFilterPlaceholder="Search by name"
            />
    );
}

export default StudentsPickList;
