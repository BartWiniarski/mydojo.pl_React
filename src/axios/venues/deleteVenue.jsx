const deleteVenue = async (axiosInstanceToken, venue, onSuccess, onError) => {

    try {
        await axiosInstanceToken.delete(`/admin/venues/${venue.id}`);
        onSuccess("Lokalizacja treningowa usunięta");
    } catch (error) {
        if (!error?.response) {
            onError("Brak odpowiedzi z serwera");
        } else {
            onError("Usuwanie lokalizacji treningowej zakończone niepowodzeniem");
        }
    }
};

export default deleteVenue;
