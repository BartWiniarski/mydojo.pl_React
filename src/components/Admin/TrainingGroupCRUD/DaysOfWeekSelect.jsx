import React, {useState} from 'react';
import {Dropdown} from 'primereact/dropdown';

const PONIEDZIALEK = "PONIEDZIALEK";
const WTOREK = "WTOREK";
const SRODA = "SRODA";
const CZWARTEK = "CZWARTEK";
const PIATEK = "PIATEK";
const SOBOTA = "SOBOTA";
const NIEDZIELA = "NIEDZIELA";

const DaysOfWeekSelect = ({selectedDay, setSelectedDay}) => {

        const availableDays = [
            { label: "Poniedziałek", value: PONIEDZIALEK },
            { label: "Wtorek", value: WTOREK },
            { label: "Środa", value: SRODA },
            { label: "Czwartek", value: CZWARTEK },
            { label: "Piątek", value: PIATEK },
            { label: "Sobota", value: SOBOTA },
            { label: "Niedziela", value: NIEDZIELA },
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
