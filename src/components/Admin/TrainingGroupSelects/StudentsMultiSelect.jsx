import React, { useState, useEffect } from "react";
import { MultiSelect } from 'primereact/multiselect';

const StudentsMultiSelect = ({availableStudents, selectedStudents, setSelectedStudents}) => {
    const [groupedStudents, setGroupedStudents] = useState([]);

    // useEffect(() => {
    //     const usersGroupedByAge = groupUsersByAge(availableStudents);
    //     setGroupedStudents(usersGroupedByAge);
    //     console.log("Grouped Students: ", usersGroupedByAge);
    // }, [availableStudents]);

    useEffect(() => {
        const usersGroupedByAge = groupUsersByAge(availableStudents);
        setGroupedStudents(usersGroupedByAge);
    }, [availableStudents]);

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
            let groupKey = "";

            if (age <= 7) groupKey = '0-7';
            else if (age <= 10) groupKey = '8-10';
            else if (age <= 13) groupKey = '11-13';
            else if (age <= 16) groupKey = '14-16';
            else if (age <= 18) groupKey = '17-18';
            else groupKey = '18+';

            ageGroups[groupKey].push({
                label: `${user.firstName} ${user.lastName}`,
                id: user.id });
        });

        return Object.entries(ageGroups).map(([label, items]) => ({
            label,
            items
        }));
    };

    return (
        <div className="card flex justify-content-center">
            <MultiSelect
                value={selectedStudents}
                options={groupedStudents}
                onChange={(e) => setSelectedStudents(e.value)}
                optionLabel="label"
                optionValue="id"
                filter
                optionGroupLabel="label"
                optionGroupChildren="items"
                placeholder="Wybierz uczniów"
                display="chip"
                className="w-full md:w-20rem"
            />
        </div>
    );
}

export default StudentsMultiSelect;