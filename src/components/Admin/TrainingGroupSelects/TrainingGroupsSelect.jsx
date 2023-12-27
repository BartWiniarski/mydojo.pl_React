import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

const TrainingGroupsSelect = ({ availableTrainingGroups, selectedGroup, setSelectedGroup }) => {

    const availableTrainingGroupsOptions = availableTrainingGroups.map(group => ({
        label: group.name,
        value: group.id
    }));

    return (
        <div className="card">
            <Dropdown
                value={selectedGroup}
                options={availableTrainingGroupsOptions}
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
