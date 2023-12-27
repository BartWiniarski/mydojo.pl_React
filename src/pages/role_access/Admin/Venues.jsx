import {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import VenueAddDialog from "../../../components/Admin/VenuesCRUD/VenueAddDialog.jsx";
import VenueDeleteDialog from "../../../components/Admin/VenuesCRUD/VenueDeleteDialog.jsx";
import VenueEditDialog from "../../../components/Admin/VenuesCRUD/VenueEditDialog.jsx";
import getVenues from "../../../axios/venues/getVenues.jsx";
import useAxiosInstanceToken from "../../../hooks/useAxiosInstanceToken.jsx";

function Venues() {
    const axiosInstanceToken = useAxiosInstanceToken();
    const [venues, setVenues] = useState([]);
    const [selectedVenue, setSelectedVenue] = useState([]);
    const [venuesRefresh, setVenuesRefresh] = useState(true)
    const [expandedRows, setExpandedRows] = useState(null);
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [editDialogVisible, setEditDialogVisible] = useState(false);


    const refreshVenues = () => {
        setVenuesRefresh(true);
    };

    useEffect(() => {
        if (venuesRefresh) {
            getVenues(axiosInstanceToken, setVenues);
            setVenuesRefresh(false);
        }
    }, [venuesRefresh]);


    const rowExpansion = (data) => {
        return (
            <div className="p-3 card">
                <h5 className="fw-bold">{data.name}</h5>
                <hr/>
                <p>Adres: {data.address}</p>
                <div className="text-left">
                    <button type="submit"
                            className="btn btn-primary shadow-lg mx-2 rounded-4"
                            onClick={() => {
                                setSelectedVenue(data);
                                setEditDialogVisible(true)
                            }}>
                        edytuj
                    </button>
                    <button type="submit"
                            className="btn btn-primary shadow-lg mx-2 rounded-4"
                            onClick={() => {
                                setSelectedVenue(data);
                                setDeleteDialogVisible(true)
                            }}>
                        usuń
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div id="column-left" className="col-12 col-md-2 mt-md-3  column-left">
                <img src="/images/house_1.png"
                     className="img-fluid shadow-img d-block mx-auto mt-5"
                     alt="Logo"
                     style={{maxHeight: '600px'}}/>
            </div>
            <div id="column-right"
                 className="col-12 col-md-10 ms-md-auto mt-md-auto column-right">
                <h1 className="h3 mb-2">Sale treningowe</h1>
                <hr/>
                <button type="button"
                        className="btn btn-primary shadow-lg my-3 rounded-4"
                        onClick={() => setAddDialogVisible(true)}>
                    dodaj nową lokalizację
                </button>
                <div className="card">
                    <DataTable value={venues}
                               expandedRows={expandedRows}
                               onRowToggle={(e)=>
                                   setExpandedRows(e.data)}
                               rowExpansionTemplate={rowExpansion}
                               dataKey="id"
                               className="p-datatable-striped">
                        <Column expander style={{width: '3em'}}/>
                        <Column field="name" header="Nazwa" sortable/>
                        <Column field="address" header="Adres" sortable/>
                    </DataTable>
                </div>
            </div>
            <VenueAddDialog
                visible={addDialogVisible}
                onHide={() => {
                    setAddDialogVisible(false);
                }}
                onSuccess={refreshVenues}
            />
            <VenueEditDialog
                visible={editDialogVisible}
                onHide={() => {
                    setEditDialogVisible(false);
                }}
                venue={selectedVenue}
                onSuccess={refreshVenues}
            />
            <VenueDeleteDialog
                visible={deleteDialogVisible}
                onHide={() => {
                    setDeleteDialogVisible(false);
                }}
                venue={selectedVenue}
                onSuccess={refreshVenues}
            />
        </>
    );
}

export default Venues;