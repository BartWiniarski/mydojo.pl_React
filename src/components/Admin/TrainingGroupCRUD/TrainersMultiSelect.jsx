import React, { useState, useEffect } from "react";
import { MultiSelect } from 'primereact/multiselect';
import {axiosInstanceToken} from "../../../axios/axios.jsx";

const TrainersMultiSelect = ({availableTrainers, selectedTrainers, setSelectedTrainers}) => {

    const trainerOptions = availableTrainers.map(trainer => ({
        name: `${trainer.firstName} ${trainer.lastName}`,
        id: trainer.id
    }));

    return (
        <div className="card flex justify-content-center">
            <MultiSelect
                value={selectedTrainers || []}
                onChange={(e) => setSelectedTrainers(e.value)}
                options={trainerOptions}
                optionLabel="name"
                optionValue="id"
                filter
                placeholder="Wybierz trenerów"
                maxSelectedLabels={3}
                className="w-full md:w-20rem"
            />
        </div>
    );
}

export default TrainersMultiSelect;