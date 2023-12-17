import React, {useState} from 'react';
import {Dropdown} from 'primereact/dropdown';

const MONDAY = "MONDAY";
const TUESDAY = "TUESDAY";
const WEDNESDAY = "WEDNESDAY";
const THURSDAY = "THURSDAY";
const FRIDAY = "FRIDAY";
const SATURDAY = "SATURDAY";
const SUNDAY = "SUNDAY";

const DaysOfWeekSelect = ({selectedDay, setSelectedDay}) => {

        const availableDays = [
            { label: "Poniedziałek", value: MONDAY },
            { label: "Wtorek", value: TUESDAY },
            { label: "Środa", value: WEDNESDAY },
            { label: "Czwartek", value: THURSDAY },
            { label: "Piątek", value: FRIDAY },
            { label: "Sobota", value: SATURDAY },
            { label: "Niedziela", value: SUNDAY },
        ];

return (
    <div className="card">
        <Dropdown
            value={selectedDay}
            options={availableDays}
            onChange={(e) => setSelectedDay(e.value)}
            optionLabel="label"
            filter
            placeholder="Wybierz dzień tygodnia"
            className="w-full"
        />
    </div>
);
    }
;

export default DaysOfWeekSelect;
