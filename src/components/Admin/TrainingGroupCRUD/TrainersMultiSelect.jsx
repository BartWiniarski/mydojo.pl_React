import React, { useState, useEffect } from "react";
import { MultiSelect } from 'primereact/multiselect';
import {axiosInstanceToken} from "../../../axios/axios.jsx";

function TrainersMultiSelect() {
    const [selectedTrainers, setSelectedTrainers] = useState(null);
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            const response = await axiosInstanceToken.get("/admin/trainers");
            const trainerOptions = response.data.map(trainer => ({
                name: `${trainer.firstName} ${trainer.lastName}`,
                code: trainer.id
            }));
            setTrainers(trainerOptions);
        } catch (error) {
            console.error("Error fetching trainers:", error);
        }
    };

    return (
        <div className="card flex justify-content-center">
            <MultiSelect
                value={selectedTrainers}
                onChange={(e) => setSelectedTrainers(e.value)}
                options={trainers}
                optionLabel="name"
                filter
                placeholder="Wybierz trenerów"
                maxSelectedLabels={3}
                className="w-full md:w-20rem"
            />
        </div>
    );
}

export default TrainersMultiSelect;