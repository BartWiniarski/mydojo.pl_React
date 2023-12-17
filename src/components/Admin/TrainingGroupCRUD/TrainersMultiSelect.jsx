import React, { useState, useEffect } from "react";
import { MultiSelect } from 'primereact/multiselect';
import {axiosInstanceToken} from "../../../axios/axios.jsx";

const TrainersMultiSelect = ({availableTrainers, selectedTrainers, setSelectedTrainers}) => {

    return (
        <div className="card flex justify-content-center">
            <MultiSelect
                value={selectedTrainers || []}
                onChange={(e) => setSelectedTrainers(e.value)}
                options={availableTrainers}
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