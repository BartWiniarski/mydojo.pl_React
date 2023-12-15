import React, { useState, useEffect } from "react";
import { MultiSelect } from 'primereact/multiselect';
import {axiosInstanceToken} from "../../../axios/axios.jsx";
function StudentsMultiSelect() {
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [groupedUsers, setGroupedUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstanceToken.get("/admin/students");
            const usersGroupedByAge = groupUsersByAge(response.data);
            setGroupedUsers(usersGroupedByAge);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const groupUsersByAge = (users) => {
        const ageGroups = {
            '0-7': [],
            '8-10': [],
            '11-13': [],
            '14-16': [],
            '17-18': [],
            '18+': []
        };

        users.forEach(user => {
            const age = user.age;
            let groupKey = '';

            if (age <= 7) groupKey = '0-7';
            else if (age <= 10) groupKey = '8-10';
            else if (age <= 13) groupKey = '11-13';
            else if (age <= 16) groupKey = '14-16';
            else if (age <= 18) groupKey = '17-18';
            else groupKey = '18+';

            ageGroups[groupKey].push({ label: `${user.firstName} ${user.lastName}`, value: user.id });
        });

        return Object.entries(ageGroups).map(([label, items]) => ({
            label,
            items
        }));
    };

    return (
        <div className="card flex justify-content-center">
            <MultiSelect
                value={selectedUsers}
                options={groupedUsers}
                onChange={(e) => setSelectedUsers(e.value)}
                optionLabel="label"
                optionGroupLabel="label"
                optionGroupChildren="items"
                placeholder="Wybier uczniów do przypisania"
                display="chip"
                className="w-full md:w-20rem"
            />
        </div>
    );
}

export default StudentsMultiSelect;