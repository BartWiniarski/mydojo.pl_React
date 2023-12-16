import React, { useState, useEffect } from "react";
import { MultiSelect } from 'primereact/multiselect';
import {axiosInstanceToken} from "../../../axios/axios.jsx";

const TrainersMultiSelect = ({selectedTrainers, setSelectedTrainers}) => {
    const [availableTrainers, setAvailableTrainers] = useState([]);

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            const response = await axiosInstanceToken.get("/admin/trainers");
            const trainerOptions = response.data.map(trainer => ({
                name: `${trainer.firstName} ${trainer.lastName}`,
                id: trainer.id
            }));
            setAvailableTrainers(trainerOptions);
        } catch (error) {
            console.error("Error fetching availableTrainers:", error);
        }
    };


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