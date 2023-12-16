import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

const TrainingGroupsSelect = ({ trainingGroups, selectedGroup, setSelectedGroup }) => {

    const trainingGroupOptions = trainingGroups.map(group => ({
        label: group.name,
        value: group.id
    }));

    return (
        <div className="card">
            <Dropdown
                value={selectedGroup}
                options={trainingGroupOptions}
                onChange={(e) => setSelectedGroup(e.value)}
                optionLabel="label"
                filter
                placeholder="Wybierz grupę treningową"
                className="w-full"
            />
        </div>
    );
};

export default TrainingGroupsSelect;
