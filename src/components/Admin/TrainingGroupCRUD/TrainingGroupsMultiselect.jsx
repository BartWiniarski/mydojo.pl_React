import React, { useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';

const TrainingGroupsMultiselect = ({ trainingGroups }) => {
    const [selectedGroups, setSelectedGroups] = useState([]);

    const trainingGroupOptions = trainingGroups.map(group => ({
        label: group.name,
        value: group.id
    }));

    return (
        <div className="card">
            <MultiSelect
                value={selectedGroups}
                options={trainingGroupOptions}
                onChange={(e) => setSelectedGroups(e.value)}
                optionLabel="label"
                filter
                placeholder="Wybierz grupę treningową"
                className="w-full"
            />
        </div>
    );
};

export default TrainingGroupsMultiselect;
