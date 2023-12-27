import React, {useState} from 'react';
import {Dropdown} from 'primereact/dropdown';

const VenueSelect = ({
                         availableVenues,
                         selectedVenue,
                         setSelectedVenue
                     }) => {

    const venueOptions = availableVenues.map(venue => ({
        label: venue.name,
        value: venue.id
    }));

    return (
        <div className="card">
            <Dropdown
                value={selectedVenue}
                options={venueOptions}
                onChange={(e) => setSelectedVenue(e.value)}
                optionLabel="label"
                filter
                placeholder="Wybierz lokalizację"
                className="w-full"
            />
        </div>
    );
};

export default VenueSelect;
